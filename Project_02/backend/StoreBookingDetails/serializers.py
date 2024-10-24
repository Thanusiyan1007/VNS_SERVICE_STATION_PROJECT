# serializers.py
from rest_framework import serializers
from .models import Booking, ServiceType, Package

class ServiceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceType
        fields = ['id', 'name']

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ['id', 'service_type', 'name', 'description', 'price_range', 'average_price']

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'technician', 'name', 'address', 'phone_number', 'service_type', 'package', 'total_price', 'appointment_date', 'appointment_time']