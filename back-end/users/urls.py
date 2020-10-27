from django.urls import path
from . import views

urlpatterns = [
    path('', views.UserViewSet.get, name="user_list"),
    # path('', views.UserViewSet.as_view(), name="user"),
    path('<int:user_pk>/', views.UserViewSet.get_object, name="user_object")
    # path('<int:user_pk>/', views.UserViewSet.get_object, name="user")
]