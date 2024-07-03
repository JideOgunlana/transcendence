import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TournamentAlias } from '../../components';
import { aliasNameValid } from '../../utils/formHelper';
import { useNavigate } from 'react-router-dom';
import './startGameBar.css';
import { brainIcon, pingPongIcon } from '../../assets';

const StartGameBar = ({ step, setStep }) => {

    const { t } = useTranslation();
    const [isStartDisabled, setIsStartDisabled] = useState(true);
    const [showAliasModal, setShowAliasModal] = useState(false);
    const [aliases, setAliases] = useState([]);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleStartClick = () => {
        if ((step.pong.selected && step.pong.mode === 'tournament') ||
            (step.memory.selected && step.memory.mode === 'tournament')) {
                setShowAliasModal(true);
        } else {
            // Navigate to the appropriate game route
            setAliases([]);
            if (step.pong.selected) {
                navigate('pong');
            } else if (step.memory.selected) {
                navigate('memory');
            }
        }
    };

    const handleAliasSubmit = (aliases) => {
        // Check if all aliases are filled and meet the criteria
        const aliasIsValid = aliasNameValid(aliases);

        if (aliasIsValid) {
            setAliases(aliases);
            setShowAliasModal(false);
            setStep({ ...step, aliases: aliases });
            // Proceed with starting the game after aliases are set
            // Navigate to the appropriate game route if aliases are valid
            if (step.pong.selected) {
                navigate('pong');
            } else if (step.memory.selected) {
                navigate('memory');
            }
        } else {
            // Display an error message or handle invalid aliases
            setShowAliasModal(true);
            setShowError(true);
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
        <div className='startGameBar p-3 mx-auto'>
            {
                step.pong.selected &&
                <>
                    <div className='startGameBar--title'>
                        <h4 className='text-center'>
                            <img src={pingPongIcon} />&nbsp;
                            {
                                `Pong - 
                                ${step.pong.mode === 'singlePlayer' ? t('single')
                                    :
                                    step.pong.mode === 'tournament' ? t('tournament')
                                        :
                                        '1v1'
                                }
                                `
                            }
                        </h4>
                        <h5 className='m-3 gameRequirementsInfo'>* { t('requirements') }</h5>
                        <h5>
                            {
                                `${step.pong.selectedPlayers ? step.pong.selectedPlayers.length : 0} / ${getMaxPlayers(step.pong.mode)} ${t('selected')}`
                            }
                        </h5>
                    </div>
                    <div className='startGameBar--btn d-flex justify-content-center align-items-center'>
                        <button className={isStartDisabled ? `game-btn-disabled` : `game-btn-enabled`} onClick={handleStartClick} disabled={isStartDisabled}>
                            { t('start') }
                        </button>
                    </div>
                    <TournamentAlias
                        show={showAliasModal}
                        handleModalClose={() => setShowAliasModal(false)}
                        handleAliasSubmit={handleAliasSubmit}
                        selectedPlayers={step.pong.selectedPlayers}
                        showError={showError}
                    />
                </>
            }
            {
                step.memory.selected &&
                <>
                    <div className='startGameBar--title'>
                        <h4 className='text-center'>
                            <img src={ brainIcon } />&nbsp;
                            {
                                `Memory - 
                                ${step.memory.mode === 'singlePlayer' ? t('single')
                                    :
                                    step.memory.mode === 'tournament' ? t('tournament')
                                        :
                                        '1v1'
                                }
                                `
                            }
                        </h4>
                        <h5 className='m-3 gameRequirementsInfo'>* { t('requirements') }</h5>
                        <h5>
                            {
                                `${step.memory.selectedPlayers ? step.memory.selectedPlayers.length : 0} / ${getMaxPlayers(step.memory.mode)} ${ t('selected') }`
                            }
                        </h5>
                    </div>
                    <div className='startGameBar--btn d-flex justify-content-center align-items-center'>
                        <button className={isStartDisabled ? `game-btn-disabled` : `game-btn-enabled`} onClick={handleStartClick} disabled={isStartDisabled}>
                            { t('start') }
                        </button>
                    </div>
                    <TournamentAlias
                        show={showAliasModal}
                        handleModalClose={() => setShowAliasModal(false)}
                        handleAliasSubmit={handleAliasSubmit}
                        selectedPlayers={step.memory.selectedPlayers}
                        showError={showError}
                    />
                </>
            }
        </div>
    );
};

export default StartGameBar;
