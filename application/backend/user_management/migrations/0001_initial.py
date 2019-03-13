# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-03-13 05:56
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('organization_id', models.AutoField(primary_key=True, serialize=False)),
                ('organization_name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('role_id', models.AutoField(primary_key=True, serialize=False)),
                ('role_name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='UserOrganization',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('organization_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_management.Organization')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserRole',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_management.Role')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='userrole',
            unique_together=set([('user_id', 'role_id')]),
        ),
        migrations.AlterUniqueTogether(
            name='userorganization',
            unique_together=set([('organization_id', 'user_id')]),
        ),
    ]
