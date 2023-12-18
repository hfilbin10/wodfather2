from django.urls import path
from .views import WorkoutListView, WorkoutCategoryListView, RandomWorkoutView

urlpatterns = [
    path("workouts/", WorkoutListView.as_view(), name="workout-list"),
    path(
        "workouts/<str:category>/",
        WorkoutCategoryListView.as_view(),
        name="workout-category",
    ),
    path(
        "workout/random/<str:category>/",
        RandomWorkoutView.as_view(),
        name="random-workout",
    ),
]
