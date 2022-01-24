from django.test import TestCase

from ..models import Category, Collection, Product, Variant, Instance, Image


class ProductTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name='category')
        self.collection = Collection.objects.create(name='collection')
        self.default_params = {
            'category': self.category,
            'collection': self.collection,
            'price': 10.99
        }
        Product.objects.create(**self.default_params)

    def test_product_is_created(self):
        products_count = Product.objects.count()
        self.assertEqual(products_count, 1)

    def test_product_name_defaults_to_collection_name(self):
        collection = Collection.objects.first()
        product = Product.objects.get(collection=collection)
        self.assertEqual(product.name, collection.name)

    def test_product_has_default_variant(self):
        product = Product.objects.first()
        variants_count = Variant.objects.filter(product=product).count()
        self.assertEqual(variants_count, 1)

        variant = Variant.objects.get(product=product)
        self.assertEqual(variant.is_default, True)

        default_name = Variant._meta.get_field('name').get_default()
        self.assertEqual(variant.name, default_name)

    def test_product_has_custom_variant(self):
        variant_name = 'product custom variant'
        product = Product.objects.create(**self.default_params, variant=variant_name)
        variant = Variant.objects.get(product=product)
        self.assertEqual(variant_name, variant.name)

    def test_product_has_image(self):
        product = Product.objects.first()
        variant = Variant.objects.get(product=product)
        images_count = Image.objects.filter(variant=variant).count()
        self.assertEqual(images_count, 1)

        image = Image.objects.get(variant=variant)
        self.assertNotEqual(image.image, None)
        self.assertEqual(image.ordering, 1)

    def test_product_has_one_instance(self):
        product = Product.objects.first()
        variant = Variant.objects.get(product=product)
        instances_count = Instance.objects.count()
        self.assertEqual(instances_count, 1)
        instance = Instance.objects.get(variant=variant)
        self.assertEqual(instance.size, str(Instance.NA))

    def test_product_has_many_instances(self):
        product = Product.objects.create(**self.default_params, sized=True)
        variant = Variant.objects.get(product=product)
        instances = Instance.objects.filter(variant=variant)
        self.assertEqual(instances.count(), len(Instance.SIZES))

        instance_types = set(instance.size for instance in instances)
        all_instance_types = set(str(instance) for instance in Instance.SIZES)
        self.assertEqual(instance_types, all_instance_types)
