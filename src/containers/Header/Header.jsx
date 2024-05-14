
import './header.css'
import transcendLogo from '../../assets/svg/transcend.svg';
import soundIcon from '../../assets/svg/sound.svg';
import languageIcon from '../../assets/svg/language.svg';

const Header = ({handleSignup, handleLogoClick, handleGoToDashboard, resetDashboardStep}) => {
    return (
        <>
            <nav>
                <div className='left-nav-bar'>
                    <div
                        className='transcend-logo clickable'
                        onClick={handleLogoClick}
                    >
                        <img src={transcendLogo}/>
                    </div>
                    <div 
                        className='text-13 clickable linkDashboardActive'
                        onClick={() => {handleGoToDashboard(); resetDashboardStep(); }}
                    >Dashboard</div>
                </div>
                <div className='right-nav-bar'>
                    <div className='right-nav-bar--icons clickable'>
                        <img src={languageIcon} />
                    </div>
                    <div className='right-nav-bar--icons clickable'>
                       <img src={soundIcon} />
                    </div>
                    <button 
                        className='btn-primary right-nav-bar--signup-btn text-13 clickable'
                        onClick={handleSignup}
                    >
                            SignUp
                    </button>
                </div>
            </nav>
        </>
    );
}

export default Header;