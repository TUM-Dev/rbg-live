from django.shortcuts import render, redirect
from django.contrib.auth import logout

# Create your views here.


def login_view(request):
    return render(request, "components/auth/login.html")


def logout_view(request):
    logout(request)
    return redirect("/")

def home_view(request):
    return render(request, "components/home.html")

def manage_view(request):
    return render(request, "components/manage/manage.html")
