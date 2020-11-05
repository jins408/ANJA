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


class ReportView(APIView):
    def get(self, reqeust):
        queryset = Report.objects.all()
        serializer = ReportSerializer(queryset, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        # date_time = datetime.now().strftime("%Y/%m/%d/, %H:%M:%S")
        newReport = {
            'category': request.data["category"],
            'line': request.data["sid"][:1],
            'sid': request.data["sid"],
            'contents': request.data["contents"],
            'time': datetime.now().strftime("%Y/%m/%d, %H:%M:%S"),
        }
        # serializer = ReportSerializer(data=newReport)
        # if(serializer.is_valid()):
        db = firestore.client()
        doc_ref = db.collection(u'reports').document(newReport['line']).collection(u'messages')
        doc_ref.add({
            u'sid': newReport['sid'],
            u'category': newReport['category'],
            u'contents': newReport['contents'],
            u'time': newReport['time'],
        })
        # serializer.save()
        return Response({'data': newReport}, status=status.HTTP_201_CREATED)


class ReportDetailView(APIView):
    def get(self, request, report_pk, format=None):
        report = Report.objects.filter(rid=report_pk).first()
        if report:
            serializer = ReportSerializer(report)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)

        else:
            return Response({'data': 'NOT FOUND REPORT'}, status=status.HTTP_200_OK)

    def delete(self, request, report_pk, format=None):
        report = Report.objects.get(rid=report_pk)
        if report:
            report.delete()
            return Response({'data': 'SUCCESS'}, status=status.HTTP_200_OK)
        else:
            return Response({'data': 'NOT FOUND REPORT'}, status=status.HTTP_200_OK)


class Test(APIView):
    def post(self, request):


        # db = firestore.client()
        #
        # newReport = {
        #     'category': request.data["category"],
        #     'sid': request.data["sid"],
        #     'contents': request.data["contents"],
        # }
        # serializer = ReportSerializer(data=newReport)

        return Response({'data': datetime.now()}, status=status.HTTP_200_OK)

        # taste-ac33e-firebase-adminsdk-u8rj0-fc33c78348
        #
        # doc_ref = db.collection(u'subway').document(str(request['line'])).collection(u'messages')
        # doc_ref.add({
        #     u'rid': request['rid'],
        #     u'message': request['message'],
        #     u'time': datetime.now()
        # })