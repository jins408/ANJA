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

# path('/approach', views.SubwayApproachView.as_view(), name="subways_approach"),
# path('/timetable', views.SubwayTimeTableView.as_view(), name="subways_times"),
# path('/station', views.SubwayStationView.as_view(), name="subways_stations"),
# path('/stationInfo', views.StationInfoView.as_view(), name="subways_infos")
# 출발역-도착역 소요시간 및 경로 정보
# /estimate
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
            '1071': '수인선',
            '1075': '분당선',
            '1077': '신분당선',
            '1078': '인천 2호선',
            '1079': '의정부경전철',
            '1080': '에버라인',
            '1081': '경강선',
            '1091': '자기부상',
            '1092': '우이신설',
            '1093': '서해선',
        }
        # 서울
        # http://swopenapi.seoul.go.kr/api/subway/sample/json/shortestRoute/0/5/출발지/도착지
        # 발산 -> 서울     * 역 붙이면 안됨
        start = request.GET.get("from")
        end = request.GET.get("to")

        if not start or not end:
            return Response({'data': "NOT ENOUGH PARAMS"}, status=status.HTTP_200_OK)

        if start == '서울역':
            start = '서울'
        if end == '서울역':
            end = '서울'

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


        # 최소환승, 최단거리 경로
        items = dict["shortestRouteList"]
        minRoute = copy.deepcopy(sorted(items, key=lambda item: (item['minTravelTm']))[0])
        shortRoute = copy.deepcopy(sorted(items, key=lambda item: (item['shtTravelTm']))[0])

        # 데이터 오류 제거
        minStatnNm = minRoute["minStatnNm"].split(", ")
        if minStatnNm[0] == minStatnNm[1]:
            minStatnId = minRoute["minStatnId"].split(",")
            minStatnNm.pop(0)
            minStatnId.pop(0)
            minRoute["minStatnNm"] = ", ".join(minStatnNm)
            minRoute["minStatnId"] = ",".join(minStatnId)
            minRoute["statnFid"] = minStatnId[0]

        shtStatnNm = minRoute["shtStatnNm"].split(", ")
        if shtStatnNm[0] == shtStatnNm[1]:
            shtStatnId = minRoute["shtStatnId"].split(",")
            shtStatnNm.pop(0)
            shtStatnId.pop(0)
            minRoute["shtStatnNm"] = ", ".join(shtStatnNm)
            minRoute["shtStatnId"] = ",".join(shtStatnId)
            minRoute["statnFid"] = shtStatnId[0]

        minStatnNm = shortRoute["minStatnNm"].split(", ")
        if minStatnNm[0] == minStatnNm[1]:
            minStatnId = shortRoute["minStatnId"].split(",")
            minStatnNm.pop(0)
            minStatnId.pop(0)
            shortRoute["minStatnNm"] = ", ".join(minStatnNm)
            shortRoute["minStatnId"] = ",".join(minStatnId)
            shortRoute["statnFid"] = minStatnId[0]

        shtStatnNm = shortRoute["shtStatnNm"].split(", ")
        if shtStatnNm[0] == shtStatnNm[1]:
            shtStatnId = shortRoute["shtStatnId"].split(",")
            shtStatnNm.pop(0)
            shtStatnId.pop(0)
            shortRoute["shtStatnNm"] = ", ".join(shtStatnNm)
            shortRoute["shtStatnId"] = ",".join(shtStatnId)
            shortRoute["statnFid"] = shtStatnId[0]

        # 최소환승 노선 구하기
        minStationIDs = minRoute["minStatnId"][:-1].split(",")
        pprint(minStationIDs)
        minStationNames = minRoute["minStatnNm"][:-1].split(", ")
        minLines = {'line': [], 'station': []}
        for index, minStation in enumerate(minStationIDs):
            stationID = minStation[:4]
            if stationID not in lineDict:
                return Response({'data': 'NOT SUPPORTED'}, status=status.HTTP_200_OK)
            line = lineDict[stationID]
            if line not in minLines['line']:
                minLines['line'].append(line)
                minLines['station'].append(minStationNames[index])

        # 최단거리 노선 구하기
        shortStationIDs = shortRoute["shtStatnId"][:-1].split(",")
        shortStationNames = shortRoute["shtStatnNm"][:-1].split(", ")
        shortLines = {'line': [], 'station': []}
        for index, shortStation in enumerate(shortStationIDs):
            stationID = shortStation[:4]
            if stationID not in lineDict:
                return Response({'data': 'NOT SUPPORTED'}, status=status.HTTP_200_OK)
            line = lineDict[stationID]
            if line not in shortLines['line']:
                shortLines['line'].append(line)
                shortLines['station'].append(shortStationNames[index])

        # 환승 노선들 값 추가해주기
        minRoute["transLines"] = minLines
        shortRoute["transLines"] = shortLines

        # 상하행 판단
        if minRoute["minStatnId"][0] < minRoute["minStatnId"][1]:
            minRoute["upDown"] = "상행"
        else:
            minRoute["upDown"] = "하행"

        if shortRoute["shtStatnId"][0] < shortRoute["shtStatnId"][1]:
            shortRoute["upDown"] = "상행"
        else:
            shortRoute["upDown"] = "하행"

        if int(minRoute["minTravelTm"]) >= 180:
            minRoute["minTravelTm"] = minRoute["shtTravelTm"]
            minRoute["minTravelMsg"] = minRoute["shtTravelMsg"]

        if int(shortRoute["shtTravelTm"]) >= 180:
            shortRoute["shtTravelTm"] = shortRoute["minTravelTm"]
            shortRoute["shtTravelMsg"] = shortRoute["minTravelMsg"]

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

        if not station or not line or not day:
            return Response({'data': "NOT ENOUGH PARAMS"}, status=status.HTTP_200_OK)


        # pprint(station + " " + line)
        stations = getStationInfo(station)
        dict = next((item for item in stations if line in item['line']), None)
        if not dict:
            return Response({'data': 'NOT FOUND STATION'}, status=status.HTTP_200_OK)
        stationID = dict["stationCode"]
        pprint(stations)

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
                # pprint(item)
                item["depTime"] = item["depTime"][:2] + ":" + item["depTime"][2:4] + ":" + item["depTime"][4:6]
                item["arrTime"] = item["arrTime"][:2] + ":" + item["arrTime"][2:4] + ":" + item["arrTime"][4:6]
                time = {
                    "ARRIVETIME": item["depTime"],
                    "endSubwayStationNm": item["endSubwayStationNm"]
                }
                items.append(time)
            timetable[type_value] = items

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


    seouls = ['경춘선', '경의중앙선', '공항철도', '신분당선', '인천 1호선', '인천 2호선', '우이신설', '수인분당선', '김포골드']
    if not dict:
        return None
    items = []
    if str(type(dict["item"])) == "<class 'dict'>":
        items.append(dict["item"])
    else:
        items = dict["item"]
    pprint(items)

    subways = []
    for item in items:
        line = item["subwayRouteName"].replace("선", "")
        info = {}
        if (line.startswith("서울")):
            info['line'] = item["subwayRouteName"][3:]
        else:
            for seoul in seouls:
                if line in seoul:
                    info['line'] = item["subwayRouteName"]
        if "line" not in info:
            continue
        info["stationCode"] = item["subwayStationId"]
        info["station"] = item["subwayStationName"]
        subways.append(info)
    pprint(subways)
    return subways


class StationInfoView(APIView):
    # 키워드에 맞는 서울 지하철 찾기
    def get(self, request):
        station = request.GET.get("station")
        infos = getStationInfo(station)
        if not infos:
            return Response({"data": "NO DATA"}, status=status.HTTP_200_OK)

        stations = []
        for info in infos:
            if info["station"] == station:
                stations.append(info["line"])
        stations.sort()

        return Response({"data": stations}, status=status.HTTP_200_OK)







