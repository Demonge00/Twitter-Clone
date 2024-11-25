from django.urls import path, re_path
from api import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    re_path('user/(?P<userNameId>\S+)?/?$',
            views.UserList.as_view(), name='register_user'),
    path('verify_user/<verification_secret>',
         views.VerifyUser, name='verify_user'),
    path('token/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    re_path('password/(?P<password_secret>\S+)?/?$',
            views.PasswordRecoverList.as_view(), name='recover_password'),
    path('follow/', views.FollowList.as_view(), name='follow_management')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
