from rest_framework import generics, permissions
from .models import GameUser
from .serializers import GameUserSerializer, GameUserCreateUpdateSerializer

class FrontendOnlyPermission(permissions.BasePermission):
    """
    Custom permission to only allow access to requests from the frontend application.
    """

    def has_permission(self, request, view):
        return request.META.get('HTTP_X_MY_CUSTOM_HEADER') == 'frontend_secret_token'

class GameUserListCreateView(generics.ListCreateAPIView):
    queryset = GameUser.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return GameUserCreateUpdateSerializer
        return GameUserSerializer

    permission_classes = [FrontendOnlyPermission]  # Apply the custom permission class

class GameUserRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = GameUser.objects.all()
    serializer_class = GameUserCreateUpdateSerializer
    permission_classes = [FrontendOnlyPermission]  # Apply the custom permission class
