from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import ProgressPost
from .serializers import ProgressPostSerializer, WorkoutSerializer
from rest_framework.authentication import TokenAuthentication
from workout_app.models import Workout


class ProgressPostListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        user = request.user
        progress_posts = ProgressPost.objects.filter(user_id=user)
        serializer = ProgressPostSerializer(progress_posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        try:
            workout_id = request.data["workout_id"]
            workout = Workout.objects.get(id=workout_id)
            workout_info = workout.description

            date_completed = request.data.pop("date_completed", None)

            data = {
                "workout_id": workout_id,
                "date_completed": date_completed,
                "time_to_complete": request.data.get("time_to_complete", None),
                "reps": request.data.get("reps", None),
                "notes": request.data.get("notes", None),
                "workout_description": request.data.get("workout_description", None),
                "user_id": request.user.id,
            }
            serializer = ProgressPostSerializer(data={**data}, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ProgressPostDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        progress_post = get_object_or_404(ProgressPost, id=id, user_id=request.user)
        serializer = ProgressPostSerializer(progress_post)
        return Response(serializer.data)

    def put(self, request, id):
        progress_post = get_object_or_404(ProgressPost, id=id, user_id=request.user)
        serializer = ProgressPostSerializer(progress_post, data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        progress_post = get_object_or_404(ProgressPost, id=id, user_id=request.user)
        progress_post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
