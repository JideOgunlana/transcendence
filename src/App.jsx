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
import ScoreBoard from './ScoreBoard.js';

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const gameField = new THREE.Vector3(20, 0, 20)
    const world = undefined;
    /* new CANNON.World({
        gravity: new CANNON.Vec3(0, -9.81, 0)
    }); */
    const scoreBoard = new ScoreBoard(scene);
    const ground = new Ground(scene, world, gameField.x, gameField.z, 0xf1ebff);
    const paddleLeft = new Paddle(scene, 9.5, 0.5, 0, 1, 1, 4, 0xe4d6ff, "left"); //0xcda5f3
    const paddleRight = new Paddle(scene, -9.5, 0.5, 0, 1, 1, 4, 0xe4d6ff, "right");
    const playerLeft = new Player(paddleLeft, "user1")
    const playerRight = new Player(paddleRight, "user2")

    const walls = [
      new Wall(scene, 10.5, 0.5, 0, 1, 1, 20, 0x8674aa),
      new Wall(scene, 0, 0.5, 10.5, 22, 1, 1, 0x8674aa),
      new Wall(scene, -10.5, 0.5, 0, 1, 1, 20, 0x8674aa),
      new Wall(scene, 0, 0.5, -10.5, 22, 1, 1, 0x8674aa),
    ]
    const ball = new Ball(scene, world, 0.2, 50, 50, 0xffffff, new THREE.Vector3(-2, 0.2, 0), 0.1, gameField, new THREE.Vector3(1, 0, 2).normalize(), paddleLeft, paddleRight);
    const test = new SceneInit('canvas', scene, gameField, world, ground, ball, paddleLeft, paddleRight, playerLeft, playerRight, scoreBoard);
    test.initialize();
    
    window.addEventListener('keydown',(event) => {
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

  test.animate();
  }, []);


  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  )
}

export default App
