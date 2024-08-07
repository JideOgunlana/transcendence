
import { useEffect } from 'react';
import { PongGameSingle, PongGameMulti, PongGameTournament } from './'
import { Unauthorized } from '../../../containers'
import './pongGame.css'


const PongGame = ({ step }) => {
  const initialSelectedPlayers = (step.aliases.length > 0 && step.pong.mode === 'tournament') ?
    step.aliases
    :
    step.pong.selectedPlayers;

  const mode = step.pong.mode;
  const theme = step.pong.theme;
  
  if (mode === 'tournament') {
    if (step.aliases.length === 0) {
      return (
        <div className='pongGame d-grid align-content-center'>
          <Unauthorized />
        </div>
      )
    }
  }
  if (mode === 'multiPlayer') {
    if (step.pong.selectedPlayers.length < 2) {
      return (
        <div className='pongGame d-grid align-content-center'>
          <Unauthorized />
        </div>
      )
    }
  }

  useEffect(() => {
    // Add / Remove 'no-scroll' class to body when component mounts / unmounts
    document.body.classList.add('no-scroll');

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);


  return (
    <div className='pongGame d-grid'>
      {
        step.pong.selectedPlayers.length >= 1 ?
          <>
            {
              mode === 'singlePlayer' &&
              <div>
                <PongGameSingle
                  theme={theme}
                  selectedPlayers={initialSelectedPlayers}
                />
              </div>
            }
            {
              mode === 'multiPlayer' &&
              <div>
                <PongGameMulti
                  theme={theme}
                  selectedPlayers={initialSelectedPlayers}
                />
              </div>
            }
            {
              mode === 'tournament' &&
              <div>
                <PongGameTournament
                  theme={theme}
                  selectedPlayers={initialSelectedPlayers}
                />
              </div>
            }
          </>
          :
          <div className='align-self-center'>
            <Unauthorized />
          </div>
      }
    </div>
  );
}

export default PongGame;
