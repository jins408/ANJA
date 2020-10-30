import pandas as pd
from bs4 import BeautifulSoup
import requests
import time

from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from urllib.request import urlopen
from xml.etree import ElementTree
from urllib.request import Request, urlopen
from urllib.parse import urlencode, quote_plus, unquote, quote
from pprint import pprint

import json

# URL = "http://openapi.tago.go.kr/openapi/service/MetroRtInfoService/getMetroRtTrainLocList?serviceKey=dFO37hTXbj0XfqChs155Oc8em7iRWRtqQYi9kT54LWZSjjBIErEr4sEYwfKn8wIAisL3B8MUYIggAKSrxZXIPA%3D%3D&pageNo=1&numOfRows=100&cityCd=BS&trainNo=2&lineNo=2"
API_KEY = "dFO37hTXbj0XfqChs155Oc8em7iRWRtqQYi9kT54LWZSjjBIErEr4sEYwfKn8wIAisL3B8MUYIggAKSrxZXIPA%3D%3D"

# Create your views here.
# class SubwayView(APIView):
#     def get(self, request):
#         req = requests.get(URL)
#         html = req.text
#         soup = BeautifulSoup(html, 'html.parser')
#         # items = soup.find_all('item')
#         subways = {}
#         attrs = ['dirnm', 'stationnm', 'deststanm', 'statusnm', 'colldttm']
#         # print(soup)
#         for attr in attrs:
#             finded_attr = soup.find_all(attr)
#             # print(attr)
#             # print(finded_attr)
#             if subways.get(attr) is None:
#                 subways[attr] = [x.text for x in finded_attr]
#             else:
#                 subways[attr] = subways[attr] + [x.text for x in finded_attr]
#
#         df = pd.DataFrame(subways)
#         df = df.rename(columns={'dirnm': '상하행', 'colldttm': '수집시간', 'deststanm':'종착역', 'statusnm': '열차상태', 'stationnm': '현재역'})
#         print(df)

class SubwayEstimatedTimeView(APIView):
    def get(self, request):
        ## 대전
        """
        # # start = request.data["start"]
        # URL_DJ = 'http://www.djet.co.kr/OpenAPI/service/TimeDistSVC/getTimeDist/'
        # # end = request.data["end"]
        # URL_DJ += '?strstnno=' + '111' + '&endstnno=' + '101' + '&ServiceKey=' + API_KEY
        # req = requests.get(URL_DJ)
        # html = req.text
        # soup = BeautifulSoup(html, 'html.parser')
        # print(soup)
        # resultCode = soup.find('resultcode').text
        # print(resultCode)
        # if resultCode is not '00':
        #     resultMsg = soup.find('resultmsg').text
        #     return Response({'data': resultMsg}, status=status.HTTP_200_OK)
        # else:
        #     items = soup.find_all('item')
        #     for item in items:
        #         print(item)
        #     return Response({'data': items}, status=status.HTTP_200_OK)
        """

        # 서울
        # http://swopenapi.seoul.go.kr/api/subway/sample/json/shortestRoute/0/5/출발지/도착지
        start = request.GET["from"]
        end = request.GET["to"]

        if not start or not end:
            return Response({'data': "NOT ENOUGH PARAMS"}, status=status.HTTP_200_OK)

        URL_SU = []
        URL_SU.append("http://swopenapi.seoul.go.kr/api/subway/sample/json/shortestRoute")
        URL_SU.append("0")
        URL_SU.append("5")
        URL_SU.append(quote(start))
        URL_SU.append(quote(end))
        URL_SU = "/".join(URL_SU)
        req = Request(URL_SU)
        response = urlopen(req)
        response_body = response.read()
        dict = json.loads(response_body.decode('utf-8'))

        return Response({'data': dict["shortestRouteList"][0]}, status=status.HTTP_200_OK)


class SubwayApproachView(APIView):
    def get(self, request):
        # 서울
        # http://swopenapi.seoul.go.kr/api/subway/sample/xml/realtimeStationArrival/0/5/역이름

        station = request.GET["station"]

        if not station:
            return Response({'data': "NOT ENOUGH PARAMS"}, status=status.HTTP_200_OK)

        URL_SU = []
        URL_SU.append("http://swopenapi.seoul.go.kr/api/subway/sample/json/realtimeStationArrival")
        URL_SU.append("0")
        URL_SU.append("5")
        URL_SU.append(quote(station))
        URL_SU = "/".join(URL_SU)
        req = Request(URL_SU)
        response = urlopen(req)
        response_body = response.read()
        dict = json.loads(response_body.decode('utf-8'))

        if 'realtimeArrivalList' in dict:
            return Response({'data': dict["realtimeArrivalList"]}, status=status.HTTP_200_OK)

        else:
            return Response({'data': "NO DATA"}, status=status.HTTP_200_OK)









