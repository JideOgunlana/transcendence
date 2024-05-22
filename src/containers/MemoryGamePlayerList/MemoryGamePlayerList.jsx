import { useState } from 'react';
import { PlayerList, StartGameBar } from '../../components';
import './memoryGamePlayerList.css';

const MemoryGamePlayerList = ({ step, setStep }) => {

    return (
        <div className='memoryGamePlayerList d-flex'>
            <PlayerList step={step} setStep={setStep} />
            <div className='sideBar--startGame'>
                <StartGameBar step={step} />
            </div>
        </div>
    );
};

export default MemoryGamePlayerList;
