import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import Paddle from './Paddle';
import Ball from './Ball';
import srcFont from 'three/examples/fonts/helvetiker_bold.typeface.json?url';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import PongGameOverModal from './PongGameOverModal';
import { generatePairs } from '../../../utils/gameHelper';
import { useTranslation } from 'react-i18next';
import defaults from '../../../utils/defaults';
import Wall from './Wall';
import Light from './Light';
import { LightTypes } from './Enums';
import Ground from './Ground';



const PongGameTournament = ({ theme, selectedPlayers }) => {

  const { t } = useTranslation();
  const sceneRef = useRef(null);
  const requestRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [gameRound, setGameRound] = useState(1);
  const [semiOneWinner, setSemiOneWinner] = useState(null);
  const [pairs, setPairs] = useState([]);
  const [gameToStart, setGameToStart] = useState(false);


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
      setGameToStart(false);
      alert(`${ t('round') } 1 ${ t('winner') } ${ winner }`);

  }

  const handleSemifinalTwoEnd = () => {
    setPairs([[semiOneWinner, findObjectByAlias(pairs[0], winner)]]);
    setGameRound(3);
    setGameOver(false);
    setGameToStart(false);
    alert(`${ t('round') } 2 ${ t('winner') } ${ winner }`);
  }


  const announceRound = () => {
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

      custModalTitle.innerText = `${gameRound === 3 ?
        "starting final round"
        : t("starting round") + " " + gameRound}: ${pairs[0][0].alias} x ${pairs[0][1].alias}`;
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
  }

  useEffect(() => {
    if (gameOver) return; // Skip effect when game is over
    if (pairs.length === 0) return ;

    const scores = {
      opponent: 0,
      player: 0,
    };

    if (gameRound === 1) {
      announceRound()
    }
    else if (gameRound === 2) {
      announceRound();
    }
    else if (gameRound === 3) {
      announceRound();
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
    const opponentPaddle = new Paddle(scene, -9.5, 0.5, 0, 1, 1, 4, 0xe4d6ff, "right", true);
    const ball = new Ball(scene, 0.2, 50, 50, 0xffffff, new THREE.Vector3(0, 0.2, 0), 0.1, new THREE.Vector3(1, 0, 2).normalize(), playerPaddle, opponentPaddle, gameField);

  
    new Wall(scene, 10.5, 0.5, 0, 1, 1, 20, 0x8674aa)
    new Wall(scene, 0, 0.5, 10.5, 22, 1, 1, 0x8674aa)
    new Wall(scene, -10.5, 0.5, 0, 1, 1, 20, 0x8674aa)
    new Wall(scene, 0, 0.5, -10.5, 22, 1, 1, 0x8674aa)


    let opponentScoreMesh, playerScoreMesh, loadedFont, playerNameMesh, opponentNameMesh;

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

      opponentScoreMesh = new THREE.Mesh(scoreGeometry, scoreMaterial);
      opponentScoreMesh.scale.setScalar(1.5);
      opponentScoreMesh.position.set(-gameField.x - 4, -1, 3);
      opponentScoreMesh.rotation.set(0, Math.PI, 0);
      
      playerScoreMesh = opponentScoreMesh.clone();
      playerScoreMesh.position.set(gameField.x + 4, -1, 3);
      playerScoreMesh.rotation.set(0, Math.PI, 0);
      playerScoreMesh.scale.setScalar(1.5);

      scene.add(opponentScoreMesh, playerScoreMesh);

      const playerNameGeometry = new TextGeometry(pairs[0][0].alias, {
        font: font,
        ...defaults.TEXT_PARAMS,
      });

      playerNameGeometry.center();
      playerNameMesh = new THREE.Mesh(playerNameGeometry, nameMaterial);
      playerNameMesh.position.set(gameField.x + 4, 5, 3);
      playerNameMesh.rotation.set(0, Math.PI, 0);

      scene.add(playerNameMesh);

      // Opponent Name Mesh
      const opponentNameGeometry = new TextGeometry(pairs[0][1].alias, {
        font: font,
        ...defaults.TEXT_PARAMS,
      });

      opponentNameGeometry.center();
      opponentNameMesh = new THREE.Mesh(opponentNameGeometry, nameMaterial);
      opponentNameMesh.position.set(-gameField.x - 4, 5, 3);
      opponentNameMesh.rotation.set(0, Math.PI, 0);
      scene.add(opponentNameMesh);
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

      const mesh = e.message === 'opponent' ? opponentScoreMesh : playerScoreMesh;

      mesh.geometry = geometry;

      //mesh.geometry.getAttribute('position').needsUpdate = true;

      if (scores[e.message] >= defaults.PONG_WIN_POINT) {
        setWinner(e.message === 'opponent' ? `${ pairs[0][1].alias }` : `${ pairs[0][0].alias }`);
        setGameOver(true);
      }
    });



    //const clock = new THREE.Clock();

    let moveUp = false;
    let moveDown = false;
    let moveOpponentUp = false;
    let moveOpponentDown = false;

    const animate = () => {
      if (gameOver) return;

      if (gameToStart) {
        ball.update();
        if (moveUp) {
          playerPaddle.moveUp()
          playerPaddle.update()
        } else if (moveDown) {
          playerPaddle.moveDown()
          playerPaddle.update()
        }
  
        if (moveOpponentUp) {
          opponentPaddle.moveUp()
          opponentPaddle.update()
        } else if (moveOpponentDown) {
          opponentPaddle.moveDown()
          opponentPaddle.update()
        }
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

      // Opponent Player movement
      if (e.key === 'ArrowUp') {
        moveOpponentUp = true;
      } else if (e.key === 'ArrowDown') {
        moveOpponentDown = true;
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

      // Opponent Player movement
      if (e.key === 'ArrowUp') {
        moveOpponentUp = false;
      } else if (e.key === 'ArrowDown') {
        moveOpponentDown = false;
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

      const custModalElem = document.querySelector('.customModal');
      if (custModalElem) {
        custModalElem.remove();
      }

    };
  }, [gameOver, pairs, gameToStart]);


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
