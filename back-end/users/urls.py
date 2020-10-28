from django.urls import path
from . import views

urlpatterns = [
    path('', views.UserView.as_view(), name="users"),
    # path('test/', views.LoginView.as_view(), name="users_login"),
    path('<int:user_pk>/', views.UserDetailView.as_view(), name="user_object"),
]