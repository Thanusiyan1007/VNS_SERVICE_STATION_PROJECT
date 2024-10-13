# Generated by Django 3.2.25 on 2024-10-07 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CustomerBooking', '0006_customerbooking_technician'),
    ]

    operations = [
        migrations.AddField(
            model_name='customerbooking',
            name='rejected_technicians',
            field=models.TextField(default='[]'),
        ),
        migrations.AlterField(
            model_name='customerbooking',
            name='technician',
            field=models.EmailField(blank=True, default='none', max_length=254, verbose_name='Technician Mail'),
        ),
    ]