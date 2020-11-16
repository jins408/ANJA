from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Report
from .serializers import ReportSerializer

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from datetime import datetime

cred = credentials.Certificate("taste-ac33e-firebase-adminsdk-u8rj0-fc33c78348.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


class ReportView(APIView):
    def get(self, request):
        doc_ref = getCollection(request.GET.get("id")).document(request.GET.get("reportDocId"))
        doc = doc_ref.get().to_dict()
        return Response({'data': doc}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        # 01 / 01 / 01 => 호선 / 열차 / 칸
        # date_time = datetime.now().strftime("%Y/%m/%d/, %H:%M:%S")
        newReport = {
            'id': request.data["id"],
            'line': request.data["id"][:2],
            'sid': request.data["id"][2:4],
            'ssid': request.data["id"][4:6],
            'category': request.data["category"],
            'contents': request.data["contents"],
            'time': datetime.now(),
        }
        doc_ref = getCollection(request.data["id"])
        doc_ref.add(newReport)
        return Response({'data': newReport}, status=status.HTTP_201_CREATED)

    def delete(self, request):
        ## query에 id와 reportDocId 를 보내야 함
        doc_ref = getCollection(request.GET.get("id"))
        doc_ref.document(request.GET.get("reportDocId")).delete()
        return Response({'data': 'SUCCESS'}, status=status.HTTP_200_OK)


def getCollection(id):
    doc_ref = db.collection(u'reports').document(id[:2]).collection(u'messages')
    return doc_ref
