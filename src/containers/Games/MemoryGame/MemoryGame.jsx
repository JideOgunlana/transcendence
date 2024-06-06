import React from 'react';
import { MemoryMulti, MemorySingle, MemoryTournament } from './';
import { Unauthorized } from '../../../containers'
import './memoryGame.css';
import { useTranslation } from 'react-i18next';


const MemoryGame = ({ step }) => {

    const { t } = useTranslation();
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
                step.memory.selectedPlayers.length >= 1 ? 
                <>
                    {
                        mode === 'singlePlayer' &&
                        <div>
                            <h3 className='text-center'> Memory </h3>
                            <div className='text-center'>
                                <span> ~ { t('single') } ~ </span>
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
                                <span> ~ 1v1 ~ </span>
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
                                <span> ~ { t('tournament') } ~ </span>
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
