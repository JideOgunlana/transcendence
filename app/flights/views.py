from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from . import models

# Create your views here.
def index(request):
    return render(request, "flights/index.html", {
		"flights": models.Flight.objects.all()
	})

def flight(request, flight_id):
    flight = models.Flight.objects.get(pk=flight_id)
    return render(request, "flights/flight.html", {
		"flight":flight,
		"passengers": flight.passenger.all()
	})

def book(request, flight_id):
    if request.method == "POST":
        flight = models.Flight.objects.get(pk=flight_id)
        passenger = models.Passenger.objects.get(pk=int(request.POST["passenger"]))
        passenger.flights.add(flight)
        return HttpResponseRedirect(reverse("flight", args=(flight.id,)))