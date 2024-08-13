from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated


from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import UserSerializer


# Create your views here.

class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserRegister(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
class UserLogin(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        
        user = User.objects.filter(username=username).first()
        
        if not user:
            raise AuthenticationFailed("User not found!")
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect Password")
        
        refresh = RefreshToken.for_user(user)
        response =  Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data,
        })
        response.set_cookie(key="access_token", value=response.data['access'], httponly=True)
        response.set_cookie(key="refresh_token", value=response.data['refresh'], httponly=True)
        
        return response
    
class UserLogout(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self,request):
        response = Response()
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        response.data = {
            'detail': "User logged out successfully",
        }
        return response
        
        
        
        
        
        
        
        
        
        

