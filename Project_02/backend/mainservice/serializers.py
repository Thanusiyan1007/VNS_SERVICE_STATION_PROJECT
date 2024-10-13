from rest_framework import serializers
from .models import MainService

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainService
        fields = ['id', 'title', 'description', 'image', 'created_at', 'updated_at']  # Ensure all fields exist in your model
