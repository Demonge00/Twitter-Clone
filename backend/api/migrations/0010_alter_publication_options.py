# Generated by Django 5.1.1 on 2024-12-01 14:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_rename_message_publication_text'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='publication',
            options={'ordering': ['-creation_date']},
        ),
    ]
