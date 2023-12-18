from django.urls import path
from .views import MapView

urlpatterns = [
    
    path("<str:town>/", MapView.as_view(), name="find-box"),
]

