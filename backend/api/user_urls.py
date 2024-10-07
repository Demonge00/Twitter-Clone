from django.urls import path
from api import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('user/', views.UserList.as_view(), name='register_user'),
    path('verify_user/<verification_secret>',
         views.VerifyUser, name='verify_user'),
    path('token/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('password/', views.PasswordRecoverList.as_view(), name='recover_password'),
    path('password/<password_secret>',
         views.UpdatePassword, name='update_password'),
]
