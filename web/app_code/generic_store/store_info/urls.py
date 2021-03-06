from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import LocationViewSet, ContactInfoViewSet, StoreHourViewSet, StoreNameViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'location', LocationViewSet)
router.register(r'contact_info', ContactInfoViewSet)
router.register(r'store_hour', StoreHourViewSet)
router.register(r'store_name', StoreNameViewSet)

urlpatterns = [
	url(r'^', include(router.urls)),
]