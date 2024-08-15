from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey('api.User', on_delete=models.CASCADE, related_name='posts', blank=False)
    is_private = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    def __str__(self): 
        return self.title
    
class User(AbstractUser):
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following',blank=True)
    favourites = models.ManyToManyField(Post, related_name='favourited_by' ,blank=True)
    avatar = models.URLField(default="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gTERsv3nO-4I-R9C00Uor_m_nmxT0sE9Cg&s")
