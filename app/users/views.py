from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from . import models


def index(request):
	if not request.user.is_authenticated:
		return HttpResponseRedirect(reverse("login"))

def login_view(request):
	return render(request, "users/login.html")

def logout_view(request):
	return HttpResponse("Hello")