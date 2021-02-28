
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings
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
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

for url in router.urls:
    print(url)
