
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter

from products.views import ProductViewSet
from orders.views import OrderViewSet

router = DefaultRouter()
router.register('Products', ProductViewSet)
router.register('Orders', OrderViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include((router.urls, 'Products'), namespace='Products')),
    path('api/', include((router.urls, 'Orders'), namespace='Orders')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
