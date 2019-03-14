from __future__ import unicode_literals
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from user_management.models.management_model import UserRole, Role
from user_management.serializers.user_serializer import UserRoleSerializer, RoleSerializer


# class to implement user organization


class UserRolesList(APIView):

    def get(self, request):
        usersRole = UserRole.objects.all()
        # define a serializer for userRole
        serializer = UserRoleSerializer(usersRole, many=True)

        res = []
        user_id = []

        #record all users id present in users table into user_id
        for i in range(len(serializer.data)):

            if serializer.data[i]['user_id'] not in user_id:

                user_id.append(serializer.data[i]['user_id'])

        for i in range(len(user_id)):
            role_arr = []
            for j in range(len(serializer.data)):
                if serializer.data[j]['user_id'] == user_id[i]:
                    role_name = Role.objects.get(role_id=serializer.data[j]['role_id'])
                    role_serializer = RoleSerializer(role_name)
                    role_name = role_serializer.data['role_name']
                    role_arr.append({"role_id":serializer.data[j]['role_id'], "role_name":role_name})
            res.append({"user_id": user_id[i], "roles": role_arr})

        return Response(res)


class UserRoleDetails(APIView):
    """
        Api to manage user organization data
    """

    def get_object(self, pk):
        try:
            return UserRole.objects.filter(user_id=pk)
        except Exception:
            raise Http404

    def get(self, request, pk, format=None):
        user_role = self.get_object(pk)
        serializer = UserRoleSerializer(user_role, many=True)
        res = []
        role_arr = []
        for j in range(len(serializer.data)):
            role_name = Role.objects.get(role_id=serializer.data[j]['role_id'])
            role_serializer = RoleSerializer(role_name)
            role_name = role_serializer.data['role_name']
            role_arr.append({"role_id": serializer.data[j]['role_id'], "role_name": role_name})
        res.append({"user_id": pk, "roles": role_arr})
        return Response(res)

    def post(self, request, format=None):
        serializer = UserRoleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "record added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user_role = self.get_object(pk)
        user_role.delete()
        return Response({"message": "record deleted"}, status=status.HTTP_204_NO_CONTENT)
