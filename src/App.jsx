import { useEffect, useState } from 'react'

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

  const [showSignup, setShowSignup] = useState(false);
  const [userSignedUp, setUserSignedUp] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleSignup = () => {
    setShowSignup(true);
    setUserSignedUp(false);
    setShowDashboard(false);
  };

  const handleUserSignedUp = () => {
    setShowSignup(false);
    setUserSignedUp(true);
  };

  const handleLogoClick = () => {
    setShowSignup(false); // Resetting the state to hide the Signup Component
    setUserSignedUp(false); // Resetting the userSignedUp state
    setShowDashboard(false);
  };

  const handleGoToDashboard = () => {

    setShowSignup(false);
    setUserSignedUp(false);
    setShowDashboard(true);
  }

  const setShowDashboardAsync = async (value) => {
    return new Promise((resolve) => {
      setShowDashboard(value);
      resolve();
    });
  };

  const resetDashboardStep = async () => {
    await setShowDashboardAsync(false);
    await setShowDashboardAsync(true);
  };


  return (
    <div className='app-container'>
      <Header 
        handleSignup={handleSignup}
        handleLogoClick={handleLogoClick}
        handleGoToDashboard={handleGoToDashboard}
        resetDashboardStep={resetDashboardStep}
      />
      <Main 
        showSignup={showSignup}
        userSignedUp={userSignedUp}
        showDashboard={showDashboard}
        setShowDashboard={setShowDashboard}
        handleUserSignedUp={handleUserSignedUp}
        handleSignup={handleSignup}
        handleGoToDashboard={handleGoToDashboard}
      />
      <Footer />
    </div>
  )
}

export default App
