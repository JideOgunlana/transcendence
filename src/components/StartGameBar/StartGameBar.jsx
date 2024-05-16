import { useState, useEffect } from 'react';
import './startGameBar.css';

const StartGameBar = ({ step }) => {
    const [isStartDisabled, setIsStartDisabled] = useState(true);

    const handleStartClick = () => {
        // Send the step data to the server
        console.log('Starting game with parameters:', step);
    };

    const areSelectionRequirementsMet = () => {
        // Check if the selection requirements are met based on the current step data
        if (step.pong.selected) {
            // For Pong game mode
            const maxPlayersPong = getMaxPlayers(step.pong.mode);
            return step.pong.selectedPlayers && step.pong.selectedPlayers.length === maxPlayersPong;
        } else if (step.memory.selected) {
            // For Memory game mode
            const maxPlayersMemory = getMaxPlayers(step.memory.mode);
            return step.memory.selectedPlayers && step.memory.selectedPlayers.length === maxPlayersMemory;
        }
        return false;
    };

    useEffect(() => {
        // Update the disabled/enabled state of the Start button based on the selection requirements
        setIsStartDisabled(!areSelectionRequirementsMet());
    }, [step]);

    const getMaxPlayers = (mode) => {
        // Define the maximum number of players based on the game mode
        switch (mode) {
            case 'singlePlayer':
                return 1;
            case 'multiPlayer':
                return 2;
            case 'tournament':
                return 4;
            default:
                return 1;
        }
    };

    return (
        <div className='startGameBar'>
            <div className='startGameBar--title'>
                <h4 className=''>{'i18n.pong - data.type'}</h4>
                <h5 className='mTop16 gameRequirementsInfo'>{'* data.requirements'}</h5>
                <h5>{`${step.pong.selectedPlayers ? step.pong.selectedPlayers.length : 0} / ${getMaxPlayers(step.pong.mode)} ${'i18n SELECTED'}`}</h5>
            </div>
            <div className='startGameBar--btn'>
				<button className={isStartDisabled ? `game-btn-disabled`: `game-btn-enabled`} onClick={handleStartClick} disabled={isStartDisabled}>
					{'i18n.Start'}
				</button>
            </div>
        </div>
    );
};

export default StartGameBar;
