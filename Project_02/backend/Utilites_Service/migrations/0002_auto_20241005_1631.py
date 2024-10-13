# Generated by Django 3.2.25 on 2024-10-05 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Utilites_Service', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='service',
            old_name='name',
            new_name='title',
        ),
        migrations.RemoveField(
            model_name='service',
            name='price',
        ),
        migrations.AddField(
            model_name='service',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='service_images/'),
        ),
    ]