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
    path('follow/', views.FollowList.as_view(), name='follow_management'),
    re_path('post/(?P<pub_id>\d+)?/?$',
            views.PostsView.as_view(), name='posting_management'),
    path('post/list/<list_type>', views.GetTweetsList.as_view(), name='tweet-list'),
    path('post/like', views.Liker.as_view(), name='tweet-like'),
    path('post/retweet', views.ReTweeter.as_view(), name='tweet-retweet'),
    path('post/bookmark', views.Bookmarker.as_view(), name='tweet-bookmarked'),
    path('security/', views.Protection.as_view(), name='posting_management'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
