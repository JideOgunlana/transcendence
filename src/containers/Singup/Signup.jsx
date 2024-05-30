import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import axios from 'axios';
import { createPost } from '../../__tests__/api';
import { signupFormValid, checkNameExists, emailValid } from '../../utils/helper';
import defaults from '../../utils/defaults';

const Signup = ({ handleUserSignedUp, handleGoToDashboard }) => {
    const [signUpFormData, setSignUpFormData] = useState({
        username: '',
        email: ''
    });
    const [usernameInputState, setUsernameInputState] = useState({
        value: true,
        isDuplicate: false
    });
    const [emailInputState, setEmailInputState] = useState(true);


    const handleChange = e => {
        setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // resets the input state
        setUsernameInputState({ value: true, isDuplicate: false });
        setEmailInputState(true);

        if (!signupFormValid(signUpFormData.username)) {
            setUsernameInputState({ value: false, isDuplicate: false });
            return;
        }

        if (!emailValid(signUpFormData.email)) {
            setEmailInputState(false);
            return;
        }
        try {
            const nameExists = await checkNameExists(signUpFormData.username);
            if (nameExists) {
                setUsernameInputState({ value: false, isDuplicate: true });
                return;
            }
            setUsernameInputState({ value: true, isDuplicate: false });
            setEmailInputState(true);
            // const response = await axios.post('');
            const response = await createPost(signUpFormData); // stubbed line for testing without Django backend
            console.log('Response:  ', response);

            // Display User Profile after successful login
            handleUserSignedUp();
            // Navigate to userprofile only if requirements are met
            handleGoToUserProfile();
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    // Function to navigate to userprofile if requirements are met
    const handleGoToUserProfile = () => {
        if (signupFormValid(signUpFormData.username) && emailValid(signUpFormData.email)) {
            window.location.href = '/userprofile'; // Navigate to userprofile page
        }
    }

    return (
        <div className='signupSection align-content-center'>
            <div className='signupSection--form mx-auto d-flex flex-column align-items-center'>
                <h3 className='mb-1'>Create User</h3>
                <div className='custom-input'>

                    <div className={`signupSection--form--error cust-text-13 ${usernameInputState.isDuplicate || !usernameInputState.value ? 'showInputErrMsg' : ''}`}>
                        {usernameInputState.isDuplicate ? 
                        <div className='signupErrDuplicateUser d-flex align-items-end mt-3'>
                            <span>username is already taken</span>
                        </div>
                        :
                        <div className='signupErrList mt-3'>
                            <span>
                                * username must be between 2 to 20 characters 
                            </span>
                            <br />
                            <span>
                                * username must not have trailing or leading space
                            </span>
                            <br />
                            <span>
                                * username should contain only letters / numbers
                            </span>
                            <br />
                            <span>
                                * username should start with a letter
                            </span>
                        </div>
                        }
                    </div>
                    <br />
                    <label>Username</label>
                    <input
                        type='text'
                        name='username'
                        value={signUpFormData.username}
                        onChange={handleChange}
                        className={`form-control ${!usernameInputState.value ? 'inalid' : ''}`}
                        minLength={defaults.USERNAME_MIN_LENGTH}
                        maxLength={defaults.USERNAME_MAX_LENGTH}
                    />
                    <br />
                </div>
                <div className='custom-input'>

                    <span className={`signupSection--form--error cust-text-13 ${!emailInputState ? 'showInputErrMsg' : ''}`}>
                        Email is not valid
                    </span>
                    <br />
                    <label>Email</label>
                    <br />
                    <input
                        type='email'
                        name='email'
                        value={signUpFormData.email}
                        onChange={handleChange}
                        className={`form-control ${!emailInputState ? 'invalid' : ''}`}
                        minLength={defaults.EMAIL_MIN_LENGTH}
                        maxLength={defaults.EMAIL_MAX_LENGTH}
                    />
                </div>
                <div>
                    <button
                        type='submit'
                        className='game-btn-enabled signupSection--form-btn clickable'
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </button>
                </div>
                <div className='cust-text-13 signupsection--form-selectUser mt-4 mb-4' onClick={handleGoToDashboard}>
                    Already have a user? 
                    <Link to='/dashboard'> <span className='link clickable'>Go to Dashboard</span></Link>
                </div>
            </div>
            <div className='signupSection--form--line mx-auto'></div>
        </div>
    );
}

export default Signup;
