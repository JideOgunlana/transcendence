

import { useState } from 'react';
import {GameSelect, HistoryBar, NextBtn } from '../../components';
import {PongGameMenu, PongGamePlayerList, HistoryAll, HistoryUser} from '../../containers';
import './dashboard.css';


const Dashboard = () => {
    const [step, setStep] = useState(0);

    const handleNextBtnClick = (nextStep) => {
        setStep(nextStep);
    };



    return (
        <div className='dashboard'>
            {
                step === 0 && (
                    <div className='dashboard--mainPage'>
                        <div className='dashboard--mainPage--selectGame'>
                            <GameSelect />
                            <NextBtn handleNextBtnClick={ () => handleNextBtnClick(1)}/>
                        </div>
                        <div className='sideBar'>
                            <HistoryBar />
                        </div>
                    </div>
                )
            }
            {
                step === 1 && (
                    <div className='dashboard--gameMenu'>
                    <PongGameMenu handleNextBtnClick={ () => handleNextBtnClick(2)}/>
                    </div>
                )
            }
            {
                step === 2 &&
             <div className='dashboard--gamePlayers'>
                <PongGamePlayerList />
            </div> }
            {/* <div className='dashboard--fullHistory'>
                <HistoryAll />
            </div> */}
            {/* <div className='dashboard--userHistory'>
                <HistoryUser />
            </div> */}
        </div>
    );
}

export default Dashboard;