import React from 'react';
import { MemoryMulti, MemorySingle, MemoryTournament } from './';
import { Unauthorized } from '../../../containers'
import './memoryGame.css';


const MemoryGame = ({ step }) => {

    // console.log(step.memory.selectedPlayers);
    const initialSelectedPlayers = (step.aliases.length > 0 && step.memory.mode === 'tournament') ? 
        step.aliases 
        : 
        step.memory.selectedPlayers


    const mode = step.memory.mode;
    const theme = step.memory.theme;
    const gridSize = step.memory.gridSize;

    return (

        <div className='memoryGame d-grid align-content-center'>
            {
                initialSelectedPlayers.length >= 1 ? 
                <>
                    {
                        mode === 'singlePlayer' &&
                        <div>
                            <h3 className='text-center'> Memory </h3>
                            <div className='text-center'>
                                <span> ~ Single Player ~ </span>
                            </div>
                            <MemorySingle
                                gridSize={gridSize}
                                theme={theme}
                                selectedPlayers={initialSelectedPlayers}
                            />
                        </div>
                    }
                    {
                        mode === 'multiPlayer' &&
                        <div>
                            <h3 className='text-center'> Memory </h3>
                            <div className='text-center'>
                                <span> ~ Multi player ~ </span>
                            </div>
                            <MemoryMulti 
                                gridSize={gridSize}
                                theme={theme}
                                selectedPlayers={initialSelectedPlayers}
                            />
                        </div>
                    }
                    {
                        mode === 'tournament' &&
                        <div>
                            <h3 className='text-center'> Memory </h3>
                            <div className='text-center'>
                                <span> ~ Tournament ~ </span>
                            </div>
                            <MemoryTournament 
                                gridSize={gridSize}
                                theme={theme}
                                selectedPlayers={initialSelectedPlayers}
                            />
                        </div>
                    }
                </>
                :
                <>
                    <Unauthorized />
                </>
            }
        </div>
    );
};

export default MemoryGame;
