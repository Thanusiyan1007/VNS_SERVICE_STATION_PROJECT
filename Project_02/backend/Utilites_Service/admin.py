from django.contrib import admin
from .models import Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'created_at', 'updated_at')  # Display these fields in the list view
    list_filter = ('created_at', 'updated_at')  # Add filters for created and updated times
    search_fields = ('title', 'description')  # Add a search bar for title and description
    readonly_fields = ('created_at', 'updated_at')  # Make created_at and updated_at read-only

    # Optionally, you can add more customization, such as displaying the image in the admin interface.
    def get_image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" />'.format(obj.image.url))
        return ""
    
    get_image_preview.short_description = 'Image Preview'
    list_display_links = ('title',)  # Make the title clickable
