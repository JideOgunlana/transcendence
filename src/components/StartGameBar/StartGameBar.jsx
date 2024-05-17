import { useState, useEffect } from 'react';
import './startGameBar.css';
import { TournamentAlias } from '../../components';
import { aliasNameValid } from '../../utils/helper';


const StartGameBar = ({ step }) => {
    const [isStartDisabled, setIsStartDisabled] = useState(true);
    const [showAliasModal, setShowAliasModal] = useState(false);
    const [aliases, setAliases] = useState([]);
    const [showError, setShowError] = useState(false);
    const ALIAS_MAX = 15;
    const ALIAS_MIN = 2;

    const handleStartClick = () => {
        if (step.pong.mode === 'tournament' && aliases.length < 4) {
            setShowAliasModal(true);
        } else {
            // Send the step data and aliases to the server
            console.log('Starting game with parameters:', step, 'Aliases:', aliases);
        }
    };

    const handleAliasSubmit = (aliases) => {
        // Check if all aliases are filled and meet the criteria
        const aliasIsValid = aliasNameValid(aliases);
    
        if (aliasIsValid) {
            setAliases(aliases);
            setShowAliasModal(false);
            // Proceed with starting the game after aliases are set
            console.log('Starting game with parameters:', step, 'Aliases:', aliases);
        } else {
            // Display an error message or handle invalid aliases
            setShowAliasModal(true);
            setShowError(true);
            console.log('Invalid aliases. Please ensure each alias meets the criteria.');
        }
    };
    

    const areSelectionRequirementsMet = () => {
        if (step.pong.selected) {
            const maxPlayersPong = getMaxPlayers(step.pong.mode);
            return step.pong.selectedPlayers && step.pong.selectedPlayers.length === maxPlayersPong;
        } else if (step.memory.selected) {
            const maxPlayersMemory = getMaxPlayers(step.memory.mode);
            return step.memory.selectedPlayers && step.memory.selectedPlayers.length === maxPlayersMemory;
        }
        return false;
    };

    useEffect(() => {
        setIsStartDisabled(!areSelectionRequirementsMet());
    }, [step]);

    const getMaxPlayers = (mode) => {
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
        <div className='startGameBar p-3'>
            <div className='startGameBar--title'>
                <h4 className=''>{'i18n.pong - data.type'}</h4>
                <h5 className='mTop16 gameRequirementsInfo'>{'* data.requirements'}</h5>
                <h5>{`${step.pong.selectedPlayers ? step.pong.selectedPlayers.length : 0} / ${getMaxPlayers(step.pong.mode)} ${'i18n SELECTED'}`}</h5>
            </div>
            <div className='startGameBar--btn d-flex justify-content-center align-items-center'>
                <button className={isStartDisabled ? `game-btn-disabled`: `game-btn-enabled`} onClick={handleStartClick} disabled={isStartDisabled}>
                    {'i18n.Start'}
                </button>
            </div>
            <TournamentAlias
                show={showAliasModal}
                handleModalClose={() => setShowAliasModal(false)}
                handleAliasSubmit={handleAliasSubmit}
                selectedPlayers={step.pong.selectedPlayers}
                showError={showError}
            />

        </div>
    );
};

export default StartGameBar;