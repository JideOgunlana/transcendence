import './userprofile.css';
import userIcon from '../../assets/svg/user.svg';


const Userprofile = ({handleGoToDashboard}) => {
    
    return (
        <div className='userProfileSection'>
            <div className='userProfileSection--card'>
                <div className='userProfileSection--card--img'>
                    <img src={userIcon} />
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
                className='link text-13 mTop16 clickable'
                onClick={handleGoToDashboard}
            >
                <span>Go to Dashboard</span>
            </div>
        </div>
    );
}

export default Userprofile;