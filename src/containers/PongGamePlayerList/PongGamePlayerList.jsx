import { useState } from 'react';
import { PlayerList, StartGameBar } from '../../components';
import './pongGamePlayerList.css';

const PongGamePlayerList = ({ step, setStep }) => {

    return (
        <div className='pongGamePlayerList'>
            <PlayerList step={step} setStep={setStep} />
            <StartGameBar step={step}pr />
        </div>
    );
};

export default PongGamePlayerList;
