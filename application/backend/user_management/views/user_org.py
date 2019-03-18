from __future__ import unicode_literals


from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from user_management.models.management_model import UserOrganization, Organization
from user_management.serializers.user_serializer import UserOrgSerializer


# class to implement user organization


class UserOrgsList(APIView):
    def get(self, request):

        # get all user_id
        user_ids = list(set(UserOrganization.objects.values_list('user_id', flat=True)))
        # get user_id and roles of the user
        user_orgs = UserOrganization.objects.values('user_id', 'organization_id')
        # getting all role_id and role_names
        orgs = list(Organization.objects.values('organization_id', 'organization_name'))

        orgs_dict = {}
        for org in orgs:
            orgs_dict[org['organization_id']] = org['organization_name']

        res = []
        for i in range(len(user_ids)):
            org_id = []
            for user_org in user_orgs:
                if user_ids[i] == user_org['user_id']:
                    org_id.append({"organization_id": user_org['organization_id'], "organization_name": orgs_dict[user_org['organization_id']]})
            res.append({"organization_id": user_ids[i], "organizations": org_id})
        return Response(res)


class UserOrgDetails(APIView):
    """
        Api to manage user organization data
    """

    def get_object(self, pk):
        try:
            return UserOrganization.objects.filter(user_id=pk)
        except Exception:
            raise Http404

    def get(self, request, pk, format=None):

        user_orgs = self.get_object(pk)
        serializer = UserOrgSerializer(user_orgs, many=True)

        orgs = list(Organization.objects.values('organization_id', 'organization_name'))

        orgs_dict = {}
        for org in orgs:
            orgs_dict[org['organization_id']] = org['organization_name']

        user_orgs = serializer.data
        organizations = []
        for user_org in user_orgs:
            organizations.append({"organization_id": user_org['organization_id'], "organization_name": orgs_dict[user_org['organization_id']]})
        res = {"user_id": pk, "organizations": organizations}

        return Response(res)

    def post(self, request, format=None):
        serializer = UserOrgSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "record added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user_org = self.get_object(pk)
        user_org.delete()
        return Response({"message": "deleted"}, status=status.HTTP_204_NO_CONTENT)
