from django.db import models

# Create your models here.
class Passenger(models.Model):
	sid = models.IntegerField()
	nowPS = models.IntegerField()
	fullPS = models.IntegerField()
	time = models.DateTimeField()
