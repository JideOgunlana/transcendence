import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Player } from '../../components';
import { VictoryPie, VictoryTooltip } from 'victory';
import { backBtnIcon, brainIcon, pingPongIcon, userIcon } from '../../assets';
import './historyUser.css';

const PieChart = ({ userData }) => {

    const { t } = useTranslation();
    const graphicColor = ['#388087', '#6fb3b8', '#badfe7'];
    const totalPongGames = userData.pong.singlePlayer.total + userData.pong.multiPlayer.total;
    const totalMemoryGames = userData.memory.singlePlayer.total + userData.memory.multiPlayer.total;
    const totalGames = totalPongGames + totalMemoryGames;
    // Calculate percentages
    const pongPercentage = totalGames > 0 ? parseInt((totalPongGames / totalGames) * 100) : 40;
    const memoryPercentage = totalGames > 0 ? parseInt((totalMemoryGames / totalGames) * 100) : 60;

    const wantedGraphicData = [
        { x: 'Pong', y: pongPercentage, label: `${totalPongGames}/${totalPongGames + totalMemoryGames} ${ t('games played') }` },
        { x: 'Memory', y: memoryPercentage, label: `${totalMemoryGames}/${totalPongGames + totalMemoryGames} ${ t('games played') }` }
    ]; // Data that we want to display
    const defaultGraphicData = [
        { x: 'Pong', y: 0 },
        { x: 'Memory', y: 100 }
    ];
    const [graphicData, setGraphicData] = useState(defaultGraphicData);


    useEffect(() => {
        setGraphicData(wantedGraphicData);
    }, []);
    if (totalGames) {
        return (
            <div className='statsCard'>
                <div className='keyCell'>
                    <div className='d-flex align-items-center justify-content-between'>Pong <div className='pongKeyCell'></div></div>
                    <div className='d-flex align-items-center justify-content-between'>Memory <div className='memoryKeyCell'></div></div>
                </div>
                <VictoryPie
                    animate={{ easing: 'exp' }}
                    data={graphicData}
                    width={250}
                    height={250}
                    colorScale={graphicColor}
                    innerRadius={50}
                    labelComponent={
                        <VictoryTooltip
                            flyoutStyle={{ fill: 'black' }}
                            style={{ fill: 'white', fontSize: 12, fontWeight: 'bold' }}
                        />
                    }
                    style={{
                        labels: {
                            fill: "white",
                            fontSize: 15,
                            fontWeight: "bold"
                        }
                    }}
                />
            </div>
        );
    }
};

const PongWinLoss = ({ winSingleGame, lossSingleGame, winMultiGame, lossMultiGame, totalSingleGame, totalMultiGame }) => {

    const { t } = useTranslation();

    return (
        <div className='statsCard'>
            <div>
                <img src={pingPongIcon} alt='ping pong' /> Pong
            </div>
            <div className='historySections mt-4 mx-auto'>
                <div className='text-center mb-2'>
                    { t('single') }
                </div>
                <div className='historyTotal'>
                    { t('games played') }: {totalSingleGame}
                </div>
                <div className='historyWin'>
                    {t('wins')}: {winSingleGame}
                </div>
                <div className='historyLoss'>
                    { t('losses') }: {lossSingleGame}
                </div>
            </div>
            <div className='historySections mt-4 mx-auto'>
                <div className='text-center mb-3'>
                    1v1
                </div>
                <div className='historyTotal'>
                    { t('games played') }: {totalMultiGame}
                </div>
                <div className='historyWin'>
                    { t('wins') }: {winMultiGame}
                </div>
                <div className='historyLoss'>
                    { t('losses') }: {lossMultiGame}
                </div>
            </div>
        </div>
    );
};

const MemoryWinLoss = ({ winSingleGame, lossSingleGame, winMultiGame, lossMultiGame, totalSingleGame, totalMultiGame }) => {

    const { t } = useTranslation();

    return (
        <div className='statsCard'>
            <div>
                <img src={brainIcon} alt='ping pong' /> Memory
            </div>
            <div className='historySections mt-4 mx-auto'>
                <div className='text-center mb-2'>
                    { t('single') }
                </div>
                <div className='historyTotal'>
                    { t('games played') }: {totalSingleGame}
                </div>
                <div className='historyWin'>
                    { t('wins') }: {winSingleGame}
                </div>
                <div className='historyLoss'>
                    { t('losses') }: {lossSingleGame}
                </div>
            </div>
            <div className='historySections mt-4 mx-auto'>
                <div className='text-center mb-3'>
                    1v1
                </div>
                <div className='historyTotal'>
                    { t('games played') }: {totalMultiGame}
                </div>
                <div className='historyWin'>
                    { t('wins') }: {winMultiGame}
                </div>
                <div className='historyLoss'>
                    { t('losses') }: {lossMultiGame}
                </div>
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
                        <div className='mt-3'>
                            Email: {userData.email}
                        </div>
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
