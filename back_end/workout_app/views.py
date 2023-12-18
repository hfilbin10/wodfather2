from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Workout
from .serializers import WorkoutSerializer


class WorkoutListView(APIView):
    def get(self, request):
        workouts = Workout.objects.all()
        serializer = WorkoutSerializer(workouts, many=True)
        return Response(serializer.data)


class WorkoutCategoryListView(APIView):
    def get(self, request, category):
        workouts = Workout.objects.filter(category=category)
        serializer = WorkoutSerializer(workouts, many=True)
        return Response(serializer.data)


class RandomWorkoutView(APIView):
    def get(self, request, category):
        workout = Workout.objects.filter(category=category).order_by("?").first()
        if workout:
            serializer = WorkoutSerializer(workout)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "No workout found for that category."},
                status=status.HTTP_404_NOT_FOUND,
            )


