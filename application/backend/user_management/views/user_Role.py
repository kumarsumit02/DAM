from __future__ import unicode_literals

from rest_framework.views import APIView
from user_management.models import userModel
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status


from user_management.models.userModel import UserRole
from user_management.serializers.User_Serializer import UserRoleSerializer
from django.db import connection
cursor = connection.cursor()

# class to implement user organization


class UserRoleList(APIView):

    def get(self, request):
        usersRole = UserRole.objects.all()
        # define a serializer for userRole
        serializer = UserRoleSerializer(usersRole, many=True)
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
            return Response({"message": "record added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        userRole = self.get_object(pk)
        userRole.delete()
        return Response({"message": "deleted"}, status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        userRole = self.get_object(pk)
        serializer = UserRoleSerializer(userRole, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
