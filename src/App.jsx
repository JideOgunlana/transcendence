import { useEffect } from 'react'

// import './App.css'
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
import {Header, Main, Footer} from './containers/'


function App() {
  return (
    <div className='app-container'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App
