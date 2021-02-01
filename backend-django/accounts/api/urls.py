from django.urls import path

from .views import (
    user_login_api_view,
    user_register_api_view,
    create_lecture_api_view,
    delete_lecture_api_view,
    search_lecture_api_view,
    create_stream_api_view,
    delete_stream_api_view,
    search_stream_api_view,
    current_user_api_view,
    create_message_api_view,
    search_message_api_view,
    socket_set_api_view
)

urlpatterns = [
    path('login/', user_login_api_view),
    path('register/', user_register_api_view),
    path('lectures/create/', create_lecture_api_view),
    path('lectures/delete/', delete_lecture_api_view),
    path('lectures/', search_lecture_api_view),
    path('streams/create/', create_stream_api_view),
    path('streams/delete/', delete_stream_api_view),
    path('streams/', search_stream_api_view),
    path('users/current/', current_user_api_view),
    path('messages/create/', create_message_api_view),
    path('messages/', search_message_api_view),
    path('socket/set/', socket_set_api_view)
]
