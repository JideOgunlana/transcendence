import defaults from './defaults';
import axios from 'axios';

export const signupFormValid = (username) => {
    const trimmedUsername = username.trim();

    if (trimmedUsername.length < defaults.USERNAME_MIN_LENGTH || trimmedUsername.length > defaults.USERNAME_MAX_LENGTH) {
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
    try {
        const response = await axios.get('http://localhost:8000/pong/users/', {
            headers: {
                'Content-Type': 'application/json',
                'X-MY-CUSTOM-HEADER': 'frontend_secret_token'  // Add the custom header
            }
        });

        const users = response.data;  // Get the data property from the response

        const normalizedUsername = username.toUpperCase();
        return users.some(user => user.username.toUpperCase() === normalizedUsername || normalizedUsername === defaults.AI_USERNAME);
    } catch (error) {
        console.error('Error checking username:', error);
        return false;  // Default to false if there's an error
    }
}

export const emailValid = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

export const aliasNameValid = (aliases) => {
    // Check if all aliases are filled and meet the criteria
    const aliasIsValid = aliases.every(alias => {
        const trimmedAlias = alias.alias.trim();
        // Check if alias is not empty
        if (trimmedAlias.length < defaults.ALIAS_MIN_LENGTH || trimmedAlias.length > defaults.ALIAS_MAX_LENGTH) {
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
