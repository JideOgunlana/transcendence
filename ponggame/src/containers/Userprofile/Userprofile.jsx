import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Unauthorized } from '../../containers'
import { userIcon } from '../../assets/';
import './userprofile.css';
import { useTranslation } from 'react-i18next';

const Userprofile = ({ handleGoToDashboard }) => {

    const { t } = useTranslation();
    const location = useLocation();
    const userData = location.state && location.state.userData;

    if (!userData) {
        return (
            <div className="unauthorized-container align-content-center">
                <Unauthorized />
            </div>
        );
    }

    return (
        <div className='userProfileSection align-content-center'>
            <div className='text-center mb-3 text-success'>
                { t('user registration successful') }
            </div>
            <div className='userProfileSection--card p-4 text-center mx-auto d-flex flex-column justify-content-center gap-4'>
                <div className='userProfileSection--card--img'>
                    <img src={userIcon} className='img-fluid'/>
                </div>
                <div>
                    <span>{ t('username') }: </span>
                    <span>{userData.username}</span>
                </div>
                <div>
                    <span> { t('email') }: </span>
                    <span>{userData.email}</span>
                </div>
            </div>
            <div 
                className='customLink cust-text-13 mt-3 clickable'
                onClick={handleGoToDashboard}>
                <Link to='/dashboard'>
                    <div className='text-center'>{ t('go to dashboard') }</div>
                </Link>
            </div>
        </div>
    );
}

export default Userprofile;
