import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { signupFormValid, checkNameExists, emailValid } from '../../utils/formHelper';
import defaults from '../../utils/defaults';

import './signup.css';

const Signup = ({ handleUserSignedUp, handleGoToDashboard }) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [signUpFormData, setSignUpFormData] = useState({
        username: '',
        email: '',
        pong_single_player: {
            total: 0,
            win: 0,
            loss: 0
        },
        pong_multi_player: {
            total: 0,
            win: 0,
            loss: 0
        },
        memory_single_player: {
            total: 0,
            win: 0,
            loss: 0
        },
        memory_multi_player: {
            total: 0,
            win: 0,
            loss: 0
        }
    });
    const [usernameInputState, setUsernameInputState] = useState({
        value: true,
        isDuplicate: false
    });
    const [emailInputState, setEmailInputState] = useState(true);

    const handleChange = e => {
        setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                console.error("Name Exists")
                setUsernameInputState({ value: false, isDuplicate: true });
                return;
            }

            setUsernameInputState({ value: true, isDuplicate: false });
            setEmailInputState(true);

            const response = await axios.post(
                'http://localhost:8000/pong/users/',
                signUpFormData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Response:', response);

            handleUserSignedUp();
            navigate('/userprofile', { state: { userData: signUpFormData } }); // Navigate to user profile with signup data
            // handleGoToUserProfile();
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }
    };

    const handleGoToUserProfile = () => {
        if (signupFormValid(signUpFormData.username) && emailValid(signUpFormData.email)) {
            // window.location.href = '/userprofile';
            navigate('/userprofile');
        }
    };

    return (
        <div className='signupSection align-content-center'>
            <div className='signupSection--form mx-auto d-flex flex-column align-items-center'>
                <h3 className='mb-1'> {t('create user')} </h3>
                <div className='custom-input'>
                    <div className={`signupSection--form--error cust-text-13 ${usernameInputState.isDuplicate || !usernameInputState.value ? 'showInputErrMsg' : ''}`}>
                        {usernameInputState.isDuplicate ? 
                        <div className='signupErrDuplicateUser d-flex align-items-end mt-3'>
                            <span>
                                { t('username is already taken') }
                            </span>
                        </div>
                        :
                        <div className='signupErrList mt-3'>
                            <ul>
                                <li className='mb-2 mx-auto'>
                                    { t('username must be between 2 to 20 characters') }
                                </li>
                                <li className='mb-2 mx-auto'>
                                    { t('username must not have trailing or leading space') }
                                </li>
                                <li className='mb-2 mx-auto'>
                                    { t('username should contain only letters / numbers') }
                                </li>
                                <li className='mb-2 mx-auto'>
                                    { t('username should start with a letter') }
                                </li>
                            </ul>
                        </div>
                        }
                    </div>
                    <br />
                    <label>
                        {  t('username') }
                    </label>
                    <input
                        type='text'
                        name='username'
                        value={signUpFormData.username}
                        onChange={handleChange}
                        className={`form-control ${!usernameInputState.value ? 'invalid' : ''}`}
                        minLength={defaults.USERNAME_MIN_LENGTH}
                        maxLength={defaults.USERNAME_MAX_LENGTH}
                    />
                    <br />
                </div>
                <div className='custom-input'>
                    <span className={`signupSection--form--error cust-text-13 ${!emailInputState ? 'showInputErrMsg' : ''}`}>
                        { t('email is not valid') }
                    </span>
                    <br />
                    <label> { t('email') } </label>
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
                        {  t('signup') }
                    </button>
                </div>
                <div className='cust-text-13 signupsection--form-selectUser mt-4 mb-4' onClick={handleGoToDashboard}>
                    { t('already have a user') }?
                    <Link to='/dashboard'> <span className='customLink clickable'>{ t('go to Dashboard') }</span></Link>
                </div>
            </div>
            <div className='signupSection--form--line mx-auto'></div>
        </div>
    );
};

export default Signup;
