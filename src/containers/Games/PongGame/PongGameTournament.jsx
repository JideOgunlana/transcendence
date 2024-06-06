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
import { generatePairs } from '../../../utils/gameHelper';
import { useTranslation } from 'react-i18next';



const PongGameTournament = ({ theme, selectedPlayers }) => {

  const { t } = useTranslation();
  const sceneRef = useRef(null);
  const requestRef = useRef(null);
  const params = {
    planeColor: 0x5A5A5A,
    paddleColor: 0xF59E0B,
    nameColor: 0xFFFFFF,
    opponentPaddleColor: 0x3E3ECA,
    ballColor: 0xDCC0FF,
  };
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [gameRound, setGameRound] = useState(1);
  const [semiOneWinner, setSemiOneWinner] = useState(null);
  const [pairs, setPairs] = useState([]);


  useEffect(() => {
    setPairs(generatePairs(selectedPlayers));
}, [selectedPlayers]);

useEffect(() => {
  if (winner != '') {
      if (gameRound === 1) {
          handleSemifinalOneEnd();
      } else if (gameRound === 2) {
          handleSemifinalTwoEnd();
      }
  }
}, [winner]);

function findObjectByAlias(arr, alias) {
  return arr.find(obj => obj.alias === alias);
}

  const handleSemifinalOneEnd = () => {
      setSemiOneWinner(findObjectByAlias(pairs[0], winner));
      setGameRound(2);
      setPairs([ pairs[1] ]);
      setGameOver(false);
      alert(`${ t('round') } 1 ${ t('winner') } ${ winner }`);

  }

  const handleSemifinalTwoEnd = () => {
    setPairs([[semiOneWinner, findObjectByAlias(pairs[0], winner)]]);
    setGameRound(3);  
    setGameOver(false)
    alert(`${ t('round') } 2 ${ t('winner') } ${ winner }`);
  }


  useEffect(() => {
    if (gameOver) return; // Skip effect when game is over
    if (pairs.length === 0) return ;
    if (gameRound === 1) {
      alert(`${ t('starting round') } 1\n${ pairs[0][0].alias } vs ${ pairs[0][1].alias }`);
    }
    else if (gameRound === 2) {
      alert(`${ t('starting round') } 2\n${ pairs[0][0].alias } vs ${ pairs[0][1].alias }`);
    }
    else if (gameRound === 3) {
      alert(`${ t('starting final round') }\n${ pairs[0][0].alias } vs ${ pairs[0][1].alias }`)
    }

    const score = {
      player: 0,
      opponent: 0,
    };

    let opponentScoreMesh, playerScoreMesh, loadedFont, playerNameMesh, opponentNameMesh;


    const TEXT_PARAMS = {
      size: 2.5,
      height: 0.5,
      curveSegments: 12,
    };


    const scoreMaterial = new THREE.MeshStandardMaterial({
      color: params.ballColor,
    });

    const nameMaterial = new THREE.MeshStandardMaterial({
      color: params.nameColor,
    });


    const fontLoader = new FontLoader();
    fontLoader.load(srcFont, function (font) {
      loadedFont = font;
      const geometry = new TextGeometry('0', {
        font: font,
        ...TEXT_PARAMS,
      });

      geometry.center();

      opponentScoreMesh = new THREE.Mesh(geometry, scoreMaterial);
      playerScoreMesh = opponentScoreMesh.clone();
      opponentScoreMesh.position.set(0, 2, -boundaries.y - 4);
      playerScoreMesh.position.set(0, 2, boundaries.y + 4);

      opponentScoreMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise
      playerScoreMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise


      scene.add(opponentScoreMesh, playerScoreMesh);



      // Player Name Mesh
      console.log(pairs);
      const playerNameGeometry = new TextGeometry(pairs[0][0].alias, {
        font: font,
        ...TEXT_PARAMS,
      });

      playerNameGeometry.center();
      playerNameMesh = new THREE.Mesh(playerNameGeometry, nameMaterial);
      playerNameMesh.position.set(0, 7, boundaries.y + 8);
      playerNameMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise

      scene.add(playerNameMesh);

      // Opponent Name Mesh
      const opponentNameGeometry = new TextGeometry(pairs[0][1].alias, {
        font: font,
        ...TEXT_PARAMS,
      });

      opponentNameGeometry.center();
      opponentNameMesh = new THREE.Mesh(opponentNameGeometry, nameMaterial);
      opponentNameMesh.position.set(0, 7, -boundaries.y - 8);
      opponentNameMesh.rotation.set(0, Math.PI / 2, 0); // Rotate by 90 degrees anti-clockwise
      scene.add(opponentNameMesh);
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
    scene.add(...lights);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(40, 35, 0);
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
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true; // Optional: Enable smooth camera movement

    const boundaries = new THREE.Vector2(18, 23);
    const planeGeometry = new THREE.PlaneGeometry(
      boundaries.x * 5,
      boundaries.y * 5,
      boundaries.x * 5,
      boundaries.y * 5
    );
    planeGeometry.rotateX(-Math.PI * 0.5);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: params.planeColor,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -1.5;
    scene.add(plane);

    const boundGeometry = new RoundedBoxGeometry(1, 2, boundaries.y * 2, 5, 0.5);
    const leftBoundMaterial = new THREE.MeshStandardMaterial({ color: params.paddleColor });
    const leftBound = new THREE.Mesh(boundGeometry, leftBoundMaterial);
    leftBound.position.x = -boundaries.x - 0.5;

    const rightBoundMaterial = new THREE.MeshStandardMaterial({ color: params.opponentPaddleColor });
    const rightBound = new THREE.Mesh(boundGeometry, rightBoundMaterial);
    rightBound.position.x = boundaries.x + 0.5;


    scene.add(leftBound, rightBound);

    const playerPaddle = new Paddle(scene, boundaries, new THREE.Vector3(0, 0, 15), params.paddleColor);
    const opponentPaddle = new Paddle(scene, boundaries, new THREE.Vector3(0, 0, -15), params.opponentPaddleColor);
    const ball = new Ball(scene, boundaries, [playerPaddle, opponentPaddle]);
    ball.material.color.set(params.ballColor);

    ball.addEventListener('ongoal', (e) => {
      score[e.message] += 1;

      const geometry = getScoreGeometry(score[e.message]);

      const mesh = e.message === 'opponent' ? opponentScoreMesh : playerScoreMesh;

      mesh.geometry = geometry;

      mesh.geometry.getAttribute('position').needsUpdate = true;

      if (score[e.message] >= 5) {
        setWinner(e.message === 'opponent' ? `${ pairs[0][1].alias }` : `${ pairs[0][0].alias }`);
        setGameOver(true);
        if (gameRound != 3) {
          score['opponent'] = 0;
        }
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
        opponentPaddle.setX(opponentPaddle.mesh.position.x - 1);
      } else if (moveOpponentRight) {
        opponentPaddle.setX(opponentPaddle.mesh.position.x + 1);
      }

      // orbitControls.update();
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
  }, [gameOver, pairs]);


  return (
    <div ref={sceneRef}>
      {
        gameRound === 3 &&
        <PongGameOverModal show={gameOver} winner={winner} />
      }
    </div>
  );
};

export default PongGameTournament;
