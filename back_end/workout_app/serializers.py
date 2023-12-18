from rest_framework import serializers
from .models import Workout
from crossFitTerm_app.serializers import CrossFitTermSerializer
from crossFitTerm_app.models import CrossFitTerm


class CrossFitTermSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrossFitTerm
        fields = ["id", "term"]


class WorkoutSerializer(serializers.ModelSerializer):
    crossfit_terms = CrossFitTermSerializer(many=True, read_only=True)

    class Meta:
        model = Workout
        fields = "__all__"
