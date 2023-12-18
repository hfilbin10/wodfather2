from rest_framework import serializers
from .models import CrossFitTerm


class CrossFitTermSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrossFitTerm
        fields = ["id", "term", "definition"]
