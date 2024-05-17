import { useState } from 'react';
import { PlayerList, StartGameBar } from '../../components';
import './pongGamePlayerList.css';

const PongGamePlayerList = ({ step, setStep }) => {

    return (
        <div className='pongGamePlayerList d-flex'>
            <PlayerList step={step} setStep={setStep} />
            <div className='sideBar--startGame'>
                <StartGameBar step={step} />
            </div>
        </div>
    );
};

export default PongGamePlayerList;
