import { userIcon } from '../assets/';


export const createPost = async (postData) => {
    return {
        username: postData.username,
        email: postData.email
    }
}

export const getUsers = async () => {
    return [
        {
            username: 'user1',
            email: 'uabc@email.com'
        },
        {
            username: 'user2',
            email: 'xyz@email.com'
        },
        {
            username: 'user3',
            email: 'uabc@email.com'
        },
        {
            username: 'user4',
            email: 'xyz@email.com'
        },
        {
            username: 'user5',
            email: 'xyz@email.com'
        },
        {
            username: 'user6',
            email: 'xyz@email.com'
        }
    ]
};

export const getFakeUserData = async () => { 
    return([
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
    ]);
}