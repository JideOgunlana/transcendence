import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import Paddle from './Paddle';
import Ball from './Ball';
import lights from './lights';
import AIPlayer from './AIPlayer';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import srcFont from 'three/examples/fonts/helvetiker_bold.typeface.json?url';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import PongGameOverModal from './PongGameOverModal';
import defaults from '../../../utils/defaults';
import { useTranslation } from 'react-i18next';


const PongGameSingle = ({ theme, selectedPlayers }) => {

  const { t } = useTranslation();
  const [singlePlayerResult, setSinglePlayerResult] = useState({
    username: selectedPlayers[0].username,
    email: selectedPlayers[0].email,
    pong_single_player: selectedPlayers[0].pong.singlePlayer,
    pong_multi_player: selectedPlayers[0].pong.multiPlayer,
    memory_single_player: selectedPlayers[0].memory.singlePlayer,
    memory_multi_player: selectedPlayers[0].memory.multiPlayer,
  });
  const [resultUpdated, setResultUpdated] = useState(false);

  const sceneRef = useRef(null);
  const requestRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [gameToStart, setGameToStart] = useState(false);

  useEffect(() => {
    if (winner != '') {
      if (winner == 'AI') {
        setSinglePlayerResult(prevResult => ({
          ...prevResult,
          pong_single_player: {
            ...prevResult.pong_single_player,
            total: prevResult.pong_single_player.total + 1,
            loss: prevResult.pong_single_player.loss + 1,
          },
        }));
        setResultUpdated(true);
      }
      else {
        setSinglePlayerResult(prevResult => ({
          ...prevResult,
          pong_single_player: {
            ...prevResult.pong_single_player,
            total: prevResult.pong_single_player.total + 1,
            win: prevResult.pong_single_player.win + 1,
          },
        }));
        setResultUpdated(true);
      }

      console.log(singlePlayerResult);
    }
  }, [winner]);

  const handleSubmitResult = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/pong/users/${selectedPlayers[0].id}/`,
        singlePlayerResult,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

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
      handleSubmitResult();
    }
  }, [gameOver, resultUpdated]);

  useEffect(() => {
    if (gameOver) return; // Skip effect when game is over

    const score = {
      opponent: 0,
      player: 0,
    };

    let pcScoreMesh, playerScoreMesh, loadedFont, playerNameMesh, aiNameMesh;

    const scoreMaterial = new THREE.MeshStandardMaterial({
      color: defaults.PARAMS.ballColor,
    });

    const nameMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });


    const fontLoader = new FontLoader();
    fontLoader.load(srcFont, function (font) {
      loadedFont = font;
      const geometry = new TextGeometry('0', {
        font: font,
        ...defaults.TEXT_PARAMS,
      });

      geometry.center();

      pcScoreMesh = new THREE.Mesh(geometry, scoreMaterial);
      playerScoreMesh = pcScoreMesh.clone();
      pcScoreMesh.scale.setScalar(1.5);
      pcScoreMesh.position.set(0, 2, -boundaries.y - 4);
      playerScoreMesh.position.set(0, 2, boundaries.y + 4);
      pcScoreMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise
      playerScoreMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise

      scene.add(pcScoreMesh, playerScoreMesh);


      // Player Name Mesh
      const playerNameGeometry = new TextGeometry(selectedPlayers[0].username, {
        font: font,
        ...defaults.TEXT_PARAMS,
      });

      playerNameGeometry.center();
      playerNameMesh = new THREE.Mesh(playerNameGeometry, nameMaterial);
      playerNameMesh.position.set(0, 7, boundaries.y + 4);
      playerNameMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise

      scene.add(playerNameMesh);

      // AI Name Mesh
      const aiNameGeometry = new TextGeometry('AI', {
        font: font,
        ...defaults.TEXT_PARAMS,
      });

      aiNameGeometry.center();
      aiNameMesh = new THREE.Mesh(aiNameGeometry, nameMaterial);
      aiNameMesh.position.set(0, 7, -boundaries.y - 4);
      aiNameMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise
      scene.add(aiNameMesh);
    });

    function getScoreGeometry(score) {
      const geometry = new TextGeometry(`${score}`, {
        font: loadedFont,
        ...defaults.TEXT_PARAMS,
      });

      geometry.center();

      return geometry;
    }

    const scene = new THREE.Scene();
    scene.add(...lights);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(40, 35, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Optional: Enable smooth camera movement

    const boundaries = new THREE.Vector2(20, 25);
    const planeGeometry = new THREE.PlaneGeometry(
      boundaries.x * 5,
      boundaries.y * 5,
      boundaries.x * 5,
      boundaries.y * 5
    );
    planeGeometry.rotateX(-Math.PI * 0.5);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: defaults.PARAMS.planeColor,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -1.5;
    plane.receiveShadow = true;
    scene.add(plane);

    const boundGeometry = new RoundedBoxGeometry(1, 2, boundaries.y * 2, 5, 0.5);
    const leftBoundMaterial = new THREE.MeshStandardMaterial({ color: defaults.PARAMS.paddleColor });
    const leftBound = new THREE.Mesh(boundGeometry, leftBoundMaterial);
    leftBound.position.x = -boundaries.x - 0.5;

    const rightBoundMaterial = new THREE.MeshStandardMaterial({ color: defaults.PARAMS.opponentPaddleColor });
    const rightBound = new THREE.Mesh(boundGeometry, rightBoundMaterial);
    rightBound.position.x = boundaries.x + 0.5;

    scene.add(leftBound, rightBound);

    const playerPaddle = new Paddle(scene, boundaries, new THREE.Vector3(0, 0, 20), defaults.PARAMS.paddleColor);
    const pcPaddle = new Paddle(scene, boundaries, new THREE.Vector3(0, 0, -20), defaults.PARAMS.opponentPaddleColor);
    const ball = new Ball(scene, boundaries, [playerPaddle, pcPaddle]);
    ball.material.color.set(defaults.PARAMS.ballColor);

    ball.addEventListener('ongoal', (e) => {
      console.log(e.message)
      score[e.message] += 1;

      const geometry = getScoreGeometry(score[e.message]);

      const mesh = e.message === 'opponent' ? pcScoreMesh : playerScoreMesh;

      mesh.geometry = geometry;

      mesh.geometry.getAttribute('position').needsUpdate = true;

      if (score[e.message] >= defaults.PONG_WIN_POINT) {
        setWinner(e.message === 'opponent' ? 'AI' : `${ selectedPlayers[0].username }`);
        setGameOver(true);
      }
    });

    if (!gameToStart) {
      const rootElem = document.getElementById('root');
      const custModalElem = document.createElement('div');
      const custModalDialogElem = document.createElement('div');
      const custModalContent = document.createElement('div');
      const custModalBody = document.createElement('div');
      const custModalHeader = document.createElement('div');
      const custModalTitle = document.createElement('h5');
      const btn = document.createElement('button');
      const p = document.createElement('p');

      custModalTitle.innerText = `${ selectedPlayers[0].username } x AI`;
      p.innerText = t("press the enter key to start the game");
      btn.innerText = "x";

      custModalElem.className = 'customModal modal fade show d-block';
      custModalDialogElem.className = 'modal-dialog', 'modal-dialog-centered';
      custModalContent.className = 'modal-content';
      custModalBody.className = 'modal-body';
      custModalHeader.className = 'modal-header justify-content-between'
      custModalTitle.className = 'modal-title'
      btn.className = 'btn btn-danger';
      btn.addEventListener('click', function (e) {
        custModalElem.remove();
      });
      
      rootElem.appendChild(custModalElem);
      custModalElem.appendChild(custModalDialogElem);
      custModalDialogElem.appendChild(custModalContent);
      custModalContent.appendChild(custModalHeader);
      custModalContent.appendChild(custModalBody);

      custModalHeader.appendChild(custModalTitle);
      custModalHeader.appendChild(btn);
      custModalBody.appendChild(p);

    }
    else {
      const custModalElem = document.querySelector('.customModal');
      if (custModalElem) {
        custModalElem.remove();
      }
    }


    const clock = new THREE.Clock();

    const controller = new AIPlayer(pcPaddle, ball);
    let moveLeft = false;
    let moveRight = false;

    const animate = () => {
      if (gameOver) return; // Stop the game loop if game is over

      const deltaTime = clock.getDelta();

      const dt = deltaTime / 10;

      if (gameToStart) {
        for (let i = 0; i < 15; i++) {
          ball.update(dt);
          controller.update(dt);
        }
      }

      if (moveLeft) {
        playerPaddle.setX(playerPaddle.mesh.position.x - 1);
      } else if (moveRight) {
        playerPaddle.setX(playerPaddle.mesh.position.x + 1);
      }

      // controls.update();
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
      if (!gameToStart) {
        if (e.key === 'Enter') {
          setGameToStart(true)
        }
      }
    }

    function keyUpHandler(e) {
      if (e.key === 'w' || e.key === 'W') {
        moveLeft = false;
      } else if (e.key === 's' || e.key === 'S') {
        moveRight = false;
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
      ball.removeEventListener('ongoal');
    };
  }, [gameOver, gameToStart]);

  const handleRestart = () => {

  };

  return (
    <div ref={sceneRef}>
      <PongGameOverModal show={gameOver} winner={winner} onRestart={handleRestart} />
    </div>
  );
};

export default PongGameSingle;
