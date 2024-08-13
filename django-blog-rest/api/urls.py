from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserView.as_view()),
    path('users/new/', views.UserRegister.as_view()),
    path('users/login/', views.UserLogin.as_view()),
    path('users/logout/', views.UserLogout.as_view()),
]
