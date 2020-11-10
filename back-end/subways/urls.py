from django.urls import path
from . import views

urlpatterns = [
    path('/estimate', views.SubwayEstimatedTimeView.as_view(), name="subways_estimated_time"),
    path('/approach', views.SubwayApproachView.as_view(), name="subways_approach"),
    path('/timetable', views.SubwayTimeTableView.as_view(), name="subways_times"),
    # path('/test', views.Test.as_view(), name="test"),
]
