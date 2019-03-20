from __future__ import unicode_literals


from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from user_management.models.management_model import Organization
from user_management.serializers.user_serializer import OrganizationSerializer


class OrganizationsList(APIView):
    def get(self, request):
        organizations = Organization.objects.all()
        serializer = OrganizationSerializer(organizations, many=True)
        return Response(serializer.data)


class OrganizationDetails(APIView):
    """
        Api to manage user organization data
    """
    def get_object(self, pk):
        try:
            return Organization.objects.get(organization_id=pk)
        except Exception:
            raise Http404

    def get(self, request, pk, format=None):
        org = self.get_object(pk)
        org = OrganizationSerializer(org)
        return Response(org.data)

    def post(self, request, format=None):
        serializer = OrganizationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "record added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        org = self.get_object(pk)
        org.delete()
        return Response({"message": "deleted"}, status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        org = self.get_object(pk)
        serializer = OrganizationSerializer(org, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
