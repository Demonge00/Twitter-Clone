# Generated by Django 5.1.1 on 2025-01-03 05:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_alter_customuser_background_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_pic',
            field=models.URLField(blank=True, null=True),
        ),
    ]
