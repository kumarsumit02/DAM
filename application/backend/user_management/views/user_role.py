from __future__ import unicode_literals

from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from user_management.models.management_model import UserRole, Role
from user_management.serializers.user_serializer import UserRoleSerializer


# class to implement user organization

class UserRolesList(APIView):

    def get(self, request):

        # get all user_id
        user_ids = list(set(UserRole.objects.values_list('user_id', flat=True)))
        # get user_id and roles of the user
        user_roles = UserRole.objects.values('user_id', 'role_id')
        # getting all role_id and role_names
        roles = list(Role.objects.values('role_id', 'role_name'))

        # creating a dictionary for key as role_id and value as role_name
        roles_dict = {}
        for role in roles:
            roles_dict[role['role_id']] = role['role_name']

        # creating a result dictionary for user_id and its roles
        res = []
        for i in range(len(user_ids)):
            role_id = []
            for user_role in user_roles:
                if user_ids[i] == user_role['user_id']:
                    role_id.append({"role_id": user_role['role_id'], "role_name": roles_dict[user_role['role_id']]})
            res.append({"user_id": user_ids[i], "roles": role_id})

        # returning result as a dictionary for user_ids and its roles
        return Response(res)


class UserRoleDetails(APIView):
    """
        Api to manage user organization data
    """

    # function definition for getting user_roles from database
    def get_object(self, pk):
        try:
            return UserRole.objects.filter(user_id=pk)
        except Exception:
            raise Http404

    def get(self, request, pk, format=None):

        # getting user_roles from database
        user_roles = self.get_object(pk)
        serializer = UserRoleSerializer(user_roles, many=True)

        # getting all roles
        roles = list(Role.objects.values('role_id', 'role_name'))

        # creating a dictionary for key as role_id and value as role_name
        roles_dict = {}
        for role in roles:
            roles_dict[role['role_id']] = role['role_name']

        # creating a result dictionary for user_id and its roles
        user_roles = serializer.data
        roles = []
        for user_role in user_roles:
            roles.append({"role_id": user_role['role_id'], "role_name": roles_dict[user_role['role_id']]})
        res = {"user_id": pk, "roles": roles}

        # returning result as a dictionary for user_ids and its roles
        return Response(res)

    def post(self, request, format=None):
        # serialize the request data to user_role_serializer
        serializer = UserRoleSerializer(data=request.data)
        # if the input data is valid then only it saves and return back as message and response back HTTP 201
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "record added successfully"}, status=status.HTTP_201_CREATED)
        # return back response as respective error and HTTP status code 400
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        # get the user role
        user_role = self.get_object(pk)
        # delete the user role
        user_role.delete()
        # return message as response and HTTP status code 204
        return Response({"message": "record deleted"}, status=status.HTTP_204_NO_CONTENT)
