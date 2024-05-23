import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';

import { Header, Main, Footer } from './containers/';

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [userSignedUp, setUserSignedUp] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [lang, setLang] = useState('en');
  const [sound, setSound] = useState('OFF');

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
    setShowSignup(false);
    setUserSignedUp(false);
    setShowDashboard(false);
  };

  const handleGoToDashboard = () => {
    setShowSignup(false);
    setUserSignedUp(false);
    setShowDashboard(true);
  };

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
    <Router>
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
          lang={lang}
          setLang={setLang}
          sound={sound}
          setSound={setSound}
        />
        <Footer />
      </div>
    </Router>
  )
}

export default App;
