from django.urls import path
from . import views

urlpatterns = [
    path('/estimate', views.SubwayEstimatedTimeView.as_view(), name="subways_estimated_time"),
    path('/approach', views.SubwayApproachView.as_view(), name="subways_approach"),
    path('/timetable', views.SubwayTimeTableView.as_view(), name="subways_times"),
    path('/station', views.SubwayStationView.as_view(), name="subways_stations"),
    path('/stationInfo', views.StationInfoView.as_view(), name="subways_infos"),
    # path('/test', views.TestView.as_view(), name="test"),
]
