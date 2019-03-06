# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse


#import User model using predefined django Authentication model
from django.contrib.auth.models import User
from django.http import Http404
from rest_framework.response import Response
#import UserSerializer to define fields of user
from user_management.serializers_.serializer import UserSerializer
from rest_framework.views import APIView
from rest_framework import status

#create a userlist class to list all users or create a new one if now present
class UserList(APIView):
    """
        List all users, or create a new user
    """
    #function to get all the user from database
    def get(self, request, format=None):
        users = User.objects.all()                       #get all the users from User object
        serializer = UserSerializer(users, many=True)    #define a serializer for user
        return Response(serializer.data)                 #return response using serializer data object



class UserDetail(APIView):
    """
        retrieve, update or delete the user instance
    """
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        user = UserSerializer(user)
        return Response(user.data)

    #function to post the data to database
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)   #create a serializer object to init. the data
        if serializer.is_valid():                        #condition to check for valid serialization data
            serializer.save()                            #save the data if serializer is valid
            return Response(serializer.data, status=status.HTTP_201_CREATED)    #return a Response data with status code 201 as resource is created
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  #return a Response code 400 with errors as a BAD request


    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response({"message":"deleted"},status=status.HTTP_204_NO_CONTENT)


def message(request):
    return HttpResponse("Working fine!")





# Create your views here.
