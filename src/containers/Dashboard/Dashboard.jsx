

import { useState } from 'react';
import {GameSelect, HistoryBar, NextBtn } from '../../components';
import {PongGameMenu, MemoryGameMenu, PongGamePlayerList, MemoryGamePlayerList, MemoryGame} from '../../containers';
import './dashboard.css';


const Dashboard = () => {
    const [step, setStep] = useState({
        stepNumber: 0,
            pong: {
                selected: true,
                theme: '3D',
                mode: 'singlePlayer',
                selectedPlayers: []
            },
            memory: {
                selected: false,
                theme: 'icons',
                mode: 'singlePlayer',
                gridSize: '4x4',
                selectedPlayers: []
            }
    });

    const handleNextBtnClick = () => {
        setStep({ ...step, stepNumber: step.stepNumber + 1 });
    };

    const handlePongOptionsChange = (options) => {
        setStep(prevState => ({
            ...prevState,
            pong: { ...prevState.pong, ...options }
        }));
    };
    
    const handleMemoryOptionsChange = (options) => {
        setStep(prevState => ({
            ...prevState,
            memory: { ...prevState.memory, ...options }
        }));
    };
    

    return (
        <div className='dashboard d-flex'>
            {
                step.stepNumber === 0 && (
                    <div className='dashboard--mainPage flex-fill'>
                        <div className='dashboard--mainPage--selectGame'>
                            <h2 className='mb-5 text-center'>i18n Select a Game</h2>
                            <GameSelect 
                                handlePongOptionsChange={handlePongOptionsChange} 
                                handleMemoryOptionsChange={handleMemoryOptionsChange} 
                            />
                            <NextBtn handleNextBtnClick={handleNextBtnClick} />
                        </div>
                        {/* <div className='sideBar'>
                            <HistoryBar step={step} />
                        </div> */}
                    </div>
                )
            }
            {
                step.stepNumber === 1 && step.pong.selected && (
                    <div className='dashboard--gameMenu flex-fill d-flex align-items-center'>
                        <PongGameMenu 
                            handleNextBtnClick={handleNextBtnClick}
                            handlePongOptionsChange={handlePongOptionsChange} 
                            step={step}/>
                    </div>
                )
                ||
                step.stepNumber === 1 && step.memory.selected && (<>
                    <div className='dashboard--gameMenu flex-fill d-flex align-items-center'>
                        <MemoryGameMenu
                            handleNextBtnClick={handleNextBtnClick}
                            handleMemoryOptionsChange={handleMemoryOptionsChange} 
                            step={step}
                        />
                    </div>
                </>)
            }
            {
                step.stepNumber === 2 && step.pong.selected && (
                <div className='dashboard--gamePlayers'>
                    <PongGamePlayerList step={step} setStep={setStep} />
                </div>
                )
                ||
                step.stepNumber === 2 && step.memory.selected && (
                    <div className='dashboard--gamePlayers'>
                        <MemoryGamePlayerList step={step} setStep={setStep} />
                    </div>
                )
            }

        </div>
    );
}

export default Dashboard;