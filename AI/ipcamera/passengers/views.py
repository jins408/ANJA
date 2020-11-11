# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from django.utils import timezone
import numpy as np
import threading
from django.http import StreamingHttpResponse
from datetime import datetime
import os
import cv2
from passengers.models import Image
from numpy import random
import time
from .serializers import PsSerializer


import torch
import torch.backends.cudnn as cudnn
from utils.datasets import LoadStreams, LoadImages
from models.experimental import attempt_load
from utils.torch_utils import select_device, load_classifier, time_synchronized
from utils.general import (
    check_img_size, non_max_suppression, apply_classifier, scale_coords,
    xyxy2xywh, plot_one_box, strip_optimizer, set_logging)
from .firebase import push_data,push_passenger

directory = os.getcwd()
filePath = directory + '/passengers/templates/resources/images/'
subway_data = {
	'line' : '01',
	'sid' : '01',
	'ssid' : '01',
	'id' : '010101',
}

class VideoCamera(object):
	def __init__(self):
		threading.Thread(target=self.test, args=()).start()
		# self.video = cv2.VideoCapture(0)
		# (self.grabbed, self.frame) = self.video.read()
		# threading.Thread(target=self.update, args=()).start()

	# def __del__(self):
	# 	self.video.release()

	def test(self):
		# Load model

		device = select_device('')
		weights = './passengers/utils/best.pt'
		model = attempt_load(weights, map_location=device)  # load FP32 model
		imgsz = check_img_size(640, s=model.stride.max())  # check img_size

		# Set Dataloader
		dataset = LoadStreams('0', img_size=imgsz)
		webcam = True
		view_img = True

		# Get names and colors
		names = model.module.names if hasattr(model, 'module') else model.names
		colors = [[random.randint(0, 255) for _ in range(3)] for _ in range(len(names))]
		print("name", names, 'colors', colors)

		# half = device.type != 'cpu'  # half precision only supported on CUDA

		# Run inference
		t0 = time.time()
		img = torch.zeros((1, 3, imgsz, imgsz), device=device)  # init img
		# _ = model(img.half() if half else img) if device.type != 'cpu' else None  # run once
		_ = model(img) if device.type != 'cpu' else None  # run once
		# DB에 너무 많은 입력을 보내지 않기위해 지정 -> 포스트그레
		saveTime = 0
		# 위험감지 시간 30초에 한번으로 지정 -> firestore
		dangerTime = 0
		for path, img, im0s, vid_cap in dataset:
			# print('path',path,'img',img,'im0s',im0s,'vid_cap',vid_cap)
			img = torch.from_numpy(img).to(device)
			# img = img.half() if half else img.float()  # uint8 to fp16/32
			img = img.float()
			img /= 255.0  # 0 - 255 to 0.0 - 1.0
			if img.ndimension() == 3:
				img = img.unsqueeze(0)

			# Inference
			t1 = time_synchronized()
			pred = model(img, augment=False)[0]

			# Apply NMS
			pred = non_max_suppression(pred, 0.25, 0.45, classes=0,
									   agnostic=False)
			t2 = time_synchronized()

			# Apply Classifier

			# Process detections

			for i, det in enumerate(pred):  # detections per image
				if webcam:  # batch_size >= 1
					p, s, im0 = path[i], '%g: ' % i, im0s[i].copy()
				else:
					p, s, im0 = path, '', im0s

				# save_path = str(Path(out) / Path(p).name)
				# txt_path = str(Path(out) / Path(p).stem) + ('_%g' % dataset.frame if dataset.mode == 'video' else '')
				s += '%gx%g ' % img.shape[2:]  # print string
				gn = torch.tensor(im0.shape)[[1, 0, 1, 0]]  # normalization gain whwh

				if det is not None and len(det):
					# Rescale boxes from img_size to im0 size

					det[:, :4] = scale_coords(img.shape[2:], det[:, :4], im0.shape).round()
					nowPS = 0
					fullPS = 54

					# Print results
					for c in det[:, -1].unique():
						# n => 개수 names[int(c)] => 클래스 이름
						n = (det[:, -1] == c).sum()  # detections per class
						s += '%g %ss, ' % (n, names[int(c)])  # add to string
						if (names[int(c)] == 'mask'and dangerTime>0):
							nowPS += int(n)
						if (names[int(c)] == 'no-mask'):
							nowPS += int(n)

						# firestore에 6초에 한번씩 Log 보냄
						if(names[int(c)] !='mask' and dangerTime>=0):
							print('파이어스토어입력')
							alarm = subway_data
							timeToSave = int(datetime.now().timestamp())
							alarm['category'] = names[int(c)]
							if(alarm['category'] == 'no-mask'):
								alarm['category'] = 'nomask'
							alarm['time'] = timeToSave
							# firestore에 저장 (영상은 id와 timestamp 값으로 찾는다)
							push_data(alarm)
							##########
							#영상녹화 함수 들어갈 부분
							##########
							# 6초 타이머 on
							dangerTime = -180

					# 30초에 한번씩 좌석 및 승객 수 파이어 스토어에 저장
					if saveTime%900==0:
						print('now',int(datetime.now().timestamp()))
						passenger = subway_data
						passenger['current'] = nowPS
						push_passenger(passenger)
						# serializer = PsSerializer(data=passenger)
						# print('시리얼라이저', serializer)
						#
						# if (serializer.is_valid()):
						# 	serializer.save()
						# 	print('성공',saveTime)

					# Write results
					for *xyxy, conf, cls in reversed(det):
					# 	if save_txt:  # Write to file
					# 		xywh = (xyxy2xywh(torch.tensor(xyxy).view(1, 4)) / gn).view(-1).tolist()  # normalized xywh
					# 		with open(txt_path + '.txt', 'a') as f:
					# 			f.write(('%g ' * 5 + '\n') % (cls, *xywh))  # label format
					#
						if view_img:  # Add bbox to image
							label = '%s %.2f' % (names[int(cls)], conf)
							plot_one_box(xyxy, im0, label=label, color=colors[int(cls)], line_thickness=3)



				# Print time (inference + NMS)
				# print('%sDone. (%.3fs)' % (s, t2 - t1))

				self.frame = im0
				saveTime += 1
				dangerTime +=1


		# # Stream results
		# if view_img:
		# 	cv2.imshow(p, im0)
		# 	if cv2.waitKey(1) == ord('q'):  # q to quit
		# 		raise StopIteration

	def save_passenger(data):
		serializer = PsSerializer(data=data)
		serializer.save()

	def get_frame(self):
		image = self.frame
		ret, jpeg = cv2.imencode('.jpg', image)
		return jpeg.tobytes()		

	def update(self):
		while True:
			(self.grabbed, self.frame) = self.video.read()

	def take_frame(self):
		now = datetime.now()
		fileName = filePath + now.strftime('%y%m%d_%H%M%S') + '.png'
		print (fileName)
		cv2.imwrite(fileName, self.frame)

		db = Image(image_name=now.strftime('%y%m%d_%H%M%S'), pub_date=timezone.now())
		db.save()

cam = VideoCamera()

def gen(camera):
	while True:
		frame = cam.get_frame()
		yield(b'--frame\r\n'
			b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

def stream2(request):
    try:
        return StreamingHttpResponse(gen(()), content_type="multipart/x-mixed-replace;boundary=frame")
    except:  # This is bad! replace it with proper handling
        pass

def live(request):
	if request.method == 'POST':
		cam.take_frame()

	return render(request, 'design/html/live.html')

def playback(request):
	image_list = Image.objects.all()
	return render(request, 'design/html/playback.html',
							{'image_list' : image_list})

def playback_show(request, select_image):
	image_list = Image.objects.all()
	return render(request, 'design/html/playback.html',
							{'image_list' : image_list,  'select_image' : select_image})
def setting(request):
 return render(request, 'design/html/setting.html')
