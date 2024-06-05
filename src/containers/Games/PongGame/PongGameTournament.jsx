import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import Paddle from './Paddle';
import Ball from './Ball';
import lights from './lights';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import srcFont from 'three/examples/fonts/helvetiker_bold.typeface.json?url';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import PongGameOverModal from './PongGameOverModal';

const PongGameTournament = ({ theme, selectedPlayers }) => {

  const [multiPlayerResults, setMultiPlayerResults] = useState(
    selectedPlayers.map(player => ({
        username: player.username,
        email: player.email,
        pong_single_player: player.pong.singlePlayer,
        pong_multi_player: player.pong.multiPlayer,
        memory_single_player: player.memory.singlePlayer,
        memory_multi_player: player.memory.multiPlayer,
    }))
);
  const [resultUpdated, setResultUpdated] = useState(false);

  const sceneRef = useRef(null);
  const requestRef = useRef(null);
  const params = {
    planeColor: 0xb994ff,
    fogColor: 0xb499ff,
    fogNear: 25,
    fogFar: 150,
    paddleColor: 0xF59E0B,
    pcPaddleColor: 0x3E3ECA,
    ballColor: 0xce47ff,
  };

  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    if (winner != '') {
        setMultiPlayerResults(prevResults =>
            prevResults.map(result => {
                if (result.username === winner) {
                    return {
                        ...result,
                        pong_multi_player: {
                            ...result.pong_multi_player,
                            total: result.pong_multi_player.total + 1,
                            win: result.pong_multi_player.win + 1,
                        },
                    };
                } else {
                    return {
                        ...result,
                        pong_multi_player: {
                            ...result.pong_multi_player,
                            total: result.pong_multi_player.total + 1,
                            loss: result.pong_multi_player.loss + 1,
                        },
                    };
                }
            })
        );
        setResultUpdated(true);
    }
  }, [winner]);

const handleSubmitResults = async () => {
    try {
        const response = await Promise.all(multiPlayerResults.map(result =>
            axios.put(
                `http://localhost:8000/pong/users/${selectedPlayers.find(player => player.username === result.username).id}/`,
                result,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
        ));
        console.log('Response: ', response);

    } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
};

  useEffect(() => {
    if (gameOver && resultUpdated) {
      handleSubmitResults();
    }
  }, [gameOver, resultUpdated]);

  useEffect(() => {
    if (gameOver) return; // Skip effect when game is over

    const score = {
      pc: 0,
      player: 0,
    };

    let pcScoreMesh, playerScoreMesh, loadedFont, playerNameMesh, aiNameMesh;


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

    const nameMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
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
      pcScoreMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise
      playerScoreMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise


      scene.add(pcScoreMesh, playerScoreMesh);



      // Player Name Mesh
      const playerNameGeometry = new TextGeometry(selectedPlayers[0].alias, {
        font: font,
        ...TEXT_PARAMS,
      });

      playerNameGeometry.center();
      playerNameMesh = new THREE.Mesh(playerNameGeometry, nameMaterial);
      playerNameMesh.position.set(0, 7, boundaries.y + 4);
      playerNameMesh.castShadow = true;
      playerNameMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise

      scene.add(playerNameMesh);

      // AI Name Mesh
      const aiNameGeometry = new TextGeometry(selectedPlayers[1].alias, {
        font: font,
        ...TEXT_PARAMS,
      });

      aiNameGeometry.center();
      aiNameMesh = new THREE.Mesh(aiNameGeometry, nameMaterial);
      aiNameMesh.position.set(0, 7, -boundaries.y - 4);
      aiNameMesh.castShadow = true;
      aiNameMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise
      scene.add(aiNameMesh);
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
    controls.enableDamping = true; // Optional: Enable smooth camera movement

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
      score[e.message] += 1;

      const geometry = getScoreGeometry(score[e.message]);

      const mesh = e.message === 'pc' ? pcScoreMesh : playerScoreMesh;

      mesh.geometry = geometry;

      mesh.geometry.getAttribute('position').needsUpdate = true;

      if (score[e.message] >= 5) {
        setWinner(e.message === 'pc' ? `${ selectedPlayers[1].username }` : `${ selectedPlayers[0].username }`);
        setGameOver(true);
      }
    });



    const clock = new THREE.Clock();

    let moveLeft = false;
    let moveRight = false;
    let moveOpponentLeft = false;
    let moveOpponentRight = false;

    const animate = () => {
      if (gameOver) return; // Stop the game loop if game is over

      const deltaTime = clock.getDelta();

      const dt = deltaTime / 10;

      for (let i = 0; i < 15; i++) {
        ball.update(dt);
      }

      if (moveLeft) {
        playerPaddle.setX(playerPaddle.mesh.position.x - 1);
      } else if (moveRight) {
        playerPaddle.setX(playerPaddle.mesh.position.x + 1);
      }
      if (moveOpponentLeft) {
        pcPaddle.setX(pcPaddle.mesh.position.x - 1);
      } else if (moveOpponentRight) {
        pcPaddle.setX(pcPaddle.mesh.position.x + 1);
      }

      controls.update();
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    function keyDownHandler(e) {
      if (e.key === 'w' || e.key === 'W') {
        moveLeft = true;
      } else if (e.key === 's' || e.key === 'S') {
        moveRight = true;
      }

      // Opponent Player movement
      if (e.key === 'ArrowUp') {
        moveOpponentLeft = true;
      } else if (e.key === 'ArrowDown') {
        moveOpponentRight = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key === 'w' || e.key === 'W') {
        moveLeft = false;
      } else if (e.key === 's' || e.key === 'S') {
        moveRight = false;
      }


      // Opponent Player movement
      if (e.key === 'ArrowUp') {
        moveOpponentLeft = false;
      } else if (e.key === 'ArrowDown') {
        moveOpponentRight = false;
      }
    }

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    return () => {
      cancelAnimationFrame(requestRef.current);
      renderer.dispose();
      scene.traverse((object) => {
        if (!object.isMesh) return;
        object.geometry.dispose();
        if (object.material.isMaterial) {
          cleanMaterial(object.material);
        } else {
          for (const material of object.material) cleanMaterial(material);
        }
      });
      function cleanMaterial(material) {
        material.dispose();
        for (const key in material) {
          if (material[key] && typeof material[key].dispose === 'function') {
            material[key].dispose();
          }
        }
      }
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [gameOver]);

  const handleRestart = () => {

  };

  return (
    <div ref={sceneRef}>
      <PongGameOverModal show={gameOver} winner={winner} onRestart={handleRestart} />
    </div>
  );
};

export default PongGameTournament;
