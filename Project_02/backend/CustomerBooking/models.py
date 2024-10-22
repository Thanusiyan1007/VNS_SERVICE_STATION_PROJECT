from django.db import models
import json

class CustomerBooking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    name = models.CharField(max_length=255)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    service = models.CharField(max_length=255, default='')  
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    technician = models.EmailField("Technician Mail", max_length=254, default='none', blank=True)
    customer = models.EmailField("Customer Mail", max_length=254, default='none', blank=True)

    rejected_technicians = models.TextField(default='[]')  # Store rejected emails as JSON-like list

    def add_rejected_technician(self, email):
        rejected_list = json.loads(self.rejected_technicians)
        rejected_list.append(email)
        self.rejected_technicians = json.dumps(rejected_list)
        self.save()

    def __str__(self):
        return f'{self.name} - {self.appointment_date} {self.appointment_time}'
