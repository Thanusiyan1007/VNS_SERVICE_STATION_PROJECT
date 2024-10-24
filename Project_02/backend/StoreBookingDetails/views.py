from rest_framework import viewsets
from .models import Booking, ServiceType, Package
from .serializers import BookingSerializer, ServiceTypeSerializer, PackageSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class ServiceTypeViewSet(viewsets.ModelViewSet):
    queryset = ServiceType.objects.all()
    serializer_class = ServiceTypeSerializer
    permission_classes = [IsAuthenticated]

class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticated]

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Custom handling of request data
        data = request.data
        
        # Assuming 'service_type' and 'package' are passed as IDs from the frontend
        service_type_id = data.get('service_type')
        package_id = data.get('package')
        
        try:
            service_type = ServiceType.objects.get(id=service_type_id)
            package = Package.objects.get(id=package_id)
        except (ServiceType.DoesNotExist, Package.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Creating the Booking with additional data
        booking = Booking.objects.create(
            name=data.get('name'),
            address=data.get('address'),
            phone_number=data.get('phone_number'),
            service_type=service_type,  # Linking the service type object
            package=package,            # Linking the package object
            total_price=data.get('total_price'),
            appointment_date=data.get('appointment_date'),
            appointment_time=data.get('appointment_time'),
            technician=request.user     # Linking the logged-in technician
        )
        
        serializer = BookingSerializer(booking)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        # Optionally, set any default fields or handle custom logic before saving
        serializer.save(technician=self.request.user)