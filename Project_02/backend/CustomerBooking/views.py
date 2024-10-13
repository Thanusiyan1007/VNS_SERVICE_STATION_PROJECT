from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomerBooking
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomerBookingSerializer
from rest_framework import generics


class CustomerBookingViewSet(viewsets.ModelViewSet):
    queryset = CustomerBooking.objects.all()
    serializer_class = CustomerBookingSerializer
    permission_classes = [IsAuthenticated]

class CustomerBookingStatusUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            booking = CustomerBooking.objects.get(pk=pk)
            status_value = request.data.get('status')
            technician_email = request.user.email  # Assuming the technician's email is available from the request user

            # Validate status
            if status_value not in ['pending', 'accepted', 'rejected']:
                return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

            # If rejected, add the technician to the rejected_technicians list
            if status_value == 'rejected':
                booking.add_rejected_technician(technician_email)

            # Update the status and technician (if accepted)
            booking.status = status_value
            if status_value == 'accepted':
                booking.technician = technician_email

            booking.save()

            return Response({'message': 'Booking status updated successfully'}, status=status.HTTP_200_OK)
        except CustomerBooking.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)

class CustomerBookingTechnicianUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = CustomerBooking.objects.all()
    serializer_class = CustomerBookingSerializer  # You can create a separate serializer if needed

    def patch(self, request, pk):
        try:
            booking = CustomerBooking.objects.get(pk=pk)  # Get the specific booking by ID
            technician_email = request.data.get('technician')  # Get the new technician email from the request

            # Validate the technician email (if necessary)
            if not technician_email:
                return Response({'error': 'Technician email is required'}, status=status.HTTP_400_BAD_REQUEST)

            # Update the technician email
            booking.technician = technician_email
            booking.save()

            return Response({'message': 'Technician email updated successfully'}, status=status.HTTP_200_OK)
        except CustomerBooking.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)