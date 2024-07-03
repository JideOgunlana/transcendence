from django.db import models

class GameStats(models.Model):
    total = models.IntegerField(default=0)
    win = models.IntegerField(default=0)
    loss = models.IntegerField(default=0)

class GameUser(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=False)
    pong_single_player = models.OneToOneField(GameStats, related_name='pong_single_player', on_delete=models.CASCADE, null=True, blank=True)
    pong_multi_player = models.OneToOneField(GameStats, related_name='pong_multi_player', on_delete=models.CASCADE, null=True, blank=True)
    memory_single_player = models.OneToOneField(GameStats, related_name='memory_single_player', on_delete=models.CASCADE, null=True, blank=True)
    memory_multi_player = models.OneToOneField(GameStats, related_name='memory_multi_player', on_delete=models.CASCADE, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.pong_single_player:
            self.pong_single_player = GameStats.objects.create()
        if not self.pong_multi_player:
            self.pong_multi_player = GameStats.objects.create()
        if not self.memory_single_player:
            self.memory_single_player = GameStats.objects.create()
        if not self.memory_multi_player:
            self.memory_multi_player = GameStats.objects.create()
        super().save(*args, **kwargs)
