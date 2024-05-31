from django.urls import path
from .views import GameUserListCreateView, GameUserRetrieveUpdateView

urlpatterns = [
    path('users/', GameUserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', GameUserRetrieveUpdateView.as_view(), name='user-detail-update'),
]
