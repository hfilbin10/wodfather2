# Generated by Django 4.2.7 on 2023-12-06 17:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crossFitTerm_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='crossfitterm',
            name='wodfather_tips',
        ),
    ]
