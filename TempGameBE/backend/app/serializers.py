from rest_framework import serializers
from .models import GameUser, GameStats

class GameStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameStats
        fields = ['total', 'win', 'loss']

class GameUserSerializer(serializers.ModelSerializer):
    pong = serializers.SerializerMethodField()
    memory = serializers.SerializerMethodField()

    class Meta:
        model = GameUser
        fields = ['id', 'username', 'email', 'pong', 'memory']

    def get_pong(self, obj):
        return {
            'singlePlayer': GameStatsSerializer(obj.pong_single_player).data,
            'multiPlayer': GameStatsSerializer(obj.pong_multi_player).data,
        }

    def get_memory(self, obj):
        return {
            'singlePlayer': GameStatsSerializer(obj.memory_single_player).data,
            'multiPlayer': GameStatsSerializer(obj.memory_multi_player).data,
        }

class GameUserCreateUpdateSerializer(serializers.ModelSerializer):
    pong_single_player = GameStatsSerializer()
    pong_multi_player = GameStatsSerializer()
    memory_single_player = GameStatsSerializer()
    memory_multi_player = GameStatsSerializer()

    class Meta:
        model = GameUser
        fields = ['username', 'email', 'pong_single_player', 'pong_multi_player', 'memory_single_player', 'memory_multi_player']

    def create(self, validated_data):
        pong_single_player_data = validated_data.pop('pong_single_player')
        pong_multi_player_data = validated_data.pop('pong_multi_player')
        memory_single_player_data = validated_data.pop('memory_single_player')
        memory_multi_player_data = validated_data.pop('memory_multi_player')
        
        pong_single_player = GameStats.objects.create(**pong_single_player_data)
        pong_multi_player = GameStats.objects.create(**pong_multi_player_data)
        memory_single_player = GameStats.objects.create(**memory_single_player_data)
        memory_multi_player = GameStats.objects.create(**memory_multi_player_data)

        game_user = GameUser.objects.create(
            pong_single_player=pong_single_player,
            pong_multi_player=pong_multi_player,
            memory_single_player=memory_single_player,
            memory_multi_player=memory_multi_player,
            **validated_data
        )

        return game_user

    def update(self, instance, validated_data):
        pong_single_player_data = validated_data.pop('pong_single_player')
        pong_multi_player_data = validated_data.pop('pong_multi_player')
        memory_single_player_data = validated_data.pop('memory_single_player')
        memory_multi_player_data = validated_data.pop('memory_multi_player')

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        GameStats.objects.filter(id=instance.pong_single_player.id).update(**pong_single_player_data)
        GameStats.objects.filter(id=instance.pong_multi_player.id).update(**pong_multi_player_data)
        GameStats.objects.filter(id=instance.memory_single_player.id).update(**memory_single_player_data)
        GameStats.objects.filter(id=instance.memory_multi_player.id).update(**memory_multi_player_data)

        instance.save()
        return instance
