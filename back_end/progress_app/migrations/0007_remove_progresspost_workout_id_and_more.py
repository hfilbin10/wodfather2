# Generated by Django 5.0 on 2023-12-15 22:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('progress_app', '0006_remove_progresspost_workout_id_and_more'),
        ('workout_app', '0003_remove_workout_exercises_workout_crossfit_terms_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='progresspost',
            name='workout_id',
        ),
        migrations.AddField(
            model_name='progresspost',
            name='workout_id',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='progress_posts', to='workout_app.workout'),
        ),
    ]
