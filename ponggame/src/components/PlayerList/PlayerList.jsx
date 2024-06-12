import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Player } from '../../components';
import axios from 'axios';
import { userIcon } from '../../assets/';
import './playerList.css';
// import { getUsers } from '../../__tests__/api';


const PlayerList = ({ step, setStep }) => {

    const { t } = useTranslation();
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
                const response = await axios.get('http://localhost:8000/pong/users/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-MY-CUSTOM-HEADER': 'frontend_secret_token'  // Add the custom header
                    }
                });
                const fetchedUsers = response.data;
                setUsers(fetchedUsers);
                // console.log(fetchedUsers);
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
                <h3 className='text-center '>{ t('user list') }</h3>
            </div>
            <div className='playerList--info mb-5'>
                <h5> <em>* { t('click on a user to select or unselect') } </em> </h5>
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
                                            { t('there are no users, signup to create a user') }
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
