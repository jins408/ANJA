from django.db import models


# Create your models here.
class User(models.Model):
    uid = models.CharField(primary_key=True, max_length=45)
    password = models.CharField(max_length=45)
    # email = models.CharField(max_length=45)
    # name = models.CharField(max_length=45)
    # access = models.IntegerField