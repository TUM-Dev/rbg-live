from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

class Lecture(models.Model):
    name = models.TextField()
    semester = models.TextField()
    teacher = models.TextField()
    lecture_type = models.TextField()

class Stream(models.Model):
    lecture = models.ForeignKey(Lecture, null=True, on_delete=models.CASCADE)
    name = models.TextField()
    time = models.DateTimeField()
    room = models.TextField()

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    socket = models.TextField(null=True)
    lectures = models.ManyToManyField(Lecture)

class Message(models.Model):
    content = models.TextField(null=True)
    user = models.ForeignKey(UserProfile, null=True, on_delete=models.CASCADE)
    stream = models.ForeignKey(Stream, null=True, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now=True)

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile, created = UserProfile.objects.get_or_create(user=instance)


post_save.connect(create_user_profile, sender=User)
