from django.http import Http404
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed, NotAcceptable;
from rest_framework.permissions import IsAuthenticated, AllowAny


from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Post
from .serializers import UserSerializer, PostSerializer


# Create your views here.

class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, user_id=None, format=None):
        if user_id is None:
            users = User.objects.exclude(id=request.user.id).all()
        else:
            users = User.objects.get(id=user_id)
            
        if users is not None:
            serializer = UserSerializer(users, many=(user_id is None))
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': "No user found"}, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, user_id=None, format=None):
        if user_id is None:
            return Response({'detail': "No user specified"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise Http404
        
        serializer = UserSerializer(user, data=request.data, partial=False)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, user_id=None):
        if user_id is None:
            return Response({'detail': "No user specified"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise Http404
        
        serializer = UserSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
 
class UserRegister(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


class UserLogin(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found!")
            
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect Password")
        
        refresh = RefreshToken.for_user(user)
        response =  Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data,
        })
        
        #Disabling this feature, the api will require headers
        #response.set_cookie(key="access_token", value=response.data['access'], httponly=True)
        #response.set_cookie(key="refresh_token", value=response.data['refresh'], httponly=True)
        
        return response
    
class UserFeed(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        following = user.following.all()
        
        posts = Post.objects.filter(author__in=following)
        serializer = PostSerializer(posts, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserFollow(APIView):
    def post(self, request):
        target_user_id = request.data['user_id']
        target_user = User.objects.get(id=target_user_id)
        requesting_user = request.user
        if request.data['action'] == 'follow':
            target_user.followers.add(requesting_user)
        elif request.data['action'] == 'unfollow':
            target_user.followers.remove(requesting_user)
        else:
            return Response({'detail': "'action' key must be defined as either 'follow' or 'unfollow'"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'detail': f"Succesfully did: {request.data['action']} favourite post"}, status=status.HTTP_200_OK)
        
        
            
class UserLogout(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        response = Response()
        
        #This feature is disabled refer to UserLogin() view
        #response.delete_cookie('access_token')
        #response.delete_cookie('refresh_token')
        
        response.data = {
            'detail': "User logged out successfully",
        }
        return response


class PostView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, post_id=None, user_id=None, format=None):
        if post_id:
            post = get_object_or_404(Post, id=post_id)
            
            if post.is_private and post.author.id != request.user.id and not request.user.is_staff:
                return Response({'detail': "This post has been set as private"}, status=status.HTTP_401_UNAUTHORIZED)
            
            serializer = PostSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)

        posts = Post.objects.all()

        if user_id:
            posts = posts.filter(author__id=user_id)
            
            if request.user.id != user_id and not request.user.is_staff:
                posts = posts.filter(is_private=False)
        else:
            posts = posts.filter(is_private=False)

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    def post(self, request, format=None):
        serializer = PostSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def put(self, request, post_id=None, format=None):
        if post_id is None:
            return Response({'detail': "No post specified"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            raise Http404
        
        serializer = PostSerializer(post, data=request.data, partial=False)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, post_id=None):
        if post_id is None:
            return Response({'detail': "No post specified"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            raise Http404
        
        serializer = PostSerializer(post, data=request.data, partial=True)
        authSerializer = PostSerializer(post)
        
        if not (authSerializer.data['author']['id'] == request.user.id or request.user.is_staff):
            return Response({'detail': "You don't have permission to modify this post"}, status=status.HTTP_401_UNAUTHORIZED)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, post_id=None):
        if post_id is None:
            return Response({'detail': "No post specified"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            raise Http404
        
        authSerializer = PostSerializer(post)
        
        if not (authSerializer.data['author']['id'] == request.user.id or request.user.is_staff):
            return Response({'detail': "You don't have permission to modify this post"}, status=status.HTTP_401_UNAUTHORIZED)
        
        post.delete()
        
        return Response({'detail': "Succesfully Deleted"}, status=status.HTTP_200_OK)
        
        
class PostFavourite(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = request.user
        target_post_id = request.data['post_id']
        target_post = Post.objects.get(id=target_post_id)
        
        if request.data['action'] == 'add':
            user.favourites.add(target_post)
        elif request.data['action'] == 'remove':
            user.favourites.remove(target_post)
        else :
            return Response({'detail': "'action' key must be defined as either 'add' or 'remove'"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'detail': f"Succesfully did: {request.data['action']} favourite post"}, status=status.HTTP_200_OK)       
        
        
        
        
        
        

