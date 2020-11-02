from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Report
from .serializers import ReportSerializer


class ReportView(APIView):
    def get(self, reqeust):
        queryset = Report.objects.all()
        serializer = ReportSerializer(queryset, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        newReport = {
            'category': request.data["category"],
            'sid': request.data["sid"],
            'contents': request.data["contents"],
        }
        serializer = ReportSerializer(data=newReport)
        if(serializer.is_valid()):
            serializer.save()
            return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)

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