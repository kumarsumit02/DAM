# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models.userModel import UserOrganization, UserRole, Role, Organization

# Register your models here.
admin.site.register(UserOrganization)
admin.site.register(UserRole)
admin.site.register(Organization)
admin.site.register(Role)
