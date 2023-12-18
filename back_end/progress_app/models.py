from django.db import models
from workout_app.models import Workout
from user_app.models import User


class ProgressPost(models.Model):
    workout_id = models.ForeignKey(
        Workout, on_delete=models.CASCADE, blank=True, null=True, related_name="workout_progress_posts"
    )
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="progress_posts"
    )
    workout_description = models.TextField(null=True, blank=True)
    date_completed = models.DateField(null=True, blank=True)
    time_to_complete = models.DurationField(null=True, blank=True)
    reps = models.PositiveIntegerField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        workout_info = f"{self.workout_id.id}- {self.workout_id.exercise}"
        return f"Workout: {workout_info} - Date Completed: {self.date_completed}"
