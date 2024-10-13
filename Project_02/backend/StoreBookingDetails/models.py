from django.conf import settings
from django.db import models

# Define the ServiceType model
class ServiceType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Define the Package model
class Package(models.Model):
    service_type = models.ForeignKey(ServiceType, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price_range = models.CharField(max_length=100)
    average_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.name} ({self.service_type})'

# Define the Booking model
class Booking(models.Model):
    # Reference technician field using settings.AUTH_USER_MODEL
    technician = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    service_type = models.ForeignKey(ServiceType, on_delete=models.SET_NULL, null=True)
    package = models.ForeignKey(Package, on_delete=models.SET_NULL, null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()

    def __str__(self):
        return f'{self.name} - {self.service_type}'
