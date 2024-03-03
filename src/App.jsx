import { useEffect } from 'react'

import SceneInit from './PongScene.js';

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module'
import './App.css'
import Ground from './Ground.js';
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Wall from './Wall.js';
import * as CANNON from 'cannon-es'
import Player from './Player.js';

import GameManager from './GameManager.js';


function App() {
  useEffect(() => {
    const ground = new Ground(0xf1ebff);
    const paddleLeft = new Paddle(9.5, 0.5, 0, 1, 1, 4, 0xe4d6ff, "left"); //0xcda5f3
    const paddleRight = new Paddle(-9.5, 0.5, 0, 1, 1, 4, 0xe4d6ff, "right");
    const playerLeft = new Player(paddleLeft, "user1")
    const playerRight = new Player(paddleRight, "user2")

    const ball = new Ball(0.2, 50, 50, 0xffffff, new THREE.Vector3(-2, 0.2, 0), 0.1, new THREE.Vector3(1, 0, 2).normalize(), paddleLeft, paddleRight);
    const game = new SceneInit('canvas', ground, ball, paddleLeft, paddleRight, playerLeft, playerRight);
    game.initialize();
    
    window.addEventListener('keydown', (event) => {
      let key = event.key
      if (key == "ArrowUp" ) {
        paddleRight.moveUp()
      } else if (key == "ArrowDown" ) {
        paddleRight.moveDown()
      } 
      if (key == "w" ) {
        paddleLeft.moveUp()
      } else if (key == "s" ) {
        paddleLeft.moveDown()
      }
    },false);

  window.addEventListener('keyup',(event) => {
      let key = event.key
      if (key == "ArrowUp" || key == "ArrowDown") {
        paddleRight.resetSpeed()
      } else if (key == "w" || key == "s") {
        paddleLeft.resetSpeed()
      }
/*       switch (key) {
          case "ArrowUp": test.paddle.resetSpeed(); break;
          case "ArrowDown": test.paddle.resetSpeed(); break;
      } */
  
  },false);

  game.animate();
  }, []);


  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  )
}

export default App
