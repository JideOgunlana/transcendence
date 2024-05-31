import React from 'react';
import './historyUser.css';
import { Player } from '../../components';
import { userIcon } from '../../assets';

const PieChart = ({ games }) => {
    return (
        <div className='statsCard'>
            Pong / Memory Pie Chart (Ratio of Total Pong games to Memory games)
        </div>
    );
};

const PongWinLoss = ({ winSingleGame, lossSingleGame, winMultiGame, lossMultiGame, totalSingleGame, totalMultiGame }) => {
    return (
        <div className='statsCard'>
            Pong Game Wins and Losses:
            <div>
                Total single games played: { totalSingleGame }
            </div>
            <div>
                Single Player Wins: { winSingleGame }
            </div>
            <div>
                Single Player Losses: { lossSingleGame }
            </div>
            <div>
                Total Multi games played: { totalMultiGame }
            </div>
            <div>
                Multi Player Wins: { winMultiGame }
            </div>
            <div>
                Multi Player Losses: { lossMultiGame }
            </div>
        </div>
    );
};

const MemoryWinLoss = ({ winSingleGame, lossSingleGame, winMultiGame, lossMultiGame, totalSingleGame, totalMultiGame }) => {
    return (
        <div className='statsCard'>
            Memory Game Wins and Losses:
            <div>
                Total single games played: { totalSingleGame }
            </div>
            <div>
                Single Player Wins: { winSingleGame }
            </div>
            <div>
                Single Player Losses: { lossSingleGame }
            </div>
            <div>
                Total Multi games played: { totalMultiGame }
            </div>
            <div>
                Multi Player Wins: { winMultiGame }
            </div>
            <div>
                Multi Player Losses: { lossMultiGame }
            </div>
        </div>
    );  
};



const HistoryUser = ({ userData, onBack }) => {
    const { username } = userData;
    return (
        <div className='historyUser d-flex gap-5 mt-5 flex-column'>
            <h4 className='text-center'> Your History</h4>
            <div className='col-2'>
                <button onClick={onBack} className='btn btn-primary mb-3'>Back</button>
            </div>
            <div className='row col-12'>
                <div className='historyUser--stats mt-3 col-12 row justify-content-center'>
                    <div className='historyUser--player mb-5 col-12 col-md-4'>
                        <Player 
                            userImg={ userIcon }
                            username={ username }
                        />
                    </div>
                    <div className='historyUser--stats-grid row gap-4 col-12 col-md-8'>
                        <PongWinLoss 
                            winSingleGame={userData.pong.singlePlayer['win']}
                            lossSingleGame={userData.pong.singlePlayer['loss']}
                            totalSingleGame={userData.pong.singlePlayer['total']}
                            winMultiGame={userData.pong.multiPlayer['win']}
                            lossMultiGame={userData.pong.multiPlayer['loss']}
                            totalMultiGame={userData.pong.multiPlayer['total']}
                        />
                        <MemoryWinLoss
                            winSingleGame={userData.memory.singlePlayer['win']}
                            lossSingleGame={userData.memory.singlePlayer['loss']}
                            totalSingleGame={userData.memory.singlePlayer['total']}
                            winMultiGame={userData.memory.multiPlayer['win']}
                            lossMultiGame={userData.memory.multiPlayer['loss']}
                            totalMultiGame={userData.memory.multiPlayer['total']}
                        />
                        <PieChart
                            games={''}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryUser;
