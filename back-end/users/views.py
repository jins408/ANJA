from django.shortcuts import render
from django.http import Http404
from django.http import HttpResponse, JsonResponse
from rest_framework import status
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer

import json


# Create your views here.
def index(request):
    return HttpResponse("Hello, World")


class UserViewSet(APIView):
    def get(request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)

    def get_object(request, user_pk):
        user = User.objects.get(uid=user_pk)
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)