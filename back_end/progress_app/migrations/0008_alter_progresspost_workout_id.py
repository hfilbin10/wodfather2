# Generated by Django 5.0 on 2023-12-15 22:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('progress_app', '0007_remove_progresspost_workout_id_and_more'),
        ('workout_app', '0003_remove_workout_exercises_workout_crossfit_terms_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='progresspost',
            name='workout_id',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='progress_posts', to='workout_app.workout'),
        ),
    ]
