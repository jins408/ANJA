from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from urllib.request import Request, urlopen
from .models import Passenger
from .serializers import PsSerializer
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import shutil

# 열차 번호를 넣어 해당하는 열차 모든 칸의 인원수를 가져온다.
class AppPassenger(APIView):
    def get(self,request):
        queryset = Passenger.objects.last()
        serializer = PsSerializer(queryset)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self,request):
        file = request.data['file']
        filename = str(request.data['file'])
        print(file,type(file))
        print(str(request.data['file']))
        default_storage.save('./'+str(request.data['file']), ContentFile(file.read()))
        shutil.move('./'+filename,'./../FE/build/video')
        # f=open(request.data['name'],'wb')
        # f.write('file')
        # f.close()
        return Response({'good':'good'},status=status.HTTP_200_OK)

