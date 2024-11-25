# Generated by Django 5.1.1 on 2024-11-22 03:32

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_customuser_followers_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='follow',
            field=models.ManyToManyField(related_name='followed_by', to=settings.AUTH_USER_MODEL),
        ),
    ]
