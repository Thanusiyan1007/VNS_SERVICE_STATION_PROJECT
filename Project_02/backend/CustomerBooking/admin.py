from django.contrib import admin
from .models import CustomerBooking

@admin.register(CustomerBooking)
class CustomerBookingAdmin(admin.ModelAdmin):
    list_display = ('name', 'appointment_date', 'appointment_time', 'phone_number')
    search_fields = ('name', 'phone_number', 'appointment_date')
    list_filter = ('appointment_date', 'appointment_time')
    ordering = ('appointment_date', 'appointment_time')
