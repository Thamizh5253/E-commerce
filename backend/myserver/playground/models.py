from django.db import models

# Create your models here.

class Student(models.Model):
    name = models.CharField(max_length=200)
    # price = models.FloatField()
    des = models.TextField()
    # image = models.ImageField(upload_to='products/', null=True, blank=True)

    def __str__(self):
        return self.name