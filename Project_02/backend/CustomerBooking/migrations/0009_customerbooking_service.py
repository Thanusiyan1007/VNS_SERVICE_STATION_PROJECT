# Generated by Django 3.2 on 2024-10-22 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CustomerBooking', '0008_customerbooking_customer'),
    ]

    operations = [
        migrations.AddField(
            model_name='customerbooking',
            name='service',
            field=models.CharField(default='', max_length=255),
        ),
    ]
