export const createPost = async (postData) => {
    return {
        username: postData.username,
        email: postData.email
    }
}

export const getUsers = async () => {
    return [
        {
            username: '121345678912345678912',
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
            username: '121345678912345678912',
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
