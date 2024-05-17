import { Link } from 'react-router-dom';
import './userprofile.css';
import userIcon from '../../assets/svg/user.svg';


const Userprofile = ({handleGoToDashboard}) => {
    
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
                    <span>{'data'}</span>
                </div>
                <div>
                    <span>Email: </span>
                    <span>{'data'}</span>
                </div>
            </div>
            <div 
                className='link cust-text-13 mTop16 clickable'
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