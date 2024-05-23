import React from 'react';
import './historyUser.css';
import { Player } from '../../components';

const PieChart = ({ games }) => {
    return (
        <div className='statsCard'>
            Pong / Memory Pie Chart (Ratio of Total Pong games to Memory games)
        </div>
    );
};

const PongWinLoss = ({ winloss }) => {
    return (
        <div className='statsCard'>
            Pong Game Wins and Losses: {winloss}
        </div>
    );
};

const MemoryWinLoss = ({ winloss }) => {
    return (
        <div className='statsCard'>
           Memory Wins and Losses: {winloss}
        </div>
    );
};



const HistoryUser = ({ userData, onBack }) => {
    const { username, userImg } = userData;
    return (
        <div className='historyUser d-flex gap-5 mt-5 flex-column'>
            <h4 className='text-center'>{username} History</h4>
            <div className='col-2'>
                <button onClick={onBack} className='btn btn-primary mb-3'>Back</button>
            </div>
            <div className='row col-12'>
                <div className='historyUser--stats mt-3 col-12 row justify-content-center'>
                    <div className='historyUser--player mb-5 col-12 col-md-4'>
                        <Player 
                            userImg={ userImg }
                            username={ username }
                        />
                    </div>
                    <div className='historyUser--stats-grid row gap-4 col-12 col-md-8'>
                        <PongWinLoss winloss={userData.pong['wins'] - userData.pong['losses']} />
                        <MemoryWinLoss winloss={userData.pong['wins'] - userData.pong['losses']} />
                        <PieChart games={''} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryUser;
