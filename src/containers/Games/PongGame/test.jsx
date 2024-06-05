import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import Paddle from './Paddle';
import Ball from './Ball';
import lights from './lights';
import AIController from './AIPlayer';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import srcFont from 'three/examples/fonts/helvetiker_bold.typeface.json?url';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GameOverModal from './PongGameOverModal';

const PongGameSingle = ({ theme, selectedPlayers }) => {
  const sceneRef = useRef(null);
  const params = {
    planeColor: 0xb994ff,
    fogColor: 0xb499ff,
    fogNear: 25,
    fogFar: 150,
    paddleColor: 0xF59E0B,
    pcPaddleColor: 0x3E3ECA,
    ballColor: 0xce47ff,
  };

  const [score, setScore] = useState({ pc: 0, player: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    let pcScoreMesh, playerScoreMesh, loadedFont;

    const TEXT_PARAMS = {
      size: 3,
      height: 0.5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 5,
    };

    const scoreMaterial = new THREE.MeshStandardMaterial({
      color: params.ballColor,
    });

    const fontLoader = new FontLoader();
    fontLoader.load(srcFont, function (font) {
      loadedFont = font;
      const geometry = new TextGeometry('0', {
        font: font,
        ...TEXT_PARAMS,
      });

      geometry.center();

      pcScoreMesh = new THREE.Mesh(geometry, scoreMaterial);
      playerScoreMesh = pcScoreMesh.clone();
      pcScoreMesh.scale.setScalar(1.5);
      pcScoreMesh.position.set(0, 2, -boundaries.y - 4);
      playerScoreMesh.position.set(0, 2, boundaries.y + 4);

      pcScoreMesh.castShadow = true;
      playerScoreMesh.castShadow = true;

      scene.add(pcScoreMesh, playerScoreMesh);
    });

    function getScoreGeometry(score) {
      const geometry = new TextGeometry(`${score}`, {
        font: loadedFont,
        ...TEXT_PARAMS,
      });

      geometry.center();

      return geometry;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(params.fogColor);
    scene.fog = new THREE.Fog(params.fogColor, params.fogNear, params.fogFar);
    scene.add(...lights);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 20, 45);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer({
      antialias: window.devicePixelRatio < 2,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const boundaries = new THREE.Vector2(18, 23);
    const planeGeometry = new THREE.PlaneGeometry(
      boundaries.x * 20,
      boundaries.y * 20,
      boundaries.x * 20,
      boundaries.y * 20
    );
    planeGeometry.rotateX(-Math.PI * 0.5);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: params.planeColor,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -1.5;
    plane.receiveShadow = true;
    scene.add(plane);

    const boundGeometry = new RoundedBoxGeometry(1, 2, boundaries.y * 2, 5, 0.5);
    const boundMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd });
    const leftBound = new THREE.Mesh(boundGeometry, boundMaterial);
    leftBound.position.x = -boundaries.x - 0.5;
    const rightBound = leftBound.clone();
    rightBound.position.x *= -1;

    leftBound.castShadow = true;
    rightBound.receiveShadow = true;
    rightBound.castShadow = true;

    scene.add(leftBound, rightBound);

    const playerPaddle = new Paddle(scene, boundaries, new THREE.Vector3(0, 0, 15), params.paddleColor);
    const pcPaddle = new Paddle(scene, boundaries, new THREE.Vector3(0, 0, -15), params.pcPaddleColor);
    const ball = new Ball(scene, boundaries, [playerPaddle, pcPaddle]);
    ball.material.color.set(params.ballColor);

    ball.addEventListener('ongoal', (e) => {
      const newScore = { ...score, [e.message]: score[e.message] + 1 };
      setScore(newScore);

      const geometry = getScoreGeometry(newScore[e.message]);
      const mesh = e.message === 'pc' ? pcScoreMesh : playerScoreMesh;
      mesh.geometry = geometry;
      mesh.geometry.getAttribute('position').needsUpdate = true;

      if (newScore.pc >= 5 || newScore.player >= 5) {
        setWinner(newScore.pc >= 5 ? 'PC' : 'Player');
        setGameOver(true);
      }
    });

    const clock = new THREE.Clock();
    const controller = new AIController(pcPaddle, ball);
    let moveLeft = false;
    let moveRight = false;

    const animate = () => {
      if (gameOver) return;

      const deltaTime = clock.getDelta();
      const dt = deltaTime / 10;

      for (let i = 0; i < 15; i++) {
        ball.update(dt);
        controller.update(dt);
      }

      if (moveLeft) {
        playerPaddle.setX(playerPaddle.mesh.position.x - 1);
      } else if (moveRight) {
        playerPaddle.setX(playerPaddle.mesh.position.x + 1);
      }

      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    function keyDownHandler(e) {
      if (e.key === 'a') {
        moveLeft = true;
      } else if (e.key === 'd') {
        moveRight = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key === 'a') {
        moveLeft = false;
      } else if (e.key === 'd') {
        moveRight = false;
      }
    }

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    return () => {
      renderer.dispose();
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, [score, gameOver]);

  const handleRestart = () => {
    setScore({ pc: 0, player: 0 });
    setGameOver(false);
    setWinner('');
  };

  return (
    <div ref={sceneRef}>
      <GameOverModal show={gameOver} winner={winner} onRestart={handleRestart} />
    </div>
  );
};

export default PongGameSingle;
