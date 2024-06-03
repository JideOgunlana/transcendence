import React, { useState, useEffect } from 'react';
import { Player } from '../../components';
import { useTranslation } from 'react-i18next';
import { VictoryPie } from 'victory';
import { backBtnIcon, brainIcon, pingPongIcon, pieChartIcon, userIcon } from '../../assets';
import './historyUser.css';

const PieChart = ({ userData }) => {
    const graphicColor = ['#388087', '#6fb3b8', '#badfe7'];
    const totalPongGames = userData.pong.singlePlayer.total + userData.pong.multiPlayer.total;
    const totalMemoryGames = userData.memory.singlePlayer.total + userData.memory.multiPlayer.total;
    const totalGames = totalPongGames + totalMemoryGames;
    // Calculate percentages
    const pongPercentage = totalGames > 0 ? parseInt((totalPongGames / totalGames) * 100) : 0;
    const memoryPercentage = totalGames > 0 ? parseInt((totalMemoryGames / totalGames) * 100) : 0;

    const wantedGraphicData = [{ x: 'Pong', y: pongPercentage }, { x: 'Memory', y: memoryPercentage }];
    const defaultGraphicData = [{ x: 'Pong', y: 0 }, { x: 'Memory', y: 0 }];
    const [graphicData, setGraphicData] = useState(defaultGraphicData);
    

    useEffect(() => {
      setGraphicData(wantedGraphicData);
    }, []);
    if (totalGames != 0 || totalGames == 0) {
        return (
            <div className='statsCard'>
                <VictoryPie
                animate={{ easing: 'exp' }}
                data={graphicData}
                width={250}
                height={250}
                colorScale={graphicColor}
                innerRadius={50}
                />
            </div>
        );
    }
};

const PongWinLoss = ({ winSingleGame, lossSingleGame, winMultiGame, lossMultiGame, totalSingleGame, totalMultiGame }) => {
    return (
        <div className='statsCard'>
            <div>
                <img src={pingPongIcon} alt='ping pong' />
            </div>
            Pong Game Wins and Losses:
            <div>
                Total single games played: {totalSingleGame}
            </div>
            <div>
                Single Player Wins: {winSingleGame}
            </div>
            <div>
                Single Player Losses: {lossSingleGame}
            </div>
            <div>
                Total Multi games played: {totalMultiGame}
            </div>
            <div>
                Multi Player Wins: {winMultiGame}
            </div>
            <div>
                Multi Player Losses: {lossMultiGame}
            </div>
        </div>
    );
};

const MemoryWinLoss = ({ winSingleGame, lossSingleGame, winMultiGame, lossMultiGame, totalSingleGame, totalMultiGame }) => {
    return (
        <div className='statsCard'>
            <div>
                <img src={brainIcon} alt='ping pong' />
            </div>
            Memory Game Wins and Losses:
            <div>
                Total single games played: {totalSingleGame}
            </div>
            <div>
                Single Player Wins: {winSingleGame}
            </div>
            <div>
                Single Player Losses: {lossSingleGame}
            </div>
            <div>
                Total Multi games played: {totalMultiGame}
            </div>
            <div>
                Multi Player Wins: {winMultiGame}
            </div>
            <div>
                Multi Player Losses: {lossMultiGame}
            </div>
        </div>
    );
};



const HistoryUser = ({ userData, onBack }) => {

    const { t } = useTranslation();
    const { username } = userData;
    return (
        <div className='historyUser d-flex gap-5 mt-5 flex-column'>
            <h4 className='text-center'>{t('your game history')}</h4>
            <div className='col-2 backBtn'>
                <button onClick={onBack} className='btn btn-secondary mb-3 d-flex align-items-center'>
                    <img src={backBtnIcon} alt="back" />
                    <span> {t('back')} </span>
                </button>
            </div>
            <div className='row col-12'>
                <div className='historyUser--stats mt-3 col-12 row justify-content-center'>
                    <div className='historyUser--player mb-5 col-12 col-md-4'>
                        <Player
                            userImg={userIcon}
                            username={username}
                        />
                    </div>
                    <div className='historyUser--stats-grid row gap-4 col-12 col-md-8 justify-content-center'>
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
                            userData={userData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryUser;
