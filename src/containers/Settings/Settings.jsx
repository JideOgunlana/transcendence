// Settings.js
import './settings.css';
import soundIcon from '../../assets/svg/sound.svg';
import languageIcon from '../../assets/svg/language.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import engIcon from '../../assets/svg/eng.svg';
import deIcon from '../../assets/svg/de.svg';
import espIcon from '../../assets/svg/esp.svg';
import soundOnIcon from '../../assets/svg/soundOn.svg';
import soundOffIcon from '../../assets/svg/soundOff.svg';

const SettingsBtn = ({ btnClass, isActive, option, val, handleSettingsClick }) => {
    return (
        <div 
            className={` clickable ${btnClass} ${isActive ? 'optionBtn-active' : 'optionBtn-inactive'}`}
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
            <div className='settings-card d-flex rounded col-12 flex-wrap'>
                <div className="col-12">
                    <div className='mb-3'>
                        <img src={soundIcon} alt="Sound Icon" /> &nbsp; {t('Sound')}
                    </div>
                    <div className='mb-3'>
                        <div className='d-flex gap-4 align-items-center mb-2'>
                            <SettingsBtn
                                btnClass='optionBtnLarge'
                                isActive={sound === 'ON'}
                                handleSettingsClick={handleSettingsClick}
                                option='ON'
                                val={t('ON')}
                            />
                            <img src={soundOnIcon} style={ sound === 'ON' ? {'backgroundColor' : '#4CAF50 ',}: {} } className='rounded'/>
                        </div>
                        <div className='d-flex gap-4 align-items-center mb-2'>
                            <SettingsBtn 
                                btnClass='optionBtnLarge'
                                isActive={sound === 'OFF'}
                                handleSettingsClick={handleSettingsClick}
                                option='OFF'
                                val={t('OFF')}
                            />
                            <img src={soundOffIcon} style={ sound === 'OFF' ? {'backgroundColor' : '#F22C3D',}: {} } className='rounded'/>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className='mt-3 mb-3'>
                        <img src={languageIcon} alt="Language Icon" /> &nbsp; {t('Language')}
                    </div>
                    <div className='mb-3'>
                        <div className='d-flex gap-4 align-items-center mb-2'>
                            <SettingsBtn
                                btnClass='optionBtnLarge'
                                isActive={lang === 'en'}
                                handleSettingsClick={handleSettingsClick}
                                option='en'
                                val={t('English')}
                            />
                            <img src={engIcon} />
                        </div>
                        <div className='d-flex gap-4 align-items-center mb-2'>
                            <SettingsBtn
                                btnClass='optionBtnLarge'
                                isActive={lang === 'de'}
                                handleSettingsClick={handleSettingsClick}
                                option='de'
                                val={t('German')}
                            />
                            <img src={deIcon} />
                        </div>
                        <div className='d-flex gap-4 align-items-center mb-2'>
                            <SettingsBtn
                                btnClass='optionBtnLarge'
                                isActive={lang === 'es'}
                                handleSettingsClick={handleSettingsClick}
                                option='es'
                                val={t('Spanish')}
                            />
                            <img src={espIcon} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
