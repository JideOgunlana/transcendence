import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userIcon } from '../../assets/';
import { Unauthorized } from '../../containers'
import './userprofile.css';

const Userprofile = ({ handleGoToDashboard }) => {
    const location = useLocation();
    const userData = location.state && location.state.userData;

    if (!userData) {
        // Render the Unauthorized component if userData is not defined
        return (
            <div className="unauthorized-container">
                <Unauthorized />
            </div>
        );
    }

    return (
        <div className='userProfileSection align-content-center'>
            <div className='text-center mb-3 text-success'>
                User registration successful
            </div>
            <div className='userProfileSection--card p-4 text-center mx-auto d-flex flex-column justify-content-center gap-4'>
                <div className='userProfileSection--card--img'>
                    <img src={userIcon} className='img-fluid'/>
                </div>
                <div>
                    <span>Username: </span>
                    <span>{userData.username}</span>
                </div>
                <div>
                    <span>Email: </span>
                    <span>{userData.email}</span>
                </div>
            </div>
            <div 
                className='link cust-text-13 mt-3 clickable'
                onClick={handleGoToDashboard}
            >
                <Link to='/dashboard'>
                <div className='text-center'>Go to Dashboard</div>
                </Link>
            </div>
        </div>
    );
}

export default Userprofile;
