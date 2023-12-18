from django.urls import path
from .views import VideoView


urlpatterns = [
    path("<str:exercise>", VideoView.as_view(), name="exercise-video"),
]
