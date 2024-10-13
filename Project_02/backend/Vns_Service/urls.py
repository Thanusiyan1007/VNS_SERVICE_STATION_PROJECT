from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Utilites_Service.views import ServiceViewSet
from mainservice.views import MainServiceViewSet
from CustomerBooking.views import CustomerBookingViewSet, CustomerBookingStatusUpdateView
from ProductApp.views import ProductViewSet
from django.conf import settings
from django.conf.urls.static import static
from CustomerBooking.views import CustomerBookingViewSet, CustomerBookingStatusUpdateView, CustomerBookingTechnicianUpdateView
from users.views import get_user_status, get_all_users, delete_user_by_email,create_superuser, get_user_status, get_all_users
from StoreBookingDetails.views import ServiceTypeViewSet, PackageViewSet, BookingViewSet  # Import new views

# Initialize the DefaultRouter
router = DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'mainservice', MainServiceViewSet)
router.register(r'customerbooking', CustomerBookingViewSet)
router.register(r'products', ProductViewSet)

# New routes for ServiceType, Package, and Booking
router.register(r'servicetypes', ServiceTypeViewSet)
router.register(r'packages', PackageViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include('djoser.urls')),
    path("api/v1/auth/", include('djoser.urls.jwt')),
    # Add the router-generated URLs to urlpatterns
    path('api/v1/', include(router.urls)),
    # Custom route for updating booking status
    path('api/v1/customerbooking/<int:pk>/update_status/', CustomerBookingStatusUpdateView.as_view(), name='customerbooking-update-status'),
    path('api/v1/customerbooking/<int:pk>/update_technician/', CustomerBookingTechnicianUpdateView.as_view(), name='customerbooking-update-technician'),
    path('api/user/status/', get_user_status, name='user-status'),
    path('users/', get_all_users, name='get-all-users'),
    path('user/delete/<str:email>/', delete_user_by_email, name='delete_user_by_email'),
    path('users/create/', create_superuser, name='create_superuser'),
    path('users/', get_all_users, name='get_all_users'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
