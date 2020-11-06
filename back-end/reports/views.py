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
    def get(self, reqeust):
        queryset = Report.objects.all()
        serializer = ReportSerializer(queryset, many=True)
        return Response({'data': 'test'}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        # 01 / 01 / 01 => 호선 / 열차 / 칸
        # date_time = datetime.now().strftime("%Y/%m/%d/, %H:%M:%S")
        newReport = {
            'category': request.data["category"],
            'sid': request.data["sid"],
            'contents': request.data["contents"],
            'time': datetime.now(),
        }
        doc_ref = getCollection(newReport["sid"])
        doc_ref.add({
            u'sid': newReport["sid"],
            u'category': newReport['category'],
            u'contents': newReport['contents'],
            u'time': newReport['time'],
        })
        return Response({'data': newReport}, status=status.HTTP_201_CREATED)


class ReportDetailView(APIView):
    def get(self, request, report_pk, format=None):
        report = Report.objects.filter(rid=report_pk).first()
        if report:
            serializer = ReportSerializer(report)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)

        else:
            return Response({'data': 'NOT FOUND REPORT'}, status=status.HTTP_200_OK)

    def delete(self, request, doc_id, format=None):
        doc_ref = getCollection(newReport["sid"])
        # report = Report.objects.get(rid=report_pk)
        if report:
            report.delete()
            return Response({'data': 'SUCCESS'}, status=status.HTTP_200_OK)
        else:
            return Response({'data': 'NOT FOUND REPORT'}, status=status.HTTP_200_OK)


def getCollection(sid):
    doc_ref = db.collection(u'reports').document(sid[:2])
    doc_ref = doc_ref.collection(u'열차번호').document(sid[2:4])
    doc_ref = doc_ref.collection(u'칸번호').document(sid[4:6])
    doc_ref = doc_ref.collection(u'messages')
    return doc_ref