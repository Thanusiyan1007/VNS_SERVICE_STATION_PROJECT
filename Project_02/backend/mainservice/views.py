# views.py
from rest_framework import viewsets
from .models import MainService
from .serializers import ServiceSerializer

class MainServiceViewSet(viewsets.ModelViewSet):
    queryset = MainService.objects.all()
    serializer_class = ServiceSerializer
