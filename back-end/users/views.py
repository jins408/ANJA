from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer


# Create your views here.
class UserView(APIView):
    # 모든 회원 불러오기
    def get(self, request, format=None):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    # 회원가입
    def post(self, request, format=None):
        user = User.objects.filter(uid=request.data["uid"])
        if user.exists():
            return Response({'data': 'EXIST ID'}, status=status.HTTP_200_OK)
        if(request.data["password"] == request.data["passwordConfirm"]):
            new_user = {
                'uid': request.data["uid"],
                'password': request.data["password"],
            }
            serializer = UserSerializer(data=new_user)
            if(serializer.is_valid()):
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'data': 'INVALID PASSWORD'}, status=status.HTTP_200_OK)

    # def put(self, request):
    #     user = User.objects.filter(email=request.data["email"]).first()
    #     if user:
    #         if (user.password == request.data["password"]):
    #             serializer = UserSerializer(user)
    #             return Response({'data': serializer.data}, status=status.HTTP_200_OK)
    #
    #         else:
    #             return Response({'data': "INVALID PASSWORD"}, status=status.HTTP_200_OK)
    #
    #     else:
    #         return Response({'data': "NOT FOUND USER"}, status=status.HTTP_200_OK)


class UserDetailView(APIView):
    # 특정 유저 불러오기
    def get(self, request, user_pk, format=None):
        user = User.objects.filter(uid=user_pk).first()
        if user:
            serializer = UserSerializer(user)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'data': 'NOT FOUND USER'}, status=status.HTTP_200_OK)

    # 회원정보 수정
    def put(self, request, user_pk, format=None):
        user = User.objects.get(uid=user_pk)
        if(request.data["password"] == request.data["passwordConfirm"]):
            user.password = request.data["password"]
            user.save()
            return Response({'data': 'SUCCESS'}, status=status.HTTP_200_OK)
        else:
            return Response({'data': 'INVALID PASSWORD'}, status=status.HTTP_200_OK)

    # 회원 삭제
    def delete(self, request, user_pk, format=None):
        user = User.objects.get(uid=user_pk)
        if user:
            user.delete()
            return Response({'data': 'SUCCESS'}, status=status.HTTP_200_OK)
        else:
            return Response({'data': 'NOT FOUND USER'}, status=status.HTTP_200_OK)


class UserSessionView(APIView):
    # 로그인
    def post(self, request, format=None):
        signinUser = request.data;
        user = User.objects.filter(uid=signinUser["uid"]).first()
        if not user:
            return Response({'data': 'NOT FOUND USER'}, status=status.HTTP_200_OK)

        user = user.__dict__
        if signinUser["password"] != user["password"]:
            return Response({'data': 'INVALID PW'}, status=status.HTTP_200_OK)

        serializer = UserSerializer(user)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)
