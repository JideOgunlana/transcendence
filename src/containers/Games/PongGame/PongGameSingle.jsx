import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import Paddle from './Paddle';
import Ball from './Ball';
import AIPlayer from './AIPlayer';
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

    const scores = {
      opponent: 0,
      player: 0,
    };

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
    

    const scene = new THREE.Scene();
    const gameField = new THREE.Vector3(20, 0, 20)
    new Light(scene, LightTypes.Directional, 10, 0xffffff, true,new THREE.Vector3(10, 20, 0), 1, 1)
    new Light(scene, LightTypes.Directional, 10, 0xffffff, true,new THREE.Vector3(-10, 20, 0), 1, 1)
    new Light(scene, LightTypes.Directional, 10, 0xffffff, true,new THREE.Vector3(0, 20, -10), 1, 1)

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 20, -20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    new Ground(scene, 0xf1ebff, gameField);
   

    
    const playerPaddle = new Paddle(scene, 9.5, 0.5, 0, 1, 1, 4, 0xe4d6ff, "left", false);
    const pcPaddle = new Paddle(scene, -9.5, 0.5, 0, 1, 1, 4, 0xe4d6ff, "right", true);
    const ball = new Ball(scene, 0.2, 50, 50, 0xffffff, new THREE.Vector3(0, 0.2, 0), 0.1, new THREE.Vector3(1, 0, 2).normalize(), playerPaddle, pcPaddle, gameField);

  
    new Wall(scene, 10.5, 0.5, 0, 1, 1, 20, 0x8674aa)
    new Wall(scene, 0, 0.5, 10.5, 22, 1, 1, 0x8674aa)
    new Wall(scene, -10.5, 0.5, 0, 1, 1, 20, 0x8674aa)
    new Wall(scene, 0, 0.5, -10.5, 22, 1, 1, 0x8674aa)


    let aiScoreMesh, playerScoreMesh, loadedFont, playerNameMesh, aiNameMesh;

    const scoreMaterial = new THREE.MeshStandardMaterial({
      color: 0x8674aa,
    });

    const nameMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
    });


    const fontLoader = new FontLoader();
    fontLoader.load(srcFont, function (font) {
      loadedFont = font;

      const scoreGeometry = new TextGeometry('0', {
        font: font,
        ...defaults.TEXT_PARAMS,
      });

      scoreGeometry.center();

      aiScoreMesh = new THREE.Mesh(scoreGeometry, scoreMaterial);
      aiScoreMesh.scale.setScalar(1.5);
      aiScoreMesh.position.set(-gameField.x - 4, -1, 3);
      aiScoreMesh.rotation.set(0, Math.PI, 0);
      
      playerScoreMesh = aiScoreMesh.clone();
      playerScoreMesh.position.set(gameField.x + 4, -1, 3);
      playerScoreMesh.rotation.set(0, Math.PI, 0);
      playerScoreMesh.scale.setScalar(1.5);

      scene.add(aiScoreMesh, playerScoreMesh);

      const playerNameGeometry = new TextGeometry(selectedPlayers[0].username, {
        font: font,
        ...defaults.TEXT_PARAMS,
      });

      playerNameGeometry.center();
      playerNameMesh = new THREE.Mesh(playerNameGeometry, nameMaterial);
      playerNameMesh.position.set(gameField.x + 4, 5, 3);
      playerNameMesh.rotation.set(0, Math.PI, 0);

      scene.add(playerNameMesh);

      // AI Name Mesh
      const aiNameGeometry = new TextGeometry('AI', {
        font: font,
        ...defaults.TEXT_PARAMS,
      });

      aiNameGeometry.center();
      aiNameMesh = new THREE.Mesh(aiNameGeometry, nameMaterial);
      aiNameMesh.position.set(-gameField.x - 4, 5, 3);
      aiNameMesh.rotation.set(0, Math.PI, 0);
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

    ball.addEventListener('onscore', (e) => {
      scores[e.message] += 1;

      const geometry = getScoreGeometry(scores[e.message]);

      const mesh = e.message === 'opponent' ? aiScoreMesh : playerScoreMesh;

      mesh.geometry = geometry;

      //mesh.geometry.getAttribute('position').needsUpdate = true;

      if (scores[e.message] >= defaults.PONG_WIN_POINT) {
        setWinner(e.message === 'opponent' ? 'AI' : `${ selectedPlayers[0].username }`);
        setGameOver(true);
      }
    });



    //const clock = new THREE.Clock();

    const ai = new AIPlayer(pcPaddle, ball, gameField);
    let moveUp = false;
    let moveDown = false;

    const animate = () => {
      if (gameOver) return;

      if (gameToStart) {
        ball.update();
        ai.HandleMovement()
        pcPaddle.updateAI()
      }

      if (moveUp) {
        playerPaddle.moveUp()
        playerPaddle.update()
      } else if (moveDown) {
        playerPaddle.moveDown()
        playerPaddle.update()
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
    
    function predictionHandler(e) {
      pcPaddle.SetPredictionPoint(e.detail.point)
    }
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    window.addEventListener("AIPrediction", predictionHandler, false);

    return () => {
      cancelAnimationFrame(requestRef.current);
      renderer.dispose();
      scene.traverse((object) => {
        if (!object.isMesh) return;
        object.geometry.dispose();
        if (object.material.isMaterial) {
          cleanMaterial(object.material);
        } else {
          console.log("material is an iterable, PLEASE CHECK IT DAMN YOU")
          /*for (const material of object.material) {
            cleanMaterial(material);
          } */
        }
      });
      function cleanMaterial(material) {
        material.dispose();
        //for (const key of material) console.log("of key: ", key);
        /* for (const key in material) {
          if (material[key] && typeof material[key].dispose === 'function') {
            console.log(" its a function")
            material[key].dispose();
          } else if (material[key] && typeof material[key].dispose !== 'function') {
            console.log(" its not a function")
          }
        } */
      }
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      ball.removeEventListener('onscore');
      window.removeEventListener("AIPrediction", predictionHandler);

      const custModalElem = document.querySelector('.customModal');
      if (custModalElem) {
        custModalElem.remove();
      }

    };
  }, [gameOver, gameToStart]);

  return (
    <div ref={sceneRef}>
      <PongGameOverModal show={gameOver} winner={winner} />
    </div>
  );
};

export default PongGameSingle;
