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

API_KEY = "dFO37hTXbj0XfqChs155Oc8em7iRWRtqQYi9kT54LWZSjjBIErEr4sEYwfKn8wIAisL3B8MUYIggAKSrxZXIPA%3D%3D"
SU_API_KEY = "6f6b516269686f6439307a4d76666d"
# 출발역-도착역 소요시간 및 경로 정보
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
        start = request.GET.get("from")
        end = request.GET.get("to")

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

        if(dict["total"] == 0):
            return Response({'data': "NO DATA"}, status=status.HTTP_200_OK)

        else:
            return Response({'data': dict["shortestRouteList"][0]}, status=status.HTTP_200_OK)


# 특정 역에 접근하는 지하철 정보
class SubwayApproachView(APIView):
    def get(self, request):
        # 서울
        # http://swopenapi.seoul.go.kr/api/subway/sample/xml/realtimeStationArrival/0/5/역이름
        station = request.GET.get("station")

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

        if 'realtimeArrivalList' not in dict:
            return Response({'data': "NO DATA"}, status=status.HTTP_200_OK)

        infos = dict["realtimeArrivalList"]
        return Response({'data': infos}, status=status.HTTP_200_OK)


class SubwayTimeTableView(APIView):
    def get(self, request):
        # 서울
        # http://openapi.seoul.go.kr:8088/키/json/SearchSTNTimeTableByIDService/1/300/역코드/요일/상하행/
        # 평일 : 1, 토요일 : 2, 휴일/일요일 : 3
        # 상/하행 : 상행내선1, 하행외선2

        station = request.GET.get('station')
        line = request.GET.get('line')
        day = request.GET.get('day')
        types = {'1': '상행', '2': '하행'}

        if not station or not line or not day:
            return Response({'data': "NOT ENOUGH PARAMS"}, status=status.HTTP_200_OK)

        infos = getStationInfo(station)

        if 'SearchInfoBySubwayNameService' not in infos:
            return Response({'data': "NO DATA"}, status=status.HTTP_200_OK)


        code = ''
        infos = infos["SearchInfoBySubwayNameService"]["row"]
        for info in infos:
            if line in info["LINE_NUM"]:
                code = info["STATION_CD"]

        if not code:
            return Response({'data': "NO DATA"}, status=status.HTTP_200_OK)

        timetable = {}

        length = 0
        timetable = {}
        # 상하행별
        for type, type_value in types.items():
            if type_value not in timetable:
                timetable[type_value] = {}

            URL_SU = []
            URL_SU.append("http://openapi.seoul.go.kr:8088")
            URL_SU.append(SU_API_KEY)
            URL_SU.append("json")
            URL_SU.append("SearchSTNTimeTableByIDService")
            URL_SU.append("1")
            URL_SU.append("300")
            URL_SU.append(code)
            URL_SU.append(day)  # 요일
            URL_SU.append(type)  # 상하행
            URL_SU.append(quote(station))
            URL_SU = "/".join(URL_SU)
            req = Request(URL_SU)
            response = urlopen(req)
            response_body = response.read()
            times = json.loads(response_body.decode('utf-8'))
            if "SearchSTNTimeTableByIDService" in times:
                timetable[type_value] = times["SearchSTNTimeTableByIDService"]["row"]

        return Response({'data': timetable}, status=status.HTTP_200_OK)



def getStationInfo(station):
    # http://openapi.seoul.go.kr:8088/키/json/SearchInfoBySubwayNameService/1/10/역이름/
    URL_SU = []
    URL_SU.append("http://openapi.seoul.go.kr:8088")
    URL_SU.append(SU_API_KEY)
    URL_SU.append("json")
    URL_SU.append("SearchInfoBySubwayNameService")
    URL_SU.append("1")
    URL_SU.append("10")
    URL_SU.append(quote(station))
    URL_SU = "/".join(URL_SU)
    req = Request(URL_SU)
    response = urlopen(req)
    response_body = response.read()
    dict = json.loads(response_body.decode('utf-8'))
    return dict








