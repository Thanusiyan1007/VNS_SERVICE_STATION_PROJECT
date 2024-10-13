from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from django.contrib.auth.hashers import make_password


User = get_user_model()


class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'password', 'is_staff', 'is_superuser']

        
