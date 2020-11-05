from django.db import models

# Create your models here.
class Report(models.Model):
    rid = models.AutoField(primary_key=True)
    category = models.CharField(max_length=45)
    sid = models.CharField(max_length=45)
    contents = models.TextField()
    time = models.DateTimeField(auto_now=True)
