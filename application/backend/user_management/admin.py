# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models.userModel import UserOrganization

# Register your models here.
admin.site.register(UserOrganization)
