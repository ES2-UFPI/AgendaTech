# Generated by Django 5.1.3 on 2024-12-03 04:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agenda', '0005_remove_evento_palestrantes_alter_evento_data_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='evento',
            name='local',
            field=models.CharField(default='Local não informado', max_length=255),
        ),
    ]