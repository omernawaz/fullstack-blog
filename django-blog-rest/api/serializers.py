from rest_framework import serializers
from . import models

class UserSerializer(serializers.ModelSerializer):
    favourites = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    followers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    following = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = models.User
        fields =['id', 'username', 'password', 'first_name', 'last_name', 'email', 'avatar', 'followers', 'following','favourites', 'posts']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    def update(self,instance, validated_data):
        password = validated_data.pop('password', None)
        
        for attr,value in validated_data.items():
            setattr(instance,attr,value)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    favourited_by = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    

    class Meta:
        model = models.Post
        fields = '__all__'
        
    def create(self, validated_data):
        
        request = self.context['request']
        validated_data['author'] = request.user
        
        instance = super().create(validated_data)
        
        return instance
    