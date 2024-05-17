import { getUsers } from "../__tests__/api";

const USERNAME_MIN_LENGTH = 2;
const USERNAME_MAX_LENGTH = 15;
const ALIAS_MIN = 2;
const ALIAS_MAX = 15;


export const signupFormValid = (username) => {

    const trimmedUsername = username.trim();

    if (trimmedUsername.length < USERNAME_MIN_LENGTH || trimmedUsername.length > USERNAME_MAX_LENGTH) {
        console.error("Username must be between 2 and 20");
        return false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(trimmedUsername)) {
        return false; // Alias should contain only letters (both uppercase and lowercase) and numbers
    }
    if (!/^[a-zA-Z]/.test(trimmedUsername)) {
        return false; // Alias should start with a letter
    }
    if (trimmedUsername !== username) return false;
    return true;
}

export const checkNameExists = async (username) => {
    const users = await getUsers(); // stubbed line for testing without Django backend
    return users.some(user => user.username.toLowerCase() === username.toLowerCase());
}

export const emailValid = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

export const aliasNameValid = (aliases) => {
    // Check if all aliases are filled and meet the criteria
    const aliasIsValid = aliases.every(alias => {
        const trimmedAlias = alias.alias.trim();
        // Check if alias is not empty
        if (trimmedAlias.length < ALIAS_MIN || trimmedAlias.length > ALIAS_MAX) {
            return false; // Alias length should be between 2 and 15 characters
        }
        // Check if alias contains only alphanumeric characters
        if (!/^[a-zA-Z0-9]+$/.test(trimmedAlias)) {
            return false; // Alias should contain only letters (both uppercase and lowercase) and numbers
        }
        if (!/^[a-zA-Z]/.test(trimmedAlias)) {
            return false; // Alias should start with a letter
        }
        // Check if alias has no leading or trailing spaces
        if (trimmedAlias !== alias.alias) {
            return false; // Alias should not have leading or trailing spaces
        }
        return true;
    });
    const aliasSet = new Set(aliases.map(alias => alias.alias.trim().toLowerCase()));
    const allUnique = aliasSet.size === aliases.length;

    return (aliasIsValid && allUnique);
}