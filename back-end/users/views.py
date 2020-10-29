from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib import auth

from .models import User
from .serializers import UserSerializer


# Create your views here.
class UserView(APIView):
    def get(self, request, format=None):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = User.objects.filter(email=request.data["email"])
        if user.exists():
            return Response({'data': 'EXIST EMAIL'}, status=status.HTTP_400_BAD_REQUEST)
        if(request.data["pw"] == request.data["pwConfirm"]):
            new_user = {
                'email': request.data["email"],
                'pw': request.data["pw"],
                'name': request.data["name"],
            }
            serializer = UserSerializer(data=new_user)
            if(serializer.is_valid()):
                serializer.save()
            return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'data': 'INVALID PASSWORD'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        user = User.objects.filter(email=request.data["email"]).first()
        if user:
            if (user.pw == request.data["pw"]):
                serializer = UserSerializer(user)
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)

            else:
                return Response({'data': "INVALID PASSWORD"}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'data': "NOT FOUND USER"}, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(APIView):
    def get(self, request, user_pk, format=None):
        user = User.objects.filter(uid=user_pk).first()
        if user:
            serializer = UserSerializer(user)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)

        else:
            return Response({'data': 'NOT FOUND USER'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, user_pk, format=None):
        user = User.objects.get(uid=user_pk)
        if(request.data["pw"] == request.data["pwConfirm"]):
            user.pw = request.data["pw"]
            user.name = request.data["name"]
            user.save()
            return Response({'data': 'SUCCESS'}, status=status.HTTP_200_OK)
        else:
            return Response({'data': 'INVALID PASSWORD'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_pk, format=None):
        user = User.objects.get(uid=user_pk)
        if user:
            user.delete()
            return Response({'data': 'SUCCESS'}, status=status.HTTP_200_OK)
        else:
            return Response({'data': 'NOT FOUND USER'}, status=status.HTTP_400_BAD_REQUEST)
