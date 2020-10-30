from django.urls import path
from . import views

urlpatterns = [
    path('/estimated', views.SubwayEstimatedTimeView.as_view(), name="subways_estimated_time"),
    path('/approach', views.SubwayApproachView.as_view(), name="subways_approach"),
]
