import { useEffect, useState } from 'react';
import './playerList.css';
import { Player } from '../../components';
import { getUsers } from '../../__tests__/api';

const PlayerList = ({ step, setStep }) => {
    const [users, setUsers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    useEffect(() => {
        // Update selectedPlayers in the step state whenever it changes
        setStep(prevStep => ({
            ...prevStep,
            [prevStep.pong.selected ? 'pong' : 'memory']: {
                ...prevStep[prevStep.pong.selected ? 'pong' : 'memory'],
                selectedPlayers: selectedPlayers // Use selectedPlayers here instead of selectedPlayers
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
            const maxPlayers = getMaxPlayers(step.pong.mode);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='playerList'>
            <div className='playerList--heading'>
                <h3>{'i18n.Player List'}</h3>
            </div>
            <div className='playerList--info'>
                <h4>{'i18n.*Click on a user to select or unselect'}</h4>
            </div>
            <div className='playerList--players clickable'>
                {users.map((user, index) => (
                    <Player
                        key={index}
                        username={user.username}
                        selected={selectedPlayers.includes(user)}
                        onClick={() => handleUserSelect(user)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PlayerList;
