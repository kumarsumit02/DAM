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
        #user_role = UserRole.objects.all()
        # # define a serializer for userRole
        #serializer = UserRoleSerializer(user_role, many=True)

        #get all user_id
        user_ids = list(set(UserRole.objects.values_list('user_id', flat=True)))
        #get user_id and roles of the user
        user_roles = UserRole.objects.values('user_id', 'role_id')
        #getting all role_id and role_names
        roles = Role.objects.values_list('role_id', 'role_name')

        roles_dict = {}
        for role in range(len(roles)):
            roles_dict.__setitem__(roles[role][0], roles[role][1])

        res = []
        for i in range(len(user_ids)):
            role_id = []
            for user_role in user_roles:
                if user_ids[i] == user_role['user_id']:
                    role_id.append({"role_id":user_role['role_id'], "role_name":roles_dict[user_role['role_id']]})
            res.append({"user_id": user_ids[i], "roles":role_id})
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
        # user_role = self.get_object(pk)
        # serializer = UserRoleSerializer(user_role, many=True)
        # res = []
        # role_arr = []
        # for j in range(len(serializer.data)):
        #     role_name = Role.objects.get(role_id=serializer.data[j]['role_id'])
        #     role_serializer = RoleSerializer(role_name)
        #     role_name = role_serializer.data['role_name']
        #     role_arr.append({"role_id": serializer.data[j]['role_id'], "role_name": role_name})
        # res.append({"user_id": pk, "roles": role_arr})
        # return Response(res)

        user_roles = self.get_object(pk)
        serializer = UserRoleSerializer(user_roles, many=True)

        roles = Role.objects.values_list('role_id', 'role_name')

        roles_dict = {}
        for role in range(len(roles)):
            roles_dict.__setitem__(roles[role][0], roles[role][1])

        user_roles = serializer.data
        roles = []
        for user_role in user_roles:
            roles.append({"role_id":user_role['role_id'], "role_name":roles_dict[user_role['role_id']]})
        res = {"user_id":pk,"roles":roles}    

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
