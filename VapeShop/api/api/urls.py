
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings
from products.views import CollectionViewSet, ProductViewSet, CategoryViewSet, CartViewSet

router = DefaultRouter()
router.register('Categories', CategoryViewSet)
router.register('Collections', CollectionViewSet)
router.register('Products', ProductViewSet)
router.register('Cart', CartViewSet)

# The API URLs are now determined automatically by the router.

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include((router.urls, 'Categories'), namespace='Categories')),
    path('api/', include((router.urls, 'Collections'), namespace='Collections')),
    path('api/', include((router.urls, 'Products'), namespace='Products')),
    path('api/', include((router.urls, 'Cart'), namespace='Cart')),
    *static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
]

for url in router.urls:
    print(url)
