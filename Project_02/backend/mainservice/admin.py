# admin.py
from django.contrib import admin
from .models import MainService

@admin.register(MainService)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
