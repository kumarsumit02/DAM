# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from user_management.models.management_model import UserOrganization, UserRole, Role, Organization


admin.site.register(Organization)
admin.site.register(Role)
admin.site.register(UserOrganization)
admin.site.register(UserRole)
