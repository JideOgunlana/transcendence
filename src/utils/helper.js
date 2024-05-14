import { getUsers } from "../__tests__/api";

export const signupFormValid = (username) => {
    if (!username.trim()) {
        console.error("Username is required");
        return false;
    }

    if (username.length < 2 || username.length > 20) {
        console.error("Username must be between 2 and 20");
        return false;
    }
    return true;
}

export const checkNameExists = async (username) =>  {
    const users = await getUsers(); // stubbed line for testing without Django backend
    return users.some(user => user.username.toLowerCase() === username.toLowerCase());
}

export const emailValid = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};
