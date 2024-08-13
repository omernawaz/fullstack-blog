from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    def __str__(self): 
        return self.title
    
class User(AbstractUser):
    followers = models.IntegerField(default=0)
    favourites = models.IntegerField(default=0)
    avatar = models.URLField(default="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gTERsv3nO-4I-R9C00Uor_m_nmxT0sE9Cg&s")
    
    