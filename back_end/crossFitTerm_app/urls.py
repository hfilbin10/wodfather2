from django.urls import path
from .views import TermListView, TermDetailView

urlpatterns = [
    path("terms/", TermListView.as_view(), name="term-list"),
    path("terms/<int:id>/", TermDetailView.as_view(), name="term-detail"),
]
