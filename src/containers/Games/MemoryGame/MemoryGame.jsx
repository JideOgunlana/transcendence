import './memoryGame.css';
import React from 'react';
import { MemoryMulti, MemorySingle, MemoryTournament } from './';
import { Unauthorized } from '../../../containers'


const MemoryGame = ({ step }) => {

    const initialSelectedPlayers = step.aliases.length > 0 ? step.aliases : step.memory.selectedPlayers.map(player => {
        return {
            username: player.username,
            email: player.email,
            alias: '' // Default alias to username if aliases is empty
        };
    });
    
    console.log(initialSelectedPlayers);

    const mode = step.memory.mode;
    const theme = step.memory.theme;
    const gridSize = step.memory.gridSize;

    return (

        <div>
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
