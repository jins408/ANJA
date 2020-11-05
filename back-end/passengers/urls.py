from django.urls import path
from . import views

urlpatterns = [
    path('/passenger', views.AppPassenger.as_view(), name="passenger"),
]
