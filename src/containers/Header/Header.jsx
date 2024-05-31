
import { useState } from 'react';
import { transcendLogo, settingsIcon, navBarToggle } from '../../assets';
import './header.css';


import { Link } from 'react-router-dom';

const Header = ({ handleSignup, handleLogoClick, resetDashboardStep }) => {

    const [linkActive, setLinkActive] = useState([ false, false ]);
    const handleActive = (tab) => {
        tab === 'dashboard' ? setLinkActive([ true, false ])
            :
            tab === 'history' ? setLinkActive([ false, true ])
            :
            setLinkActive([false, false]);
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                        <Link to='/'  onClick={ () => { handleLogoClick,handleActive('') }}> <img src={transcendLogo} className='clickable navbar-brand' /> </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <img src={ navBarToggle } />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item text-center">
                                <div className={ `customNavLink nav-link ${ linkActive[0] ? 'active' : '' } ` }
                                    onClick={ () => { handleActive('dashboard') } }
                                >
                                    <Link to="/dashboard" 
                                        onClick={resetDashboardStep} 
                                        className='clickable'>
                                            Dashboard
                                    </Link>
                                </div>
                            </li>
                            <li className="nav-item text-center">
                                <div className={ `customNavLink nav-link ${ linkActive[1] ? 'active' : '' } ` }
                                    onClick= { () => { handleActive('history') } }
                                >
                                    <Link to="/history" 
                                        onClick={resetDashboardStep} 
                                        className='clickable'>
                                            History
                                    </Link>
                                </div>
                            </li>
                        </ul>
                        <div className=' d-flex align-items-center justify-content-center'>
                            <Link to='/settings' 
                                className='me-4'><img src={settingsIcon} 
                                onClick={ ()=> {handleActive('')} }/>
                            </Link>
                            <Link to="/signup" 
                                className='game-btn-enabled right-nav-bar--signup-btn clickable me-4' 
                                onClick={ () => { handleSignup, handleActive('') } }>
                                    SignUp
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;


