from rest_framework import serializers
from .models import Passenger


class PsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = ('sid', 'nowPS', 'fullPS', 'time')
