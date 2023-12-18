from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from requests_oauthlib import OAuth1
from django.http import JsonResponse
from final_proj.settings import env


class MapView(APIView):
    def get(self, request, town):
        url = "https://api.foursquare.com/v3/places/search"

        params = {"query": "crossfit", "near": f"{town}", "sort": "DISTANCE"}

        headers = {
            "Accept": "application/json",
            "Authorization": env.get("FourSquare_API_Key"),
        }

        response = requests.get(url, params=params, headers=headers)
        data = response.json()

        if response.status_code == 200:
            return JsonResponse(data)
        else:
            return JsonResponse(
                {"error": "Error in Foursquare API request"},
                status=response.status_code,
            )


