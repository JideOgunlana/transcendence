import React, { useState } from 'react';
import './historyAll.css';
import { HistoryUser } from '../../containers';
import { userIcon } from '../../assets/';

const fakeUserData = [
    {
        id: 1,
        userImg: userIcon,
        username: 'User1',
        pong: {
            'wins': 10,
            'losses': 5,
            'gamesPlayed': 15,
        },
        memory: {
            'wins': 2,
            'losses': 4,
            'gamesPlayed': 6,
        }
    },
    {
        id: 2,
        userImg: userIcon,
        username: 'User2',
        pong: {
            'wins': 8,
            'losses': 2,
            'gamesPlayed': 10,
        },
        memory: {
            'wins': 3,
            'losses': 2,
            'gamesPlayed': 5,
        }
    },
    {
        id: 3,
        userImg: userIcon,
        username: 'User3',
        pong: {
            'wins': 8,
            'losses': 1,
            'gamesPlayed': 9,
        },
        memory: {
            'wins': 2,
            'losses': 7,
            'gamesPlayed': 9,
        }
    },
    {
        id: 4,
        userImg: userIcon,
        username: 'User4',
        pong: {
            'wins': 3,
            'losses': 3,
            'gamesPlayed': 6,
        },
        memory: {
            'wins': 8,
            'losses': 7,
            'gamesPlayed': 15,
        }
    },
];

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
                <div>
                    { userCol === 'pong' ? userData.pong['wins'] : userData.memory['wins'] } wins
                </div>
            }
            {
            <div>
                { userCol === 'pong' ? userData.pong['losses'] : userData.memory['losses']} losses
            </div>
            }
            {
                <div>
                    { userCol === 'pong' ? userData.pong['gamesPlayed'] : userData.memory['gamesPlayed'] } played
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
                        {fakeUserData.slice(0, 2).map(user => (
                            <HistoryColumn 
                                key={user.id} 
                                userCol={'pong'} 
                                userData={user} 
                                onSelectUser={handleSelectUser} />
                        ))}
                    </div>
                    <div className='historyAll-memory mt-5'>
                        <h3 className='text-center mb-5'>Memory i18n.History</h3>
                        {fakeUserData.map(user => (
                            <HistoryColumn key={user.id} 
                            userCol={'memory'} 
                            userData={user} 
                            onSelectUser={handleSelectUser} />
                        ))}
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
