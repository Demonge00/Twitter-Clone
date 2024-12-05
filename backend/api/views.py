import datetime
import os
import sys
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.db.utils import IntegrityError
from django.core.mail import send_mail
from django.conf import settings
from api.models import Publication
from django.utils.crypto import get_random_string
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import BasePermission
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from api.serialisers import UserSerializer, PubInformationSerializer

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
        pick = user.profile_pick.url
        token['profile_pick'] = pick
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class Protection(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(status=status.HTTP_200_OK)

# UserManagement


class UserList(APIView):

    permission_classes = [IsAuthenticated | ReadOnly]

    def get(self, request, userNameId=None, format=None):
        followed = None
        try:
            if (request.user.id):
                try:
                    User.objects.get(
                        id=request.user.id).follow.get(name_id=userNameId)
                    followed = True
                except Exception as e:
                    followed = False
            snippets = User.objects.get(name_id=userNameId)
            serializer = UserSerializer(snippets)
            response = serializer.data
            if followed is not None:
                response['followed'] = followed
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Ususario no existe'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        verify_secret = get_random_string(length=32)
        number_id = get_random_string(length=6)
        if 'password' in request.data and 'email' in request.data and 'name' in request.data:
            try:
                print('qweqwe')
                name_id = request.data["name"] + number_id
                user = User.objects.create_user(name=request.data["name"], name_id=name_id, email=request.data["email"], password=request.data['password'], is_active=False,
                                                is_staff=False,
                                                verification_secret=verify_secret)
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

    def put(self, request, format=None):
        flag = False
        user = User.objects.get(id=request.user.id)
        if "name" in request.POST:
            user.name = request.POST.get('name')
            flag = True
        if "name_id" in request.POST:
            user.name_id = request.POST.get('name_id')
            flag = True
        if "location" in request.POST:
            user.location = request.POST.get('location')
            flag = True
        if "link" in request.POST:
            user.link = request.POST.get('link')
            flag = True
        if "bio" in request.POST:
            user.bio = request.POST.get('bio')
            flag = True
        if "bg_image" in request.FILES:
            picture = request.FILES.get('bg_image')
            file_name = picture.name
            file_path = os.path.join(
                settings.MEDIA_ROOT, 'background', user.name_id, file_name)
            if os.path.exists(file_path):
                user.background_pick = file_path
            else:
                user.background_pick = picture
            flag = True
        if "prof_image" in request.FILES:
            picture = request.FILES.get('prof_image')
            file_name = picture.name
            file_path = os.path.join(
                settings.MEDIA_ROOT, 'profile', user.name_id, file_name)
            if os.path.exists(file_path):
                user.profile_pick = file_path
            else:
                user.profile_pick = picture
            flag = True
        if flag:
            user.save()
        access_token = RefreshToken.for_user(user)
        access_token['name'] = user.name
        access_token['name_id'] = user.name_id
        pick = user.profile_pick.url
        access_token['profile_pick'] = pick
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
        except Exception as e:
            return Response({'message': 'Email no existe'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, password_secret=None, format=None):
        try:
            user = User.objects.get(password_secret=password_secret)
            user.password = make_password(request.data['password'])
            user.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Error'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def VerifyUser(request, verification_secret):
    try:
        user = User.objects.get(verification_secret=verification_secret)
        user.is_verificated = True
        user.is_active = True
        user.save()
        return Response({'message': 'user_registered'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'message': 'Unable to verify email'}, status=status.HTTP_400_BAD_REQUEST)


class FollowList(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = User.objects.get(id=request.user.id)
            followed_user = User.objects.get(name_id=request.data['name_id'])
            follow_unfollow = request.data['follow']
            if follow_unfollow is False:
                user.follow.add(followed_user)
                answer = True
            else:
                print('asfasf')
                user.follow.remove(followed_user)
                answer = False
            user.save()

            return Response({'message': 'Relation Created', 'followed': answer}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Unable to relate'}, status=status.HTTP_400_BAD_REQUEST)


class Commenter(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = User.objects.get(id=request.user.id)
            followed_user = User.objects.get(name_id=request.data['name_id'])
            follow_unfollow = request.data['follow']
            if follow_unfollow is False:
                user.follow.add(followed_user)
                answer = True
            else:
                print('asfasf')
                user.follow.remove(followed_user)
                answer = False
            user.save()

            return Response({'message': 'Relation Created', 'followed': answer}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Unable to relate'}, status=status.HTTP_400_BAD_REQUEST)


class Liker(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = User.objects.get(id=request.user.id)
            liked_publication = Publication.objects.get(
                id=request.data['pub_id'])
            liked = request.data['liked']
            if liked is False:
                user.likes.add(liked_publication)
            else:
                print('asfasf')
                user.likes.remove(liked_publication)
            user.save()
            return Response({'message': 'Relation Created', 'is_liked': liked}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Unable to relate'}, status=status.HTTP_400_BAD_REQUEST)


class ReTweeter(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = User.objects.get(id=request.user.id)
            retweeted_publication = Publication.objects.get(
                id=request.data['pub_id'])
            retweeted = request.data['retweeted']
            if retweeted is False:
                user.retweets.add(retweeted_publication)
            else:
                print('asfasf')
                user.retweets.remove(retweeted_publication)
            user.save()

            return Response({'message': 'Relation Created', 'is_retweet': retweeted}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Unable to relate'}, status=status.HTTP_400_BAD_REQUEST)


class Bookmarker(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = User.objects.get(id=request.user.id)
            bookmarked_publication = Publication.objects.get(
                id=request.data['pub_id'])
            bookmarked = request.data['bookmarked']
            if bookmarked is False:
                user.bookmarks.add(bookmarked_publication)
            else:
                print('asfasf')
                user.bookmarks.remove(bookmarked_publication)
            user.save()

            return Response({'message': 'Relation Created', 'is_bookmarked': bookmarked}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Unable to relate'}, status=status.HTTP_400_BAD_REQUEST)


class PostsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pub_id=None):
        if (pub_id):
            try:
                user = User.objects.get(id=request.user.id)
                publication = Publication.objects.get(id=pub_id)
                print('asdas')
                serializer = PubInformationSerializer(
                    publication, context={'owner': user})
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response({'asfasf': 'asdasd'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        if 'text' in request.POST and 'privacity' in request.POST:
            try:

                creator = User.objects.get(id=request.user.id)
                text = request.POST.get('text')
                privacity = request.POST.get('privacity')

                pub = Publication(
                    creator=creator, text=text, is_private=privacity)
                if "bg_image" in request.FILES:
                    picture = request.FILES.get('bg_image')
                    file_name = picture.name
                    file_path = os.path.join(
                        settings.MEDIA_ROOT, 'publication', creator.name_id, file_name)
                    if os.path.exists(file_path):
                        pub.publication_pick = file_path
                    else:
                        pub.publication_pick = picture
                pub.save()
                return Response({'message': 'Publication Created'}, status=status.HTTP_200_OK)
            except:
                return Response({'message': 'Unable to create'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Unable to post'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetTweetsList(request):
    try:
        user = User.objects.get(id=request.user.id)
        publication_list = Publication.objects.filter(
            creator__in=user.follow.all()).order_by('-creation_date')[:20]
        serializer = PubInformationSerializer(
            publication_list, context={'owner': user}, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
