import './signup.css';
import React, {useState} from 'react';
import axios from 'axios';
import {createPost, getUsers} from '../../__tests__/api';
import { signupFormValid, checkNameExists, emailValid } from '../../utils/helper';

const Signup = ({handleUserSignedUp, handleGoToDashboard}) => {
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
        setSignUpFormData({...signUpFormData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault();

        // resets the input state
        setUsernameInputState({value: true, isDuplicate: false});
        setEmailInputState(true);

        if (!signupFormValid(signUpFormData.username)) {
            setUsernameInputState({value: false, isDuplicate: false});
            return ;
        }

        if (!emailValid(signUpFormData.email)) {
            console.log("Email is not Valid");
            setEmailInputState(false);
            return ;
        }
        try {
            const nameExists = await checkNameExists(signUpFormData.username);
            if (nameExists) {
                console.log('Username is already taken');
                setUsernameInputState({value: false, isDuplicate: true});
                return;
            }
            setUsernameInputState({value: true, isDuplicate: false});
            setEmailInputState(true);
            // const response = await axios.post('');
            const response = await createPost(signUpFormData); // stubbed line for testing without Django backend
            console.log('Response:  ', response);

            
            // Display User Profile after successful login
            handleUserSignedUp();
        } catch(error) {
            console.error('Error: ', error);
        }
    }

    return (
        <div className='signupSection'>
            <div className='signupSection--form'>
                <h3>
                    Create an account
                </h3>
                <div>
                    <label>Username</label>
                    <br />
                    <span 
                        className={`signupSection--form--error text-13 ${(usernameInputState.isDuplicate || !usernameInputState.value) ? 'showInputErrMsg' : ''}`}
                    >
                           { usernameInputState.isDuplicate ? 'username is already taken' : 'username must be between 2 to 20 characters' }
                    </span>
                    <br />
                    <input  
                        type='text' 
                        name='username'
                        value={signUpFormData.username}
                        onChange={handleChange}
                        className={!usernameInputState.value ? 'invalid' : '' }
                    />
                    <br />
                </div>
                <div>
                    <label>Email</label>
                    <br />
                    <span 
                        className={`signupSection--form--error text-13 ${!emailInputState ? 'showInputErrMsg': ''} `}
                    >
                        Email is not valid
                    </span>
                    <br />
                    <input  
                        type='email' 
                        name='email'
                        value={signUpFormData.email}
                        onChange={handleChange}
                        className={!emailInputState ? 'invalid' : ''}
                    />
                </div>
                <div >
                    <button 
                        className='btn-primary signupSection--form-btn clickable' 
                        onClick={handleSubmit}>
                            Sign Up 
                    </button>
                </div>
                <div 
                    className='text-13 signupsection--form-selectUser'
                    onClick={handleGoToDashboard}
                >
                    Already have an accout? <span className='link clickable'>Go to Dashboard</span>
                </div>
            </div>
            <div className='signupSection--form--line'></div>
        </div>
    );
}

export default Signup;