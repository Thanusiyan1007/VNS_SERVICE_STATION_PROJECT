# Generated by Django 3.2 on 2024-10-24 07:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('StoreBookingDetails', '0002_booking_start_work_day'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='start_work_day',
        ),
    ]