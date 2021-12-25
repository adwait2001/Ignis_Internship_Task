from django.db import models
from django.db.models import fields
from rest_framework import serializers

from .models import Event

class EventSerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(format="%d-%m-%Y %I:%M %p")
    class Meta:
        model=Event
        fields='__all__'