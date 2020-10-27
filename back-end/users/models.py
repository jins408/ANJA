from django.db import models


# Create your models here.
class User(models.Model):
    uid = models.AutoField(primary_key=True)
    email = models.CharField(max_length=45)
    pw = models.CharField(max_length=45)
    name = models.CharField(max_length=45)
    # access = models.IntegerField
