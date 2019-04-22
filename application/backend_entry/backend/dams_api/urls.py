"""Backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django_saml2_auth.views import welcome
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    url(r'^admin/', admin.site.urls),

    url('', include('folder_api.urls')),
    url('', include('elasticsearch_api.urls')),

    # include saml2_auth app authentication requiered for SSO authentication login urls
    url(r'^saml2_auth/', include('django_saml2_auth.urls'), name='django_saml2_auth'),

    # home url with welcome message
    url(r'^home/', welcome, name='home'),

    # user_management application urls included
    url('user_management/', include('user_management.urls', namespace='user_management')),

    url('asset_management/', include('assetmanagement.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
