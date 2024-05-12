
import './header.css'
import transcendLogo from '../../assets/svg/transcend.svg';
import soundIcon from '../../assets/svg/sound.svg';
import languageIcon from '../../assets/svg/language.svg';

const Header = props => {
    return (
        <>
            <nav>
                <div className='left-nav-bar'>
                    <div className='transcend-logo'>
                        <img src={transcendLogo}/>
                    </div>
                    <div className='text-13'>Dashboard</div>
                </div>
                <div className='right-nav-bar'>
                    <div className='right-nav-bar--icons'>
                        <img src={languageIcon} />
                    </div>
                    <div className='right-nav-bar--icons'>
                       <img src={soundIcon} />
                    </div>
                    <div className='right-nav-bar--signup-btn text-13'>SignUp/In</div>
                </div>
            </nav>
        </>
    );
}

export default Header;