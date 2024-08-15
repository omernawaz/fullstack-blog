from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserView.as_view()),
    path('users/register/', views.UserRegister.as_view()),
    path('users/login/', views.UserLogin.as_view()),
    path('users/logout/', views.UserLogout.as_view()),
    path('users/follow/', views.UserFollow.as_view()),
    path('users/<str:username>/', views.UserView.as_view()),
    
    path('posts/', views.PostView.as_view()),
    path('posts/<int:post_id>/', views.PostView.as_view()),
    path('posts/favourite/', views.PostFavourite.as_view()),
]
