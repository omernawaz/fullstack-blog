from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView 

from . import views

urlpatterns = [
    path('users/', views.UserView.as_view()),

    path('users/follow/', views.UserFollow.as_view()),
    path('users/<int:user_id>/', views.UserView.as_view()),
    path('users/<int:user_id>/posts/', views.PostView.as_view()),
    
    path('feed/', views.UserFeed.as_view()),
    
    path('auth/register/', views.UserRegister.as_view()),
    path('auth/login/', views.UserLogin.as_view()),
    path('auth/logout/', views.UserLogout.as_view()),
    path('auth/refresh/', TokenRefreshView.as_view()),
    
    path('posts/', views.PostView.as_view()),
    path('posts/<int:post_id>/', views.PostView.as_view()),
    
    path('posts/favourite/', views.PostFavourite.as_view()),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
