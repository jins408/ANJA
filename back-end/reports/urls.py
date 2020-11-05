from django.urls import path
from . import views

urlpatterns = [
    path('', views.ReportView.as_view(), name="reports"),
    path('/<int:report_pk>', views.ReportDetailView.as_view(), name="reports_object"),
    path('/test', views.Test.as_view(), name="firestore"),
]