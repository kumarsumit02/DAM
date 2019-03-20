import django_saml2_auth.views
from django.conf.urls import url


urlpatterns = [


    url(r'^accounts/logout/$', django_saml2_auth.views.signout),
    # The following line will replace the default admin user logout with the signout page (optional)
    url(r'^admin/logout/$', django_saml2_auth.views.signout),
    # The following line will replace the default user login with SAML2 (optional)
    # If you want to specific the after-login-redirect-URL, use parameter "?next=/the/path/you/want"
    # with this view.
    url(r'^accounts/login/$', django_saml2_auth.views.signin),

    # The following line will replace the admin login with SAML2 (optional)
    # If you want to specific the after-login-redirect-URL, use parameter "?next=/the/path/you/want"
    # with this view.
    url(r'^admin/login/$', django_saml2_auth.views.signin),
    url(r'^acs/$', django_saml2_auth.views.acs),
    url(r'^denied/$', django_saml2_auth.views.denied, name='denied'),

]
