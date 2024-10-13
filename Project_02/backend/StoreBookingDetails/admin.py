# admin.py
from django.contrib import admin
from .models import ServiceType, Package, Booking

admin.site.register(ServiceType)
admin.site.register(Package)
admin.site.register(Booking)
