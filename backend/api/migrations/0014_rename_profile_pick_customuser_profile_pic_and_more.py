# Generated by Django 5.1.1 on 2024-12-25 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0013_rename_background_pick_customuser_background_pic_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="publication",
            old_name="publication_pick",
            new_name="publication_pic",
        ),
        migrations.AlterField(
            model_name="customuser",
            name="is_active",
            field=models.BooleanField(default=False),
        ),
    ]
