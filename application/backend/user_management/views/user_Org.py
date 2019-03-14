from __future__ import unicode_literals


from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from user_management.models.management_model import UserOrganization, Organization
from user_management.serializers.user_serializer import UserOrgSerializer, OrganizationSerializer


# class to implement user organization


class UserOrgsList(APIView):
    def get(self, request):
        users_org = UserOrganization.objects.all()
        # define a serializer for userOrg

        serializer = UserOrgSerializer(users_org, many=True)
        res = []
        user_id = []

        #record users presents in the table
        for i in range(len(serializer.data)):

            if serializer.data[i]['user_id'] not in user_id:

                user_id.append(serializer.data[i]['user_id'])

        #creataing JSON object which will collectively contains the organization for users
        for i in range(len(user_id)):
            org_arr = []
            for j in range(len(serializer.data)):
                if serializer.data[j]['user_id'] == user_id[i]:
                    org_name = Organization.objects.get(organization_id=serializer.data[j]['organization_id'])
                    org_name = OrganizationSerializer(org_name)
                    org_name = org_name.data['organization_name']
                    org_arr.append({"org_id": serializer.data[j]['organization_id'], "organization_name": org_name})
            res.append({"user_id": user_id[i], "organizations": org_arr})

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
        user_org = self.get_object(pk)
        serializer = UserOrgSerializer(user_org, many=True)

        res = []
        org_arr = []

        for j in range(len(serializer.data)):
            org_name = Organization.objects.get(organization_id=serializer.data[j]['organization_id'])
            org_name = OrganizationSerializer(org_name)
            org_name = org_name .data['organization_name']
            org_arr.append({"organization_id": serializer.data[j]['organization_id'], "organization_name": org_name})

        res.append({"user_id": pk, "organizations": org_arr})

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
