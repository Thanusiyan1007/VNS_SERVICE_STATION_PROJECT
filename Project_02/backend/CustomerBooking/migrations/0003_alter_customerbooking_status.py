# Generated by Django 3.2.25 on 2024-10-07 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CustomerBooking', '0002_auto_20241007_1113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerbooking',
            name='status',
            field=models.CharField(default='pending', max_length=20),
        ),
    ]
