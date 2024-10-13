from rest_framework import serializers
from .models import CustomerBooking

class CustomerBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerBooking
        fields = '__all__'

    def validate_customer_email(self, value):
        if not value:
            raise serializers.ValidationError("Customer email cannot be empty.")
        return value
