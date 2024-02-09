from django.shortcuts import render
from . import models

# Create your views here.
def index(request):
    return render(request, "flights/index.html", {
		"flights": models.Flight.objects.all()
	})

def flight(request, flight_id):
    flight = models.Flight.objects.get(pk=flight_id)
    return render(request, "flights/flight.html", {
		"flight":flight
	})