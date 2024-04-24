import { useEffect } from 'react'

import './App.css'
import * as CANNON from 'cannon-es'
import Player from './Player.js';

import GameManager from './GameManager.js';
import {handleKeyDown, handleKeyUp} from './EventHandelers.js';
import PongScene from './PongScene.js';
import { inGameObjects } from './InGameObjects.js';
import { Constants } from './Constants.js';
import UIManager from './UIManager.js';
import Events from './Events.js';
import Globals from './Globals.js';
import TournamentLogic from './TournamentLogic.js';
import { GameModes } from './Enums.js';


function App() {
  useEffect(() => {
    //const players = []
    const tournamentLogic = new TournamentLogic()
    const uimanager = new UIManager(tournamentLogic)
    //let playerLeft = new Player(inGameObjects.paddleLeft, "user1")
    //let playerRight = new Player(inGameObjects.paddleRight, "user2")
    //let playerNumber = undefined
    
    window.addEventListener('setPlayers', (e) => {
      Globals.currentPlayerLeft.SetPaddle(inGameObjects.paddleLeft)
      Globals.currentPlayerRight.SetPaddle(inGameObjects.paddleRight)
      const game = new PongScene('canvas', Globals.currentPlayerLeft, Globals.currentPlayerRight, tournamentLogic);
      game.initialize();
      GameManager.StartGame(game.animate.bind(game));
      Constants.buttonStart.onclick = () => {
        //playerLeft.ResetScore();
        //playerRight.ResetScore();
        if (Globals.currentGameMode === GameModes.Tournament) {
            tournamentLogic.NextTeam()
        }
        dispatchEvent(Events["reset"])
        inGameObjects.ball.SetDirection(Constants.ballStartDir);
        inGameObjects.ball.SetPosition(Constants.ballStartPosition);
        GameManager.StartGame(game.animate.bind(game));
      }
    }, false)
      
    window.addEventListener('hitLeftWall', (e) => {
      console.log("hitLeftWall")
      Globals.currentPlayerRight.HitWall()
    }, false)
    window.addEventListener('hitRightWall', (e) => {
      Globals.currentPlayerLeft.HitWall()
    }, false)
    window.addEventListener('stopGame', (e) => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      console.log("stopp received");
    }, false)
    
    window.addEventListener('startGame', (e) => {
      window.addEventListener('keydown', handleKeyDown ,false);
      window.addEventListener('keyup',handleKeyUp,false);
      console.log("game starts")
    }, false)


    
  }, []);


  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  )
}

export default App
