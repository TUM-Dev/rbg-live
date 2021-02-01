from rest_framework import serializers

from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from .models import UserProfile, Lecture, Stream, Message


class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ["name", "semester", "lecture_type", "teacher"]

class StreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stream
        fields = ["name", "time", "room"]

class StreamReadSerializer(serializers.ModelSerializer):
    lecture = LectureSerializer(read_only=True)
    class Meta:
        model = Stream
        fields = ["name", "time", "room", "lecture"]

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["content"]

class UserProfileSerializer(serializers.ModelSerializer):
    lectures = LectureSerializer(read_only=True, many=True)
    username = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['lectures', 'username', 'email', 'first_name', 'last_name']
    
    def get_username(self, obj):
        return obj.user.username
    
    def get_email(self, obj):
        return obj.user.email

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

class MessageReadSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    class Meta:
        model = Message
        fields = ["content", "user", "time"]