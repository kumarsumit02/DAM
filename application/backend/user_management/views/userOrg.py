from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from user_management.models import userModel
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from user_management.serializers_.serializer import UserOrgSerializer
from django.db import connection
cursor = connection.cursor()
from user_management.models.userModel import UserOrganization

#class to implement user organization
class userOrgList(APIView):

    def get(self, request):
        #usersOrg = userOrganization.objects.all()                       #get all the users from User object
        usersOrg = UserOrganization.objects.all()
        serializer = UserOrgSerializer(usersOrg, many=True)    #define a serializer for user
        return Response(serializer.data)



class userOrgDetails(APIView):
    """
        Api to manage user organization data
    """

    def get_object(self, pk):
        try:
            return UserOrganization.objects.get(username=pk)
        except userModel.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        userOrg = self.get_object(pk)
        userOrg = UserOrgSerializer(userOrg)
        return Response(userOrg.data)

    def post(self, request, format=None):
        serializer = UserOrgSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        userOrg = self.get_object(pk)
        userOrg.delete()
        return Response({"message":"deleted"},status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        userOrg = self.get_object(pk)
        serializer = UserOrgSerializer(userOrg, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


def message(self):
    return HttpResponse("Working fine! - RESTApi for user-organization data")
