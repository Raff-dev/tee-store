# Generated by Django 3.1.7 on 2021-03-28 22:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_auto_20210328_2331'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='address',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='order',
            name='city',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='order',
            name='country',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='order',
            name='email',
            field=models.EmailField(blank=True, default='', max_length=254),
        ),
        migrations.AlterField(
            model_name='order',
            name='invoice',
            field=models.FileField(blank=True, default='', upload_to='invoices'),
        ),
        migrations.AlterField(
            model_name='order',
            name='name',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='order',
            name='phone',
            field=models.CharField(blank=True, default='', max_length=15),
        ),
        migrations.AlterField(
            model_name='order',
            name='postal_code',
            field=models.CharField(blank=True, default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='order',
            name='state',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
    ]