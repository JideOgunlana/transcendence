import React, { useState } from 'react';
import './historyAll.css';
import { HistoryUser } from '../../containers';


import { getFakeUserData } from '../../__tests__/api';

const stubbedUserData = await getFakeUserData(); // stubbed line for testing without Django backend

const HistoryColumn = ({ userCol, userData, onSelectUser }) => {
    const handleClick = () => {
        onSelectUser(userData);
    };

    return (
        <div className='flex-fill d-flex align-items-center justify-content-center historyAll--column mb-3 mt-3 p-5 gap-5' onClick={handleClick}>
            <div>
                <img src={userData.userImg} width={40} alt={userData.username} />
            </div>
            <div>
                {userData.username}
            </div>
            {
                <div className='historyWin'>
                    { userCol === 'pong' ? userData.pong['wins'] : userData.memory['wins'] } wins
                </div>
            }
            {
            <div className='historyLoss'>
                { userCol === 'pong' ? userData.pong['losses'] : userData.memory['losses']} losses
            </div>
            }
            {
                <div className='historyTotal'>
                    { userCol === 'pong' ? userData.pong['gamesPlayed'] : userData.memory['gamesPlayed'] } games played
                </div>
            }
        </div>
    );
};

const HistoryAll = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSelectUser = (userData) => {
        setSelectedUser(userData);
    };

    const handleBack = () => {
        setSelectedUser(null);
    };

    return (
        <>
            {!selectedUser ? (
                <div className='historyAll d-flex justify-content-center mt-5'>
                    <div className='historyAll-pong mt-5'>
                        <h3 className='text-center mb-5'>Pong i18n.History</h3>
                        {
                            stubbedUserData.length !== 0 ?
                            stubbedUserData.slice(0, 2).map(user => (
                                <HistoryColumn 
                                    key={user.id} 
                                    userCol={'pong'} 
                                    userData={user} 
                                    onSelectUser={handleSelectUser} />
                            ))
                            :
                            <div className='text-center'>
                                -- i18n No Pong game History --
                            </div>
                        }
                    </div>
                    <div className='historyAll-memory mt-5'>
                        <h3 className='text-center mb-5'>Memory i18n.History</h3>
                        {
                            stubbedUserData.length !== 0 ?
                            stubbedUserData.map(user => (
                                <HistoryColumn key={user.id} 
                                    userCol={'memory'} 
                                    userData={user} 
                                    onSelectUser={handleSelectUser} />
                            ))
                            :
                            <div className='text-center'>
                                -- No Memory game History --
                            </div>
                        }
                    </div>
                </div>
            ) : (
                <div className='userHistory d-flex justify-content-center mt-3'>
                    <HistoryUser 
                        userData={selectedUser} 
                        onBack={handleBack} />
                </div>
            )}
        </>
    );
};

export default HistoryAll;
