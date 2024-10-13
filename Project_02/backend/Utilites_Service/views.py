from rest_framework import viewsets
from .models import Service
from .serializers import ServiceSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard actions 
    for CRUD operations on the Service model.
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
