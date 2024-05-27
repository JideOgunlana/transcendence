import React, { useEffect } from 'react';
import GameManager from '../../../GameManager.js';
import PongScene from '../../../PongScene.js';
import UIManager from '../../../UIManager.js';
import TournamentLogic from '../../../TournamentLogic.js';
import { GameModes } from '../../../Enums.js';
import Globals from '../../../Globals.js';

function PongGame({step}) {

      const initialSelectedPlayers = step.aliases.length > 0 ? step.aliases : step.pong.selectedPlayers.map(player => {
        return {
            username: player.username,
            email: player.email,
            alias: ''
        };
    });

    console.log(initialSelectedPlayers);


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
    <div>
      <div id="user-input-overlay">
        <div id="form-wrapper">
          <form id="input-form">
            <div id="input-modi">
              <span>Modi: </span>
              <select name="modi" id="modi">
                <option value="SinglePlayer" className="modi-option">Single Player</option>
                <option value="DoublePlayer" className="modi-option">Double Player</option>
                <option value="MultiPlayer" className="modi-option">Multi Player</option>
                <option value="Tournament" className="modi-option">Tournament</option>
              </select>
            </div>
            <div id="input-number-players">Number of Players: <input type="text" name="fplayerNumber" /><br /><br /></div>
            <div id="input-player-names"></div>
            <button id="submit" type="button" value="Submit">Submit</button>
          </form>        
        </div>
      </div>
      <div id="overlay">
        <div id="scoreBoard">
          <div id="player-left">
            <p className="player-name"></p>
            <p className="score score-left"></p>
          </div>
          <div id="player-right">
            <p className="player-name"></p>
            <p className="score score-right"></p>
          </div>
        </div>
        <div id="main-container">
          <img id="btn-start" src="../../../start.png" />
          <div id="tournament-wrapper"><div id="matchmaker"></div></div>
          <div id="winning-background">
            <p id='winning-text'></p>
          </div>
        </div>
      </div>
      {/* Add canvas element with ID 'canvas' */}
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default PongGame;
