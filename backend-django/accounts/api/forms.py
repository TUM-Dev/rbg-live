from django import forms
from django.contrib.auth.models import User
from django.core.validators import validate_email

from ..models import UserProfile


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField()

    def clean(self):
        cleaned_data = super().clean()
        if not User.objects.filter(username=cleaned_data['username']).count() == 0:
            if User.objects.get(username=cleaned_data['username']).check_password(cleaned_data['password']):
                return cleaned_data
        raise forms.ValidationError("Wrong username or password")


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name',
                  'last_name', 'password']