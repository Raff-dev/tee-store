import os
from typing import Collection

from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
from ...models import Category, Collection, Product, Size, Variant, Image


class Command(BaseCommand):
    help = "seed database for testing and development."
    MODELS = [Category, Collection, Product, Size, Variant, Image]
    SEED_DATA_PATH = settings.BASE_DIR / 'products/management/seed_data'

    lorem_short = 'Lorem ipsum dolor sit amet'
    lorem_long = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget odio posuere, gravida tortor in, pulvinar quam. Maecenas vitae imperdiet est. Vivamus dui justo, aliquet eu porttitor nec, rutrum ut ipsum. In hac habitasse platea dictumst. Cras scelerisque a lectus sit amet pulvinar. Donec faucibus porttitor convallis.'

    def handle(self, *args, **options):
        self.erase_data()
        self.seed_data()

    def erase_data(self):
        for model in self.MODELS:
            model.objects.all().delete()

    def seed_data(self):
        path = self.SEED_DATA_PATH / 'images'
        for category_name in os.listdir(path):
            category = Category.objects.create(name=category_name)
            for image_name in os.listdir(path/category_name):
                name, variant_name = image_name.split('-')
                image_file = open(path/category_name/image_name, 'rb')

                collection, created = Collection.objects.get_or_create(name=name)

                Product.objects.create(
                    name=collection.name,
                    category=category,
                    collection=collection,
                    price=19.99,
                    title=self.lorem_short,
                    material=self.lorem_short,
                    description=self.lorem_long,
                    variant=variant_name,
                    sized=True,
                    image=File(name=image_name, file=image_file)
                )
