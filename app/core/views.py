from django.http import HttpResponse
from django.shortcuts import render

stats = ['Bob', 'Tick', 'Trick', 'Truck']

def index(request):
    return render(request, "core/index.html", {
		"stats": stats
	})