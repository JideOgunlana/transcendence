
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { transcendLogo, githubIcon } from '../../assets';
import './footer.css';

const Footer = () => {

    const { t } = useTranslation();
    const location = useLocation();
    const [showProfile, setShowProfile] = useState(false);
    const [showFooter, setShowFooter] = useState(false);


    useEffect(() => {
        location.pathname === '/' ? setShowProfile(true) : setShowProfile(false)

        location.pathname === '/dashboard/pong'
            || location.pathname == '/dashboard/memory'
                ? setShowFooter(false)
                    : setShowFooter(true);
    }, [location])

    return (
        <>
            {
                showFooter &&
                <footer className="d-flex flex-column justify-content-center align-items-center gap-1 p-4">
                    <div className='mb-2 d-flex align-items-center'>
                        <img src={transcendLogo} className='logoTranscendence' />
                    </div>
                    <div className='cust-text-13 d-flex align-items-center'>
                        <div><a href='https://github.com/JideOgunlana/transcendence' target="_blank" rel="noopener noreferrer"> <img src={githubIcon} /> </a></div>
                        <span className='ms-4'>
                            😎 {t('team')} T*B*D*S
                        </span>
                    </div>
                    <>
                        {
                            showProfile &&
                            <div className='team-profile row cust-text-13'>
                                <a href="https://github.com/TaleaX" target="_blank" rel="noopener noreferrer" className='col-12 col-md-3 text-center p-2'>@Tdehne</a>
                                <a href="https://github.com/JideOgunlana" target="_blank" rel="noopener noreferrer" className='col-12 col-md-3 text-center p-2'>@Bogunlan</a>
                                <a href="https://github.com/dantonik" target="_blank" rel="noopener noreferrer" className='col-12 col-md-3 text-center p-2'>@Dantonik</a>
                                <a href="https://github.com/Sergi0Garcia" target="_blank" rel="noopener noreferrer" className='col-12 col-md-3 text-center p-2'>@Segarcia</a>
                            </div>
                        }
                    </>
                    <div className='cust-text-13 '>
                        &copy; 2024
                    </div>
                </footer>
            }
        </>
    )
}

export default Footer;