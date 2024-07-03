
import { useTranslation } from 'react-i18next'; 
import { NextBtn, OptionBtn } from '../../components';
import { pingPongIcon } from '../../assets';

import './pongGameMenu.css';


const PongGameMenu = ({handleNextBtnClick, handlePongOptionsChange, step}) => {

    const { t } = useTranslation();

    return (
        <div className='pongGameMenu'>
            <h3 className='d-flex align-items-center justify-content-center mb-5    '>
                <img src={pingPongIcon} alt='Pong' />&nbsp; Pong
            </h3>
            <h3 className='text-center mb-5'>{ t('game menu') }</h3>
            <div className='pongGameMenu--card mx-auto justify-content-center align-items-center d-flex flex-column gap-5 p-4'>
                <div className='gameTheme'>
                    <div className='gameTheme-header'>
                        <h4 className=''>{ t('select theme') }</h4>
                    </div>
                    <div className='gameTheme-options d-flex justify-content-around'>
                        {/* <OptionBtn 
                            btnClass='optionBtnMedium' 
                            handlePongOptionsChange={handlePongOptionsChange} 
                            step={step} 
                            option={'2D'} 
                            val={'2D'}/> */}
                        <OptionBtn 
                            btnClass='optionBtnLarge' 
                            handlePongOptionsChange={handlePongOptionsChange} 
                            step={step} 
                            option={'3D'} 
                            val={'3D'}/>
                    </div>
                </div>
                <div className="gameMode">
                    <div>
                        <h4>{ t('select mode') }</h4>
                    </div>
                    <div className='gameMode--options d-flex flex-column gap-4 align-items-center'>
                        <OptionBtn 
                            btnClass='optionBtnLarge' 
                            handlePongOptionsChange={handlePongOptionsChange} 
                            step={step} option={'singlePlayer'}
                            val={'single'} />
                        <OptionBtn 
                            btnClass='optionBtnLarge' 
                            handlePongOptionsChange={handlePongOptionsChange} 
                            step={step} option={'multiPlayer'}
                            val={'1v1'}/>
                        <OptionBtn 
                            btnClass='optionBtnLarge' 
                            handlePongOptionsChange={handlePongOptionsChange} 
                            step={step} option={'tournament'}
                            val={'tournament'}/>
                    </div>
                </div>
                <NextBtn handleNextBtnClick={handleNextBtnClick}/>
            </div>
        </div>
    );
}

export default PongGameMenu;