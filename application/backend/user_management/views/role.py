from __future__ import unicode_literals

from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from user_management.models.userModel import Role
from user_management.serializers.User_Serializer import RoleSerializer
from django.db import connection
cursor = connection.cursor()


class RoleList(APIView):
    def get(self, request):
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data)


class RoleDetails(APIView):
    """
        Api to manage user organization data
    """

    def get_object(self, pk):
        try:
            return Role.objects.get(role_id=pk)

        except Exception:
            raise Http404

    def get(self, request, pk, format=None):
        role = self.get_object(pk)
        role = RoleSerializer(role)
        return Response(role.data)

    def post(self, request, format=None):
        serializer = RoleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"record added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        role = self.get_object(pk)
        role.delete()
        return Response({"message":"deleted"},status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        role = self.get_object(pk)
        serializer = RoleSerializer(role, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
