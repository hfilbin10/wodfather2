from django.db import models

class CrossFitTerm(models.Model):
    term = models.CharField(max_length=100)
    definition = models.TextField()
    workout = models.BooleanField(default=False)

    def __str__(self):
        return self.term
