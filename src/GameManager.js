import * as THREE from 'three'

import Wall from './Wall';
import Paddle from './Paddle';

export default class GameManager {
    static scene = new THREE.Scene();
    static gameField = new THREE.Vector3(20, 0, 20)
    static buttonStart = window.document.getElementById("btn-start")
    

    static walls = [
        new Wall(GameManager.scene, 10.5, 0.5, 0, 1, 1, 20, 0x8674aa),
        new Wall(GameManager.scene, 0, 0.5, 10.5, 22, 1, 1, 0x8674aa),
        new Wall(GameManager.scene, -10.5, 0.5, 0, 1, 1, 20, 0x8674aa),
        new Wall(GameManager.scene, 0, 0.5, -10.5, 22, 1, 1, 0x8674aa),
    ]

    static StopGame(animationId)
    {
        this.buttonStart.style.display = "block";
        cancelAnimationFrame(animationId);
    }

    static StartGame(gameLoop)
    {
        this.buttonStart.style.display = "none";
        gameLoop();
    }
}