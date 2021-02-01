from django.shortcuts import redirect
from django.contrib.auth import login, logout

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from .forms import UserForm, LoginForm
from ..serializers import LectureSerializer, StreamSerializer, StreamReadSerializer, MessageReadSerializer, MessageSerializer
from ..models import Lecture, Stream, UserProfile, Message

import os

#### AUTHENTICATION ####
# login, register, logout


@api_view(['POST'])
def user_login_api_view(request):
    print(request.data)
    form = LoginForm(request.data)
    if form.is_valid():
        login(request, User.objects.get(username=request.data['username']))
        return Response({'message': 'Login successful'}, status=200)
    else:
        return Response({'message': 'Wrong username or password'}, status=400)


@api_view(['POST'])
def user_register_api_view(request):  # WORKS
    request.data["username"] = request.data["email"]
    form = UserForm(request.data)
    print(form.errors)
    if form.is_valid():
        user = form.save()
        # form = UserProfileForm(request.data)
        # print(form.is_valid())
        # if form.is_valid():
        #     profile = form.save(commit=False)
        #     profile.user = user
        #     profile.save()
        #     user.set_password(request.data['password'])
        #     user.save()
        login(request, user)
        return Response({'message': 'User created and logged in'}, status=200)
    return Response({'message': 'Invalid registration data'}, status=400)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def current_user_api_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        return Response({'username': request.user.username}, status=200)
    return Response({}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def socket_set_api_view(request):
    socket = request.data['socketID']
    request.user.userprofile.socket = socket
    request.user.userprofile.save()
    username = request.user.username
    return Response({'message': f'Socket for {username} was set to {socket}'})

#### LECTURES ####
# Search, create, delete

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def search_lecture_api_view(request):
    action = request.GET.get("action")
    if action == "all":
        return Response(LectureSerializer(Lecture.objects.all(), many=True).data, status=200)
    if action == "my":
        return Response(LectureSerializer(request.user.userprofile.lectures.all(), many=True).data, status=200)
    return Response({'message': 'No lectures found'}, status=400)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create_lecture_api_view(request):
    serializer = LectureSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    print(serializer.errors)
    return Response({'message': 'Wrong lecture data provided'}, status=400)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def delete_lecture_api_view(request):
    name = request.data['name']
    Lecture.objects.get(name=request.data['name']).delete()
    return Response({'message': f'Lecture {name} was deleted'}, status=200)


#### STREAMS ####
# Search, create, delete

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def search_stream_api_view(request):
    action = request.GET.get("action")
    if action == "all":
        return Response(StreamReadSerializer(Stream.objects.all(), many=True).data, status=200)
    if action == "lecture":
        return Response(StreamReadSerializer(Stream.objects.filter(lecture__name=request.GET.get('lecture')), many=True).data, status=200)
    if action == "stream":
        return Response(StreamReadSerializer(Stream.objects.filter(name=request.GET.get('stream')), many=True).data, status=200)
    if action == "filter":
        return Response(StreamReadSerializer(Stream.objects.filter(name__icontains=request.GET.get('filter')), many=True).data, status=200)
    return Response({'message': 'No stream found'}, status=400)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create_stream_api_view(request):
    serializer = StreamSerializer(data=request.data)
    if serializer.is_valid():
        stream = serializer.save()
        stream.lecture = Lecture.objects.get(name=request.data['lecture'])
        stream.save()
        return Response(serializer.data, status=200)
    print(serializer.errors)
    return Response({'message': 'Wrong stream data provided'}, status=400)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def delete_stream_api_view(request):
    name = request.data['name']
    Stream.objects.get(name=request.data['name']).delete()
    return Response({'message': f'Stream {name} was deleted'}, status=200)


#### MESSAGES ####
# Search, create

@api_view(['GET'])
def search_message_api_view(request):
    action = request.GET.get("action")
    if action == "stream":
        serializer = MessageReadSerializer(Message.objects.filter(stream__name=request.GET.get("stream")), many=True)
        return Response(serializer.data, status=200)
    return Response({'message': 'No messages found'}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_message_api_view(request):
    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        message = serializer.save()
        message.user = request.user.userprofile
        message.stream = Stream.objects.filter(name=request.data['stream']).first()
        message.save()
        return Response({'message': 'Message created'}, status=200)
    return Response({'message': 'Could not create the message'}, status=400)