import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HistoryUser } from '../../containers';
import axios from 'axios';
import { userIcon } from '../../assets';
import './historyAll.css';

// import { getFakeUserData } from '../../__tests__/api';

const HistoryColumn = ({ userCol, userData, onSelectUser }) => {

    const { t } = useTranslation();
    const handleClick = () => {
        onSelectUser(userData);
    };

    return (
        <div className='flex-fill d-flex flex-column flex-lg-row align-items-center justify-content-center historyAll--column mb-3 mt-3 p-5 gap-5' onClick={handleClick}>
            <div>
                <img src={userIcon} width={40} alt={userData.username} />
            </div>
            <div>
                { userData.username }
            </div>
            <div className='historyWin'>
                <span> { t('wins') } &gt; </span>
                <span className='btn btn-success'>
                { 
                    userCol === 'pong' ? 
                        userData.pong.singlePlayer['win'] + userData.pong.multiPlayer['win'] 
                        : 
                        userData.memory.singlePlayer['win'] +  userData.memory.multiPlayer['win'] 
                }
                </span>
            </div>
            <div className='historyLoss'>
                <span> { t('losses') } &gt; </span>
                <span className='btn btn-danger'>
                { 
                    userCol === 'pong' ? 
                        userData.pong.singlePlayer['loss'] + userData.pong.multiPlayer['loss'] 
                        : 
                        userData.memory.singlePlayer['loss'] +  userData.memory.multiPlayer['loss'] 
                }
                </span>
            </div>
            <div className='historyTotal'>
                <span> { t('games played') } &gt; </span>
                <span className='btn btn-secondary'>
                { 
                    userCol === 'pong' ? 
                        userData.pong.singlePlayer['total'] + userData.pong.multiPlayer['total'] 
                        :
                        userData.memory.singlePlayer['total'] + userData.memory.multiPlayer['total'] 
                }
                </span>
            </div>
        </div>
    );
};

const HistoryAll = () => {

    const { t } = useTranslation();
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
                <div className='historyAll row justify-content-center mt-5'>
                    <div className='col-12'>
                        <h3 className='text-center'> { t('all user game history') } </h3>
                    </div>
                    <div className='historyAll-pong mt-5 col-12 col-md-8 col-lg-6'>
                        <h3 className='text-center mb-5'>Pong</h3>
                        {
                            error ? (
                                <div className='text-center'>
                                    {error}
                                </div>
                            ) : (
                                userData && userData.length !== 0 ? 
                                [ ...userData ]
                                .sort( (a, b) => a.username.localeCompare(b.username) )
                                .map(user => (
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
                    <div className='historyAll-memory mt-5 col-12 col-md-8 col-lg-6'>
                        <h3 className='text-center mb-5'>Memory</h3>
                        {
                            error ? (
                                <div className='text-center'>
                                    {error}
                                </div>
                            ) : (
                                userData && userData.length !== 0 ? 
                                [ ...userData ]
                                .sort( (a, b) => a.username.localeCompare(b.username) )
                                .map(user => (
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
