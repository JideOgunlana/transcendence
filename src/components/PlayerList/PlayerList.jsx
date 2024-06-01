import { useEffect, useState } from 'react';
import { Player } from '../../components';
import { getUsers } from '../../__tests__/api';
import axios from 'axios';
import './playerList.css';
import { userIcon } from '../../assets/';


const PlayerList = ({ step, setStep }) => {
    const [users, setUsers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    useEffect(() => {
        // Update selectedPlayers in the step state whenever it changes
        setStep(prevStep => ({
            ...prevStep,
            [prevStep.pong.selected ? 'pong' : 'memory']: {
                ...prevStep[prevStep.pong.selected ? 'pong' : 'memory'],
                selectedPlayers: selectedPlayers
            }
        }));
    }, [selectedPlayers, setStep]);

    const handleUserSelect = (user) => {
        // Check if the user is already selected
        const index = selectedPlayers.findIndex((selectedUser) => selectedUser === user);

        if (index !== -1) {
            // User is already selected, unselect it
            setSelectedPlayers(selectedPlayers.filter((selectedUser) => selectedUser !== user));
        } else {
            // User is not selected, check the game mode and enforce selection rules
            const maxPlayers = step.pong.selected ? getMaxPlayers(step.pong.mode) : getMaxPlayers(step.memory.mode);
            if (selectedPlayers.length < maxPlayers) {
                setSelectedPlayers([...selectedPlayers, user]);
            }
        }
    };

    const getMaxPlayers = (mode) => {
        switch (mode) {
            case 'singlePlayer':
                return 1;
            case 'multiPlayer':
                return 2;
            case 'tournament':
                return 4;
            default:
                return 1;
        }
    };


    // Stubbed line via __tests__ api

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const fetchedUsers = await getUsers();
    //             setUsers(fetchedUsers);
    //         } catch (error) {
    //             console.error('Error fetching users:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/pong/users/');
                const fetchedUsers = response.data;
                setUsers(fetchedUsers);
                console.log(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
                return;
            }
        };
        fetchData();
    }, []);


    return (
        <div className='playerList'>
            <div className='playerList--heading mb-5'>
                <h3 className='text-center '>{'i18n.Player List'}</h3>
            </div>
            <div className='playerList--info mb-5'>
                <h5> <em>{'i18n.*Click on a user to select or unselect'} </em> </h5>
            </div>
            <div className='playerList--players d-flex flex-wrap clickable'>
                {
                    (() => {
                        try {
                            if (users.length >= 1) {
                                const sortedUsers = [...users].sort((a, b) => a.username.localeCompare(b.username));

                                return sortedUsers.map((user, index) => (
                                    <Player
                                        key={index}
                                        userImg={userIcon}
                                        username={user.username}
                                        selected={selectedPlayers.includes(user)}
                                        onClick={() => handleUserSelect(user)}
                                    />
                                ));
                            } else {
                                return (
                                    <div>
                                        <p>
                                            There are no users, Click on Signup to create a user
                                        </p>
                                    </div>
                                );
                            }
                        } catch (error) {
                            console.error('Error mapping users:', error);
                            return null;
                        }
                    })()
                }
            </div>
        </div>
    );
};

export default PlayerList;
