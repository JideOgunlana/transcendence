import { useEffect } from 'react'

import './App.css'
import * as CANNON from 'cannon-es'

import GameManager from './GameManager.js';
import PongScene from './PongScene.js';
import { IN_GAME_OBJECTS } from './InGameObjects.js';
import { Constants } from './Constants.js';
import UIManager from './UIManager.js';
import Events from './Events.js';
import Globals from './Globals.js';
import TournamentLogic from './TournamentLogic.js';
import { GameModes } from './Enums.js';


function App() {
  useEffect(() => {
    const tournamentLogic = new TournamentLogic()
    const uimanager = new UIManager(tournamentLogic)

    
    window.addEventListener('setPlayers', (e) => {
      //Globals.currentPlayerLeft.SetPaddle(IN_GAME_OBJECTS.paddleLeft)
      //Globals.currentPlayerRight.SetPaddle(IN_GAME_OBJECTS.paddleRight)
      const game = new PongScene('canvas', Globals.currentPlayerLeft, Globals.currentPlayerRight, tournamentLogic);
      game.initialize();
      GameManager.StartGame(game.animate.bind(game));
      if (Globals.currentGameMode === GameModes.SinglePlayer) {
        Globals.currentPlayerRight.paddle.SetSpeed(0.1)
      }
      Constants.buttonStart.onclick = () => {
        //playerLeft.ResetScore();
        //playerRight.ResetScore();
        if (Globals.currentGameMode === GameModes.Tournament) {
            tournamentLogic.NextTeam()
        }
        dispatchEvent(Events["reset"])
        //IN_GAME_OBJECTS.ball.SetDirection(Constants.ballStartDir);
        //IN_GAME_OBJECTS.ball.SetPosition(Constants.ballStartPosition);
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
    


    
  }, []);


  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  )
}

export default App