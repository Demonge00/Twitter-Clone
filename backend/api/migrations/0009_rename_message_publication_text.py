# Generated by Django 5.1.1 on 2024-11-29 14:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_publication'),
    ]

    operations = [
        migrations.RenameField(
            model_name='publication',
            old_name='message',
            new_name='text',
        ),
    ]
