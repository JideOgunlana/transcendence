import './pongGameMenu.css';

import { NextBtn } from '../../components';
import { OptionBtnMedium, OptionBtnLarge } from '../../components/OptionBtn';
import { useState } from 'react';




const PongGameMenu = ({handleNextBtnClick}) => {


    return (
        <div className='pongGameMenu'>
            <div className='pongGameMenu--card'>
                <div className='gameTheme'>
                    <div className='gameTheme-header'>
                        <h4 className=''>{'i18n.selectTheme'}</h4>
                    </div>
                    <div className='gameTheme-options'>
                        <OptionBtnMedium 
                            option={'2D'}
                        />
                        <OptionBtnMedium option={'3D'}/>
                    </div>
                </div>
                <div className="gameMode">
                    <div>
                        <h4>{'i18n.gameMode'}</h4>
                    </div>
                    <div className='gameMode--options'>
                        <OptionBtnLarge option={'i18n.Single'} />
                        <OptionBtnLarge option={'i18n.multiplayer'} />
                        <OptionBtnLarge option={'i18n.tournament'} />
                    </div>
                </div>
                <NextBtn handleNextBtnClick={handleNextBtnClick}/>
            </div>
        </div>
    );
}

export default PongGameMenu;