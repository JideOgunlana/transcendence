from rest_framework import generics
from .models import GameUser
from .serializers import GameUserSerializer, GameUserCreateUpdateSerializer

class GameUserListCreateView(generics.ListCreateAPIView):
    queryset = GameUser.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return GameUserCreateUpdateSerializer
        return GameUserSerializer

class GameUserRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = GameUser.objects.all()
    serializer_class = GameUserCreateUpdateSerializer
