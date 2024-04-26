import * as THREE from 'three'

import Wall from './Wall';
import Paddle from './Paddle';
import { Constants } from './Constants';
import Ball from './Ball';
import Light from './Light';
import { LightTypes } from './Enums';
import Ground from './Ground';

class InGameObjects {
    instantiated = false;
    constructor() {
        if (this.instantiated == false) {
            this.instantiated = true
            
            this.paddleLeft = new Paddle(9.5, 0.5, 0, 1, 1, 4, 0xe4d6ff, "left", "gamemanager");
            this.paddleRight = new Paddle(-9.5, 0.5, 4, 1, 1, 4, 0xe4d6ff, "right", "gamemanager");
            this.ground = new Ground(0xf1ebff);
            this.walls =  [
                new Wall(Constants.scene, 10.5, 0.5, 0, 1, 1, 20, 0x8674aa),
                new Wall(Constants.scene, 0, 0.5, 10.5, 22, 1, 1, 0x8674aa),
                new Wall(Constants.scene, -10.5, 0.5, 0, 1, 1, 20, 0x8674aa),
                new Wall(Constants.scene, 0, 0.5, -10.5, 22, 1, 1, 0x8674aa),
            ]
            this.ball = new Ball(0.2, 50, 50, 0xffffff, Constants.ballStartPosition, 0.1, Constants.ballStartDir, this.paddleLeft, this.paddleRight);
            this.light1 = new Light(LightTypes.Directional, 10, 0xffffff, true,new THREE.Vector3(10, 20, 0), 1, 1)
            this.light2 = new Light(LightTypes.Directional, 10, 0xffffff, true,new THREE.Vector3(-10, 20, 0), 1, 1)
        } else {
            throw Error('only one instance can exist');
        }
      }
}

export const IN_GAME_OBJECTS = new InGameObjects()