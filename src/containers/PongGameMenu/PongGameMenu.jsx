import './pongGameMenu.css';

import { NextBtn, OptionBtn } from '../../components';
import { useState } from 'react';




const PongGameMenu = ({handleNextBtnClick, handlePongOptionsChange, step}) => {


    return (
        <div className='pongGameMenu'>
            <div className='pongGameMenu--card mx-auto justify-content-center align-items-center d-flex flex-column gap-5 p-4'>
                <div className='gameTheme'>
                    <div className='gameTheme-header'>
                        <h4 className=''>{'i18n.selectTheme'}</h4>
                    </div>
                    <div className='gameTheme-options d-flex justify-content-around'>
                        <OptionBtn btnClass='optionBtnMedium' handlePongOptionsChange={handlePongOptionsChange} step={step} option={'2D'} val={'2D'}/>
                        <OptionBtn btnClass='optionBtnMedium' handlePongOptionsChange={handlePongOptionsChange} step={step} option={'3D'} val={'3D'}/>
                    </div>
                </div>
                <div className="gameMode">
                    <div>
                        <h4>{'i18n.gameMode'}</h4>
                    </div>
                    <div className='gameMode--options d-flex flex-column gap-4 align-items-center'>
                        <OptionBtn btnClass='optionBtnLarge' handlePongOptionsChange={handlePongOptionsChange} step={step} option={'singlePlayer'} val={'i18n.Single'} />
                        <OptionBtn btnClass='optionBtnLarge' handlePongOptionsChange={handlePongOptionsChange} step={step} option={'multiPlayer'} val={'i18n.multiplayer'}/>
                        <OptionBtn btnClass='optionBtnLarge' handlePongOptionsChange={handlePongOptionsChange} step={step} option={'tournament'} val={'i18n.tournament'}/>
                    </div>
                </div>
                <NextBtn handleNextBtnClick={handleNextBtnClick}/>
            </div>
        </div>
    );
}

export default PongGameMenu;