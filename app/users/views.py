from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from . import models


def index(request):
	return HttpResponse("Hello")

def login_view(request):
	return HttpResponse("Hello")

def logout_view(request):
	return HttpResponse("Hello")