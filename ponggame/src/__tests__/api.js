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
                'win': 10,
                'loss': 5,
                'total': 15,
            },
            memory: {
                'win': 2,
                'loss': 4,
                'total': 6,
            }
        },
        {
            id: 2,
            userImg: userIcon,
            username: 'User2',
            pong: {
                'win': 8,
                'loss': 2,
                'total': 10,
            },
            memory: {
                'win': 3,
                'loss': 2,
                'total': 5,
            }
        },
        {
            id: 3,
            userImg: userIcon,
            username: 'User3',
            pong: {
                'win': 8,
                'loss': 1,
                'total': 9,
            },
            memory: {
                'win': 2,
                'loss': 7,
                'total': 9,
            }
        },
        {
            id: 4,
            userImg: userIcon,
            username: 'User4',
            pong: {
                'win': 3,
                'loss': 3,
                'total': 6,
            },
            memory: {
                'win': 8,
                'loss': 7,
                'total': 15,
            }
        },
    ]);
}


[
    {
        "id": 0,
        "username": "testuser",
        "email": "test@example.com",
        "pong": {
            "singlePlayer": {
                "total": 1,
                "win": 1,
                "loss": 0
            },
            "multiPlayer": {
                "total": 1,
                "win": 1,
                "loss": 0
            }
        },
        "memory": {
            "singlePlayer": {
                "total": 0,
                "win": 0,
                "loss": 0
            },
            "multiPlayer": {
                "total": 0,
                "win": 0,
                "loss": 0
            }
        },
    },
    {
        "id": 1,
        "username": "ben",
        "email": "ben@example.com",
        "pong": {
            "singlePlayer": {
                "total": 1,
                "win": 1,
                "loss": 0
            },
            "multiPlayer": {
                "total": 1,
                "win": 1,
                "loss": 0
            }
        },
        "memory": {
            "singlePlayer": {
                "total": 0,
                "win": 0,
                "loss": 0
            },
            "multiPlayer": {
                "total": 0,
                "win": 0,
                "loss": 0
            }
        },
    },
]