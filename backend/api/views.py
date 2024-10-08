import sys
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.files.storage import default_storage
from django.db.utils import IntegrityError
from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import BasePermission
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from api.serialisers import UserSerializer

User = get_user_model()


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in ['GET', 'POST']
# Auth JWt


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.name
        token['name_id'] = user.name_id
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# UserManagement


class UserList(APIView):

    permission_classes = [IsAuthenticated | ReadOnly]

    def get(self, request, format=None):
        try:
            snippets = User.objects.get(email=request.data['email'])
            serializer = UserSerializer(snippets)
            print(serializer.data)
            return Response(serializer.data)
        except:
            return Response({'message': 'Ususario no existe'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        verify_secret = get_random_string(length=32)
        number_id = get_random_string(length=6)
        if 'password' in request.data and 'email' in request.data and 'name' in request.data:
            try:
                name_id = request.data["name"] + number_id
                print(name_id)
                user = User.objects.create_user(name=request.data["name"], name_id=name_id, email=request.data["email"], password=request.data['password'], is_active=False,
                                                is_staff=False,
                                                verification_secret=verify_secret,)
            except IntegrityError:
                return Response({'message': 'User alredy registered'}, status=status.HTTP_400_BAD_REQUEST)
            except:
                print(sys.exc_info())
                return Response({'message': 'User could not be registered'}, status=status.HTTP_400_BAD_REQUEST)
            try:
                # send_mail(
                #     f'Verifica tu cuenta de usuario para {
                #         settings.WEB_SITE_NAME}',
                #     f'Para verificar tu cuenta en {
                #         settings.WEB_SITE_NAME}, ve a settings.VERIFICATION_URL}{verify_secret}',
                #     settings.SENDER_EMAIL,
                #     [request.data['email']],
                #     fail_silently=False,
                #     html_message=f'Porfavor ve a <a href="{
                #         settings.VERIFICATION_URL}/{verify_secret}">este email</a> para verificar tu cuenta.',
                # )
                user.sent_verification_email = True
                user.save()
            except:
                print("send mail exceptioin:", sys.exc_info())
                return Response({"message": "Cannot send email"}, status=status.HTTP_400_BAD_REQUEST)
            print(f'Porfavor ve a <a href="{
                settings.VERIFICATION_URL}/{verify_secret}">este link</a> para verificar tu cuenta.')
            return Response({'html': f'Porfavor ve a <a href="{
                settings.VERIFICATION_URL}/{verify_secret}">este link</a> para verificar tu cuenta.'
            }, status=status.HTTP_200_OK)
        return Response({'message': 'Missing info'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        try:
            print(request.user.id)
            user = User.objects.get(id=request.user.id)
            print(user)
            user.delete()
            return (Response(status=status.HTTP_200_OK))
        except:
            return Response({'message': 'Error deleting'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
        flag = False
        user = User.objects.get(id=request.user.id)
        if "name" in request.data:
            user.name = request.data['name']
            flag = True
        if "password" in request.data:
            user.password = make_password(request.data["password"])
            flag = True
        if "name_id" in request.data:
            user.name_id = request.data['name_id']
            flag = True
        if flag:
            print('done')
            user.save()
            print(user)
        access_token = RefreshToken.for_user(user)
        access_token['name'] = user.name
        return Response({'access': str(access_token.access_token),
                        'refresh': str(access_token)}, status=status.HTTP_200_OK)


class PasswordRecoverList(APIView):

    def post(self, request, format=None):
        password_secret = get_random_string(length=32)
        try:
            user = User.objects.get(email=request.data['email'])
            user.password_secret = password_secret
            user.save()
            print(f"Porfavor ve a <a href='http://localhost:5173/recover-password/{
                  password_secret}'>este link</a> para vambiar tu contraseña.")
            return Response({'message': 'Password recuperado'}, status=status.HTTP_200_OK)
        except:
            return Response({'message': 'Email no existe'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def UpdatePassword(request, password_secret):
    try:
        user = User.objects.get(password_secret=password_secret)
        user.password = make_password(request.data['password'])
        user.save()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response({'message': 'Error'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def VerifyUser(request, verification_secret):
    try:
        user = User.objects.get(verification_secret=verification_secret)
        user.is_verificated = True
        user.is_active = True
        user.save()
        return Response({'message': 'user_registered'}, status=status.HTTP_200_OK)
    except:
        return Response({'message': 'Unable to verify email'}, status=status.HTTP_400_BAD_REQUEST)
