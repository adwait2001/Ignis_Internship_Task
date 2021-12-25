from django.db import models
from django.shortcuts import render
from django.shortcuts import render
from rest_framework import serializers, viewsets        
from .serializers import EventSerializer      
from .models import Event          
# Create your views here.


class EventView(viewsets.ModelViewSet):
    serializer_class=EventSerializer
    queryset=Event.objects.all()
    