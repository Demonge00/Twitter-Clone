# Generated by Django 5.1.1 on 2025-01-04 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_customuser_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='publication',
            name='publication_pic',
            field=models.URLField(blank=True, null=True),
        ),
    ]