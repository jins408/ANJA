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

import xmltodict
import json
import copy

API_KEY = "dFO37hTXbj0XfqChs155Oc8em7iRWRtqQYi9kT54LWZSjjBIErEr4sEYwfKn8wIAisL3B8MUYIggAKSrxZXIPA%3D%3D"
SU_API_KEY = "6f6b516269686f6439307a4d76666d"


# 출발역-도착역 소요시간 및 경로 정보
class SubwayEstimatedTimeView(APIView):
    def get(self, request):
        lineDict = {
            '1001': '1호선',
            '1002': '2호선',
            '1003': '3호선',
            '1004': '4호선',
            '1005': '5호선',
            '1006': '6호선',
            '1007': '7호선',
            '1008': '8호선',
            '1009': '9호선',
            '1063': '경의중앙',
            '1065': '공항철도',
            '1067': '경춘선',
            '1069': '인천 1호선',
            '1071': '수인분당선',
            '1077': '신분당선',
            '1078': '인천 2호선',
        }
        # 서울
        # http://swopenapi.seoul.go.kr/api/subway/sample/json/shortestRoute/0/5/출발지/도착지
        # 발산 -> 서울     * 역 붙이면 안됨
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

        if "shortestRouteList" not in dict:
            return Response({'data': "NO DATA"}, status=status.HTTP_200_OK)

        items = dict["shortestRouteList"]
        minRoute = copy.deepcopy(sorted(items, key=lambda item: (item['minTravelTm']))[0])
        shortRoute = copy.deepcopy(sorted(items, key=lambda item: (item['shtTravelTm']))[0])

        # 최소환승 노선 구하기
        minStationNames = minRoute["minStatnId"][:-1].split(",")
        minStationIDs = minRoute["minStatnId"][:-1].split(",")
        # minStationIDs = lineDict[minRoute["minStatnId"][:4]]
        minLines = {'line': [], 'station': []}
        # minLines = {lineDict[minStationIDs[0][:4]]: minStationNames[0]}
        for minStation in minStationNames:
            stationID = minStation[:4]
            line = lineDict[stationID]
            if line not in minLines['line']:
                minLines['line'].append(line)
                minLines['station'].append(minStation)

        # # 최단거리 노선 구하기
        # key = lineDict[shortRoute["shtStatnId"][:4]]
        # shortLines = [key, ]
        # for shortStation in shortRoute["shtStatnId"][:-1].split(","):
        #     stationID = shortStation[:4]
        #     line = lineDict[stationID]
        #     if key != line and line not in shortLines:
        #         shortLines.append(line)

        minRoute["minLines"] = minLines
        # shortRoute["shortLines"] = shortLines

        return Response({'data': {'최소환승': minRoute, '최단거리': shortRoute}}, status=status.HTTP_200_OK)


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
        # http://openapi.tago.go.kr/openapi/service/SubwayInfoService/getSubwaySttnAcctoSchdulList
        # serviceKey=서비스키
        # subwayStationId=SUB133
        # dailyTypeCode=03
        # upDownTypeCode=U

        # 요일구분코드 평일 : 01, 토요일 : 02, 휴일 : 03
        # 상하행구분코드 : U : 상행, D: 하행

        station = request.GET.get('station')
        line = request.GET.get('line')
        day = '0' + request.GET.get('day')
        types = {'U': '상행', 'D': '하행'}
        days = {'01': '평일', '02': '토요일', '03': '휴일'}

        # if not station or not line or not day:
        #     return Response({'data': "NOT ENOUGH PARAMS"}, status=status.HTTP_200_OK)


        pprint(station + " " + line + "호선")
        # stations = getStationInfo(station)
        # pprint(stations)
        # dict = next((item for item in stations if line in item['line']), None)
        # if not dict:
        #     return Response({'data': 'NOT FOUND STATION'}, status=status.HTTP_200_OK)
        #
        # pprint(dict)
        # stationID = dict["stationCode"]
        stationID = "SUB133"
        timetable = {}
        # 상하행별
        for type, type_value in types.items():
            if type_value not in timetable:
                timetable[type_value] = {}
            URL_SU = []
            URL_SU.append("http://openapi.tago.go.kr/openapi/service/SubwayInfoService/getSubwaySttnAcctoSchdulList")
            URL_SU.append("?serviceKey=")
            URL_SU.append(API_KEY)
            URL_SU.append("&subwayStationId=")
            URL_SU.append(stationID)
            URL_SU.append("&dailyTypeCode=")
            URL_SU.append(day)
            URL_SU.append("&upDownTypeCode=")
            URL_SU.append(type)
            URL_SU.append("&numOfRows=300")
            URL_SU = "".join(URL_SU)
            req = Request(URL_SU)
            response = urlopen(req)
            response_body = response.read()
            dict = xmltodict.parse(response_body)
            dict = json.loads(json.dumps(dict))["response"]["body"]["items"]["item"]
            dict = sorted(dict, key=lambda subway: (subway['depTime']))
            items = []
            for item in dict:
                if item["depTime"].startswith("00"):
                    continue
                item["depTime"] = item["depTime"][:2] + ":" + item["depTime"][2:4] + ":" + item["depTime"][4:6]
                item["arrTime"] = item["arrTime"][:2] + ":" + item["arrTime"][2:4] + ":" + item["arrTime"][4:6]
                foo = {
                    "depTime": item["depTime"]
                }
                items.append(foo)
            timetable[type_value] = items
            # if type_value not in timetable:
            #     timetable[type_value] = {}
            # for day, day_value in days.items():
            #     if day_value not in timetable[type_value]:
            #         timetable[type_value][day_value] = {}
            #     URL_SU = []
            #     URL_SU.append("http://openapi.tago.go.kr/openapi/service/SubwayInfoService/getSubwaySttnAcctoSchdulList")
            #     URL_SU.append("?serviceKey=")
            #     URL_SU.append(API_KEY)
            #     URL_SU.append("&subwayStationId=")
            #     URL_SU.append(stationID)
            #     URL_SU.append("&dailyTypeCode=")
            #     URL_SU.append(day)
            #     URL_SU.append("&upDownTypeCode=")
            #     URL_SU.append(type)
            #     URL_SU.append("&numOfRows=300")
            #     URL_SU = "".join(URL_SU)
            #     req = Request(URL_SU)
            #     response = urlopen(req)
            #     response_body = response.read()
            #     dict = xmltodict.parse(response_body)
            #     dict = json.loads(json.dumps(dict))["response"]["body"]["items"]["item"]
            #     dict = sorted(dict, key=lambda subway: (subway['depTime']))
            #     items = []
            #     for item in dict:
            #         if item["depTime"].startswith("00") or item["depTime"].startswith("24"):
            #             continue
            #         item["depTime"] = item["depTime"][:2] + ":" + item["depTime"][2:4] + ":" + item["depTime"][4:6]
            #         item["arrTime"] = item["arrTime"][:2] + ":" + item["arrTime"][2:4] + ":" + item["arrTime"][4:6]
            #         items.append(item)
            #     timetable[type_value][day_value] = items

        return Response({'data': timetable}, status=status.HTTP_200_OK)

# 지하철역이름(키워드)으로 {호선, 지하철역ID, 지하철역이름} 찾기
class SubwayStationView(APIView):
    def get(self, request):
        station = request.GET.get("station")
        items = getStationInfo(station)
        if not items:
            return Response({'data': "NO DATA"}, status=status.HTTP_200_OK)

        stations = []
        for item in items:
            if item["station"] not in stations:
                stations.append(item["station"])
        return Response({'data': stations}, status=status.HTTP_200_OK)


# 지하철역이름(키워드)으로 {호선, 지하철역ID, 지하철역이름} 찾는 함수
def getStationInfo(station):
    URL_SU = []
    URL_SU.append("http://openapi.tago.go.kr/openapi/service/SubwayInfoService/getKwrdFndSubwaySttnList")
    URL_SU.append("?")
    URL_SU.append("serviceKey=")
    URL_SU.append(API_KEY)
    URL_SU.append("&")
    URL_SU.append("subwayStationName=")
    URL_SU.append(quote(station))
    URL_SU = "".join(URL_SU)
    req = Request(URL_SU)
    response = urlopen(req)
    response_body = response.read()
    dict = xmltodict.parse(response_body)
    dict = json.loads(json.dumps(dict))
    dict = dict["response"]["body"]["items"]

    seouls = ['경춘선', '경의중앙선', '공항철도', '신분당선', '인천 1호선', '인천 2호선', '우이신설', '수인선']
    if not dict:
        return None
    items = dict["item"]
    subways = []
    for item in items:
        type = item["subwayRouteName"]
        info = {}
        if (type.startswith("서울")):
            info['line'] = item["subwayRouteName"][3:]
        elif type in seouls:
            info['line'] = item["subwayRouteName"]
        else:
            continue
        info["stationCode"] = item["subwayStationId"]
        info["station"] = item["subwayStationName"]
        subways.append(info)
    return subways


# class StationInfoView(APIView):
#     # 키워드에 맞는 서울 지하철 찾기
#     def get(self, request):
#         seouls = ['경춘선', '경의중앙선', '공항철도', '신분당선', '인천 1호선', '인천 2호선', '우이신설', '수인선']
#         data = getStationInfo(request.GET.get("station"))
#         # pprint(json.dumps(items, ensure_ascii=False))
#
#         if not data:
#             return Response({"data": "NO DATA"}, status=status.HTTP_200_OK)
#
#         items = data["item"]
#
#         subways = []
#         for item in items:
#             print(item)
#             type = item["subwayRouteName"]
#             info = {}
#             if(type.startswith("서울")):
#                 info['line'] = item["subwayRouteName"][3:]
#             elif type in seouls:
#                 info['line'] = item["subwayRouteName"]
#             else:
#                 continue
#             info["stationCode"] = item["subwayStationId"]
#             info["station"] = item["subwayStationName"]
#             subways.append(info)
#         return Response({"data": subways}, status=status.HTTP_200_OK)







