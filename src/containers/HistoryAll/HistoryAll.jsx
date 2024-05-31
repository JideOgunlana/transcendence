import React, { useState, useEffect } from 'react';
import './historyAll.css';
import { HistoryUser } from '../../containers';
import { userIcon } from '../../assets';
import axios from 'axios';

import { getFakeUserData } from '../../__tests__/api';

const HistoryColumn = ({ userCol, userData, onSelectUser }) => {
    const handleClick = () => {
        onSelectUser(userData);
    };

    return (
        <div className='flex-fill d-flex align-items-center justify-content-center historyAll--column mb-3 mt-3 p-5 gap-5' onClick={handleClick}>
            <div>
                <img src={userIcon} width={40} alt={userData.username} />
            </div>
            <div>
                { userData.username }
            </div>
            <div className='historyWin'>
                { 
                    userCol === 'pong' ? 
                        userData.pong.singlePlayer['win'] + userData.pong.multiPlayer['win'] 
                        : 
                        userData.memory.singlePlayer['win'] +  userData.memory.multiPlayer['win'] 
                } 
                <span> wins </span> 
            </div>
            <div className='historyLoss'>
                { 
                    userCol === 'pong' ? 
                        userData.pong.singlePlayer['loss'] + userData.pong.multiPlayer['loss'] 
                        : 
                        userData.memory.singlePlayer['loss'] +  userData.memory.multiPlayer['loss'] 
                }
                <span> losses </span> 
            </div>
            <div className='historyTotal'>
                { 
                    userCol === 'pong' ? 
                        userData.pong.singlePlayer['total'] + userData.pong.multiPlayer['total'] 
                        :
                        userData.memory.singlePlayer['total'] + userData.memory.multiPlayer['total'] 
                } 
                <span> games played     </span>
            </div>
        </div>
    );
};

const HistoryAll = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const data =  await getFakeUserData();
                const response = await axios.get('http://127.0.0.1:8000/pong/users/');
                setUserData(response.data);
                console.log(response.data);
            } catch (err) {
                setError('Failed to fetch user data');
                console.error(err);
            }
        };

        fetchData();
    }, []);

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
                            error ? (
                                <div className='text-center'>
                                    {error}
                                </div>
                            ) : (
                                userData && userData.length !== 0? 
                                userData.map(user => (
                                    <HistoryColumn 
                                        key={user.id} 
                                        userCol={'pong'} 
                                        userData={user} 
                                        onSelectUser={handleSelectUser} />
                                )) : 
                                <div className='text-center'>
                                    -- i18n No Pong game History --
                                </div>
                            )
                        }
                    </div>
                    <div className='historyAll-memory mt-5'>
                        <h3 className='text-center mb-5'>Memory i18n.History</h3>
                        {
                            error ? (
                                <div className='text-center'>
                                    {error}
                                </div>
                            ) : (
                                userData && userData.length !== 0 ? 
                                userData.map(user => (
                                    <HistoryColumn key={user.id} 
                                        userCol={'memory'} 
                                        userData={user} 
                                        onSelectUser={handleSelectUser} />
                                )) : 
                                <div className='text-center'>
                                    -- No Memory game History --
                                </div>
                            )
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
