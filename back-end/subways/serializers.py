from rest_framework import serializers
from .models import Station


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ('stationCode', 'station', 'line', 'station_nm_eng', 'station_cd_fr')
