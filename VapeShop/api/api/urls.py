
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from products.views import ProductViewSet, CategoryViewSet

router = DefaultRouter()
router.register('Categories', CategoryViewSet)
router.register('Products', ProductViewSet)

# The API URLs are now determined automatically by the router.

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include((router.urls, 'Categories'), namespace='Categories')),
    path('api/', include((router.urls, 'Products'), namespace='Products')),
]


for url in router.urls:
    print(url)
