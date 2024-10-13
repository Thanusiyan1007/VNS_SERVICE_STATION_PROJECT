from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from .serializers import CreateUserSerializer
from .models import User

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_status(request):
    """
    API endpoint to retrieve the user's staff status and other basic information.
    """
    user = request.user  # The currently authenticated user
    serializer = CreateUserSerializer(user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    """
    API endpoint to retrieve a list of all users.
    """
    users = User.objects.all()  # Get all users
    serializer = CreateUserSerializer(users, many=True)  # Serialize the user queryset
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user_by_email(request, email):
    """
    API endpoint to delete a user by email.
    """
    try:
        user = User.objects.get(email=email)  # Find the user by email
        user.delete()  # Delete the user
        return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    users = User.objects.all()  # Get all users
    serializer = CreateUserSerializer(users, many=True)  # Serialize the user queryset
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])  # Only admins can create superusers
def create_superuser(request):
    serializer = CreateUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(is_superuser=True)  # Ensure the created user is a superuser
        return Response({"message": "Superuser created successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)