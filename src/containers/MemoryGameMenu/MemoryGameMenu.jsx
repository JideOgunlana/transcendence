import './memoryGameMenu.css';

import { NextBtn, OptionBtn } from '../../components';
import { useState } from 'react';




const MemoryGameMenu = ({handleNextBtnClick, handleMemoryOptionsChange, step}) => {
    return (
        <div className='memoryGameMenu'>
            <h3 className='text-center mb-5'>Memory Menu</h3>
            <div className='memoryGameMenu--card mx-auto justify-content-center align-items-center d-flex flex-column gap-5 p-4'>
                <div className='gameTheme'>
                    <div className='gameTheme-header'>
                        <h4 className=''>{'i18n.selectTheme'}</h4>
                    </div>
                    <div className='gameTheme-options d-flex justify-content-around'>
                        <OptionBtn btnClass='optionBtnMedium' handleMemoryOptionsChange={handleMemoryOptionsChange} step={step} option={'numbers'} val={'Numbers'}/>
                        <OptionBtn btnClass='optionBtnMedium' handleMemoryOptionsChange={handleMemoryOptionsChange} step={step} option={'icons'} val={'Icons'}/>
                    </div>
                </div>
                <div className="gameMode">
                    <div>
                        <h4>{'i18n.gameMode'}</h4>
                    </div>
                    <div className='gameMode--options d-flex flex-column gap-4 align-items-center'>
                        <OptionBtn btnClass='optionBtnLarge' handleMemoryOptionsChange={handleMemoryOptionsChange} step={step} option={'singlePlayer'} val={'i18n.SinglePlayer'} />
                        <OptionBtn btnClass='optionBtnLarge' handleMemoryOptionsChange={handleMemoryOptionsChange} step={step} option={'multiPlayer'} val={'i18n.multiPlayer'} />
                        <OptionBtn btnClass='optionBtnLarge' handleMemoryOptionsChange={handleMemoryOptionsChange} step={step} option={'tournament'} val={'i18n.tournament'}/>
                    </div>
                </div>
                <div className='gameGridSize'>
                    <div className='gameGridSize-header'>
                        <h4 className=''>{'i18n.selectTheme'}</h4>
                    </div>
                    <div className='gameGridSize-options d-flex justify-content-around'>
                        <OptionBtn btnClass='optionBtnMedium' handleMemoryOptionsChange={handleMemoryOptionsChange} step={step} option={'4x4'} val={'4x4'}/>
                        <OptionBtn btnClass='optionBtnMedium' handleMemoryOptionsChange={handleMemoryOptionsChange} step={step} option={'6x6'} val={'6x6'}/>
                    </div>
                </div>
                <NextBtn handleNextBtnClick={handleNextBtnClick}/>
            </div>
        </div>
    );
}

export default MemoryGameMenu;