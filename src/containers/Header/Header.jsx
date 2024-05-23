
import './header.css'
import transcendLogo from '../../assets/svg/transcend.svg';
import settingsIcon from '../../assets/svg/settings.svg';


import { Link } from 'react-router-dom';

const Header = ({ handleSignup, handleLogoClick, resetDashboardStep }) => {
    return (
        <nav className='d-flex align-items-center col-12 flex-wrap p-4 p-md-2'>
            <div className='left-nav-bar col-12 col-md-6 d-flex justify-content-center justify-content-md-start'>
                <div
                    className='d-flex align-items-end col-md-2 '
                    onClick={handleLogoClick}
                >
                    <Link to='/' > <img src={transcendLogo} className='clickable'/> </Link>
                </div>
                <div className='cust-text-13 linkDashboardActive col-md-2 '>
                    <Link to="/dashboard" onClick={resetDashboardStep} className='clickable'>Dashboard</Link>
                </div>
                <div className='cust-text-13 linkDashboardActive col-md-2 '>
                    <Link to="/history" onClick={resetDashboardStep} className='clickable'>History</Link>
                </div>
            </div>
            <div className='right-nav-bar col-12 col-md-6 d-flex flex-wrap justify-content-center justify-content-md-end'>
                <div className='right-nav-bar--icons clickable mt-2 mt-md-0 '>
                    <Link to='/settings' ><img src={settingsIcon} /> </Link>
                </div>
                <div className='right-nav-bar--button mt-2 mt-md-0 '>
                    <Link to="/signup" className='game-btn-enabled right-nav-bar--signup-btn cust-text-13 clickable me-4' onClick={handleSignup}>SignUp</Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;


