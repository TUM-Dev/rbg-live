from django.urls import path

from .views import (
    login_view,
    logout_view,
    manage_view,
    home_view
)

urlpatterns = [
    path('login/', login_view),
    path('logout/', logout_view),
    path('manage/', manage_view),
    path('', home_view),
]
