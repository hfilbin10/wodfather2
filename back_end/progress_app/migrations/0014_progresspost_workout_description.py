# Generated by Django 5.0 on 2023-12-16 12:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('progress_app', '0013_alter_progresspost_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='progresspost',
            name='workout_description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
