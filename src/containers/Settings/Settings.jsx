// Settings.js
import './settings.css';
import soundIcon from '../../assets/svg/sound.svg';
import languageIcon from '../../assets/svg/language.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SettingsBtn = ({ btnClass, isActive, option, val, handleSettingsClick }) => {
    return (
        <div 
            className={`mb-3 clickable ${btnClass} ${isActive ? 'optionBtn-active' : 'optionBtn-inactive'}`}
            onClick={() => handleSettingsClick(option)}
            id={option}>
                {val}
        </div>
    );
}

const Settings = ({lang, setLang, sound, setSound}) => {
    const { t, i18n } = useTranslation();


    const handleSettingsClick = (option) => {
        if (['en', 'de', 'es'].includes(option)) {
            setLang(option);
            i18n.changeLanguage(option);
        } else if (['ON', 'OFF'].includes(option)) {
            setSound(option);
        }
    }

    return (
        <div className='settings d-flex flex-wrap flex-column justify-content-center align-items-center'>
            <div className='settings-card d-flex col-12 flex-wrap'>
                <div className="col-12">
                    <div>
                        <img src={soundIcon} alt="Sound Icon" /> &nbsp; {t('Sound')}
                    </div>
                    <div>
                        <SettingsBtn
                            btnClass=''
                            isActive={sound === 'ON'}
                            handleSettingsClick={handleSettingsClick}
                            option='ON'
                            val={t('ON')}
                        />
                        <SettingsBtn 
                            btnClass=''
                            isActive={sound === 'OFF'}
                            handleSettingsClick={handleSettingsClick}
                            option='OFF'
                            val={t('OFF')}
                        />
                    </div>
                </div>
                <div className="col-12">
                    <div>
                        <img src={languageIcon} alt="Language Icon" /> &nbsp; {t('Language')}
                    </div>
                    <div>
                        <SettingsBtn
                            btnClass=''
                            isActive={lang === 'en'}
                            handleSettingsClick={handleSettingsClick}
                            option='en'
                            val={t('English')}
                        />
                        <SettingsBtn
                            btnClass=''
                            isActive={lang === 'de'}
                            handleSettingsClick={handleSettingsClick}
                            option='de'
                            val={t('German')}
                        />
                        <SettingsBtn
                            btnClass=''
                            isActive={lang === 'es'}
                            handleSettingsClick={handleSettingsClick}
                            option='es'
                            val={t('Spanish')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
