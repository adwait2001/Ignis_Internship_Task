from django.db import models

# Create your models here.

class Event(models.Model):
    event_name=models.CharField(max_length=100,blank=True,null=True)
    data=models.TextField(blank=True,null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    location=models.CharField(max_length=220,null=True,blank=True)
    image=models.FileField(upload_to='images/', blank=True, null=True)
    is_liked=models.BooleanField(blank=True,null=True,default=False)

    def __str__(self):
        return self.name

 
