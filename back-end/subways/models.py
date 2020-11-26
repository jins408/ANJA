from django.db import models


# Create your models here.
class Station(models.Model):
    stationCode = models.CharField(primary_key=True, max_length=20, db_column='station_cd')
    station = models.CharField(max_length=20, db_column='station_nm')
    station_nm_eng = models.CharField(max_length=100)
    line = models.CharField(max_length=20, db_column='station_line')
    station_cd_fr = models.CharField(max_length=20)
