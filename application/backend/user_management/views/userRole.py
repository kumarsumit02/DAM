from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from user_management.models import userModel
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from user_management.serializers.User_Serializer import UserRoleSerializer
from django.db import connection
cursor = connection.cursor()
from user_management.models.userModel import UserRole

#class to implement user organization
class UserRoleList(APIView):

    def get(self, request):
        #usersOrg = userOrganization.objects.all()             #get all the users from User object
        usersRole = UserRole.objects.all()
        serializer = UserRoleSerializer(usersRole, many=True)    #define a serializer for user
        return Response(serializer.data)


class UserRoleDetails(APIView):
    """
        Api to manage user organization data
    """

    def get_object(self, pk):
        try:
            return UserRole.objects.get(user_id=pk)
        except userModel.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        userRole = self.get_object(pk)
        userRole = UserRoleSerializer(userRole)
        return Response(userRole.data)

    def post(self, request, format=None):
        serializer = UserRoleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"record added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        userRole = self.get_object(pk)
        userRole.delete()
        return Response({"message":"deleted"},status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        userRole = self.get_object(pk)
        serializer = UserRoleSerializer(userRole, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


def message(self):
    return HttpResponse("Working fine! - RESTApi for user-role data")
