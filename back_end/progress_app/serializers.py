from rest_framework import serializers
from .models import ProgressPost
from workout_app.serializers import WorkoutSerializer


class ProgressPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgressPost
        fields = "__all__"
        extra_kwargs = {"date_completed": {"format": "%Y-%m-%d"}}

    # Allows for partial updates
    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
