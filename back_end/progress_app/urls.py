from django.urls import path
from .views import ProgressPostListCreateView, ProgressPostDetailView

urlpatterns = [
    path(
        "progress-posts/",
        ProgressPostListCreateView.as_view(),
        name="progresspost-list-create",
    ),
    path(
        "progress-posts/<int:id>/",
        ProgressPostDetailView.as_view(),
        name="progresspost-detail",
    ),
]
