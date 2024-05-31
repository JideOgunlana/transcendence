
import { BackBtn, GameSelect, NextBtn } from '../../components';
import { PongGameMenu, MemoryGameMenu, PongGamePlayerList, MemoryGamePlayerList, MemoryGame } from '../../containers';
import './dashboard.css';

const Dashboard = ({ step, setStep, handleNextBtnClick, handleBackBtnClick, handlePongOptionsChange, handleMemoryOptionsChange }) => {
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
                    </div>
                )
            }
            {
                step.stepNumber === 1 && step.pong.selected && (
                    <>
                        <BackBtn handleBackBtnClick={handleBackBtnClick}/>
                        <div className='dashboard--gameMenu flex-fill d-flex align-items-center'>
                            <PongGameMenu 
                                handleNextBtnClick={handleNextBtnClick}
                                handlePongOptionsChange={handlePongOptionsChange} 
                                step={step}
                            />
                        </div>
                    </>
                ) ||
                step.stepNumber === 1 && step.memory.selected && (
                    <>
                        <BackBtn handleBackBtnClick={handleBackBtnClick}/>
                        <div className='dashboard--gameMenu flex-fill d-flex align-items-center'>
                            <MemoryGameMenu
                                handleNextBtnClick={handleNextBtnClick}
                                handleMemoryOptionsChange={handleMemoryOptionsChange} 
                                step={step}
                            />
                        </div>
                    </>
                )
            }
            {
                step.stepNumber === 2 && step.pong.selected && (
                    <>
                        <BackBtn handleBackBtnClick={handleBackBtnClick}/>
                        <div className='dashboard--gamePlayers flex-fill'>
                            <PongGamePlayerList step={step} setStep={setStep} />
                        </div>
                    </>
                ) ||
                step.stepNumber === 2 && step.memory.selected && (
                    <>
                        <BackBtn handleBackBtnClick={handleBackBtnClick}/>
                        <div className='dashboard--gamePlayers flex-fill'>
                            <MemoryGamePlayerList step={step} setStep={setStep} />
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Dashboard;
