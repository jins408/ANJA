from django.urls import path
from . import views

urlpatterns = [
    path('', views.ReportView.as_view(), name="reports"),
]