from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

@api_view(['GET'])
def getData(request):
    person = {'name': 'Omer', 'age': 22}
    return Response(person)
