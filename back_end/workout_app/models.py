from django.db import models
from crossFitTerm_app.models import CrossFitTerm


class Workout(models.Model):
    category = models.CharField(max_length=50)
    exercise = models.CharField(max_length=100, null=True)
    description = models.TextField()
    crossfit_terms = models.ManyToManyField(CrossFitTerm, related_name="workouts")

    def __str__(self):
        return f"{self.id} - {self.exercise}"
