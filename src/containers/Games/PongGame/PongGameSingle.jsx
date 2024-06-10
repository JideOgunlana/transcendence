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
import PongGameOverModal from './PongGameOverModal';
import defaults from '../../../utils/defaults';
import { useTranslation } from 'react-i18next';
import Wall from './Wall';
import Light from './Light';
import { LightTypes } from './Enums';
import Ground from './Ground';

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

    

    const scene = new THREE.Scene();
    const gameField = new THREE.Vector3(20, 0, 20)
    new Light(scene, LightTypes.Directional, 10, 0xffffff, true,new THREE.Vector3(10, 20, 0), 1, 1)
    new Light(scene, LightTypes.Directional, 10, 0xffffff, true,new THREE.Vector3(-10, 20, 0), 1, 1)
    new Light(scene, LightTypes.Directional, 10, 0xffffff, true,new THREE.Vector3(0, 20, -10), 1, 1)

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 20, -20);
    //camera.position.set(40, 35, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    //renderer.shadowMap.type = THREE.VSMShadowMap;
    new Ground(scene, 0xf1ebff, gameField);
   

    
    const playerPaddle = new Paddle(scene, 9.5, 0.5, 0, 1, 1, 4, 0xe4d6ff, "left", false);
    const pcPaddle = new Paddle(scene, -9.5, 0.5, 0, 1, 1, 4, 0xe4d6ff, "right", true);
    const ball = new Ball(scene, 0.2, 50, 50, 0xffffff, new THREE.Vector3(0, 0.2, 0), 0.1, new THREE.Vector3(1, 0, 2).normalize(), playerPaddle, pcPaddle, gameField);

  
    new Wall(scene, 10.5, 0.5, 0, 1, 1, 20, 0x8674aa)
    new Wall(scene, 0, 0.5, 10.5, 22, 1, 1, 0x8674aa)
    new Wall(scene, -10.5, 0.5, 0, 1, 1, 20, 0x8674aa)
    new Wall(scene, 0, 0.5, -10.5, 22, 1, 1, 0x8674aa)


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
      pcScoreMesh.position.set(-gameField.x - 4, -1, 3);
      playerScoreMesh.position.set(gameField.x + 4, -1, 3);
      pcScoreMesh.rotation.set(0, Math.PI, 0); // Rotate by 90 degrees anti-clockwise
      playerScoreMesh.rotation.set(0, Math.PI, 0); // Rotate by 90 degrees anti-clockwise

      scene.add(pcScoreMesh, playerScoreMesh);


      // Player Name Mesh
      const playerNameGeometry = new TextGeometry(selectedPlayers[0].username, {
        font: font,
        ...defaults.TEXT_PARAMS,
      });

      playerNameGeometry.center();
      playerNameMesh = new THREE.Mesh(playerNameGeometry, nameMaterial);
      playerNameMesh.position.set(gameField.x + 4, 5, 3);
      playerNameMesh.rotation.set(0, Math.PI, 0); // Rotate by 90 degrees anti-clockwise

      scene.add(playerNameMesh);

      // AI Name Mesh
      const aiNameGeometry = new TextGeometry('AI', {
        font: font,
        ...defaults.TEXT_PARAMS,
      });

      aiNameGeometry.center();
      aiNameMesh = new THREE.Mesh(aiNameGeometry, nameMaterial);
      aiNameMesh.position.set(-gameField.x - 4, 5, 3);
      aiNameMesh.rotation.set(0, Math.PI, 0); // Rotate by 90 degrees anti-clockwise
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



    const clock = new THREE.Clock();

    const ai = new AIPlayer(pcPaddle, ball, gameField);
    let moveUp = false;
    let moveDown = false;

    const animate = () => {
      if (gameOver) return; // Stop the game loop if game is over

      const deltaTime = clock.getDelta();

      const dt = deltaTime / 10;

      if (gameToStart) {
        ball.update();
        ai.HandleMovement()
        pcPaddle.update()
        /* for (let i = 0; i < 15; i++) {
          ball.update(); //(dt)
          //ai.update(dt);
        } */
      }

      if (moveUp) {
        playerPaddle.moveUp()
        playerPaddle.update()
        //playerPaddle.setX(playerPaddle.mesh.position.x - 1);
      } else if (moveDown) {
        playerPaddle.moveDown()
        playerPaddle.update()
        //playerPaddle.setX(playerPaddle.mesh.position.x + 1);
      }

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    //handling key up and down press
    function keyDownHandler(e) {
      if (e.key === 'w' || e.key === 'W') {
        moveUp = true;
      } else if (e.key === 's' || e.key === 'S') {
        moveDown = true;
      }
      if (!gameToStart) {
        if (e.key === 'Enter') {
          setGameToStart(true)
        }
      }
    }
  
    function keyUpHandler(e) {
      if (e.key === 'w' || e.key === 'W') {
        moveUp = false;
      } else if (e.key === 's' || e.key === 'S') {
        moveDown = false;
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

      const custModalElem = document.querySelector('.customModal');
      if (custModalElem) {
        custModalElem.remove();
      }

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
