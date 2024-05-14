export const createPost = async (postData) => {
    return {
        id: 101,
        username: postData.username,
        email: postData.email
    }
}

export const getUsers = async () => {
    return [
        {username: 'user1'},
        {username: 'user2'}
    ]
};
