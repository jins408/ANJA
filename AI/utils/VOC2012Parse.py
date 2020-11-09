from xml.etree import ElementTree
import os
import shutil


Paths = os.listdir('./Annotations')
print(Paths)

for path in Paths:

    tree = ElementTree.parse('./Annotations/'+path)
    FileName = path.split('.')[0]
    textFileName = FileName+'.txt'
    imgFileName = FileName + '.jpg'
    # print(filename)
    #
    iter_element = tree.iter(tag="size") # 이미지파일의 size를 가져온다
    width = 0
    height = 0
    for element in iter_element:
        width = element.find("width").text
        height = element.find("height").text

    width = int(width)
    height = int(height)
    # print(width,height)

    iter_element = tree.iter(tag="object") # 마스크레이블링 지역을 가져온다.


    label =0
    isBicycle = False

    for element in iter_element:
        name = element.find("name").text

        if name == 'bicycle':
            print('name', name)
            isBicycle = True

    iter_element = tree.iter(tag="object")  # 마스크레이블링 지역을 가져온다.
    if isBicycle:
        f = open('./train/labels/'+textFileName, mode='wt', encoding='utf-8')

        for idx,element in enumerate(iter_element): # animal태그를 순회합니다
            if idx != 0:
                f.write('\n')
            name = element.find("name").text
            print('name',name)
            if name == 'bicycle':
                label = 2
                xmin = element.find("bndbox").find("xmin").text
                ymin = element.find("bndbox").find("ymin").text
                xmax = element.find("bndbox").find("xmax").text
                ymax = element.find("bndbox").find("ymax").text
                xmin = int(xmin)
                ymin = int(ymin)
                xmax = int(xmax)
                ymax = int(ymax)
                print(label,((xmin+xmax)/2)/width,((ymin+ymax)/2)/height,abs(xmax-xmin)/width,abs(ymax-ymin)/height)
                data = str(label) + ' ' + str(((xmin+xmax)/2)/width) + ' ' + str(((ymin+ymax)/2)/height) + ' ' + \
                       str(abs(xmax-xmin)/width) + ' ' + str(abs(ymax-ymin)/height)
                f.write(data)
        f.close()
        shutil.copyfile('./JPEGImages/'+imgFileName,'./train/images/'+imgFileName)

    # print(animals) # 결과를 출력한다