from django.urls import path
from . import views

urlpatterns = [
    path('/', views.UserView.as_view(), name="users"),
    path('/<int:user_pk>', views.UserDetailView.as_view(), name="user_object"),
]