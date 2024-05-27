
import './header.css'
import { transcendLogo, settingsIcon, navBarToggle } from '../../assets';


import { Link } from 'react-router-dom';

const Header = ({ handleSignup, handleLogoClick, resetDashboardStep }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                        <Link to='/'  onClick={handleLogoClick}> <img src={transcendLogo} className='clickable navbar-brand' /> </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <img src={ navBarToggle } />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item text-center">
                                <div className='linkDashboardActive nav-link'>
                                    <Link to="/dashboard" onClick={resetDashboardStep} className='clickable'>Dashboard</Link>
                                </div>
                            </li>
                            <li className="nav-item text-center">
                                <div className='linkDashboardActive nav-link'>
                                    <Link to="/history" onClick={resetDashboardStep} className='clickable'>History</Link>
                                </div>
                            </li>
                        </ul>
                        <div className=' d-flex align-items-center justify-content-center'>
                            <Link to='/settings' className='me-4'><img src={settingsIcon} /> </Link>
                            <Link to="/signup" className='game-btn-enabled right-nav-bar--signup-btn clickable me-4' onClick={handleSignup}>SignUp</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;


