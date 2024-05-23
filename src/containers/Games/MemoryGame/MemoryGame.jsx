import './memoryGame.css';
import React from 'react';
import { MemoryMulti, MemorySingle, MemoryTournament } from './';


const MemoryGame = ({ step }) => {
    const initialSelectedPlayers = [
        { username: 'user2', email: 'xyz@email.com', alias: 'user2-Al' },
        { username: 'user3', email: 'uabc@email.com', alias: 'user3-Al' },
        // { username: 'user4', email: 'uabc@email.com', alias: 'user4-Al' },
        // { username: 'user1', email: 'uabc@email.com', alias: 'user1-Al' }
    ];

    // Hard coded memory mode for testing
    // const mode = 'singlePlayer';
    const mode = 'multiPlayer';
    // const mode = 'tournament';


    return (

        <div>
            {
                mode === 'singlePlayer' &&
                <div>
                    <h3>Memory Single Player Mode</h3>
                    <MemorySingle
                        gridSize='4x4'
                        theme='icons'
                        selectedPlayers={initialSelectedPlayers}
                    />
                </div>
            }
            {
                mode === 'multiPlayer' &&
                <div>
                    <h3> Memory Multi player Mode </h3>
                    <MemoryMulti 
                        gridSize='4x4'
                        theme='icons'
                        selectedPlayers={initialSelectedPlayers}
                    />
                </div>
            }
            {
                mode === 'tournament' &&
                <div>
                    <h3>Memory Tournament Mode</h3>
                    <MemoryTournament 
                        gridSize='4x4'
                        theme='icons'
                        selectedPlayers={initialSelectedPlayers}
                    />
                </div>
            }
        </div>
    );
};

export default MemoryGame;
