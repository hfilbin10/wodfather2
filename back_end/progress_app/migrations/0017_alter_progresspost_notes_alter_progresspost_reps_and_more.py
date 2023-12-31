# Generated by Django 5.0 on 2023-12-17 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('progress_app', '0016_progresspost_workout_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='progresspost',
            name='notes',
            field=models.TextField(blank=True, default='N/A', null=True),
        ),
        migrations.AlterField(
            model_name='progresspost',
            name='reps',
            field=models.PositiveIntegerField(blank=True, default='N/A', null=True),
        ),
        migrations.AlterField(
            model_name='progresspost',
            name='time_to_complete',
            field=models.DurationField(blank=True, default='N/A', null=True),
        ),
    ]
