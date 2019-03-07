# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models.userModel import UserOrganization, UserRole

# Register your models here.
admin.site.register(UserOrganization)
admin.site.register(UserRole)
