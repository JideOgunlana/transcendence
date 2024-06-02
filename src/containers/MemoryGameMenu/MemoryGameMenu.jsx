
import { useTranslation } from 'react-i18next';
import { NextBtn, OptionBtn } from '../../components';
import './memoryGameMenu.css';


const MemoryGameMenu = ({handleNextBtnClick, handleMemoryOptionsChange, step}) => {

    const { t } = useTranslation();

    return (
        <div className='memoryGameMenu'>
            <h3 className='text-center mb-5'>Memory</h3>
            <h3 className='text-center mb-5'>{ t('game menu') }</h3>
            <div className='memoryGameMenu--card mx-auto justify-content-center align-items-center d-flex flex-column gap-5 p-4'>
                <div className='gameTheme'>
                    <div className='gameTheme-header'>
                        <h4 className=''>{ t('select theme')}</h4>
                    </div>
                    <div className='gameTheme-options d-flex justify-content-around'>
                        <OptionBtn
                            btnClass='optionBtnMedium'
                            handleMemoryOptionsChange={handleMemoryOptionsChange}
                            step={step}
                            option={'numbers'}
                            val={'numbers'}/>
                        <OptionBtn
                            btnClass='optionBtnMedium'
                            handleMemoryOptionsChange={handleMemoryOptionsChange}
                            step={step}
                            option={'icons'}
                            val={'icons'}/>
                    </div>
                </div>
                <div className="gameMode">
                    <div>
                        <h4>{ t('select mode') }</h4>
                    </div>
                    <div className='gameMode--options d-flex flex-column gap-4 align-items-center'>
                        <OptionBtn
                            btnClass='optionBtnLarge'
                            handleMemoryOptionsChange={handleMemoryOptionsChange}
                            step={step}
                            option={'singlePlayer'}
                            val={'single'} />
                        <OptionBtn
                            btnClass='optionBtnLarge'
                            handleMemoryOptionsChange={handleMemoryOptionsChange}
                            step={step}
                            option={'multiPlayer'}
                            val={'1v1'} />
                        <OptionBtn
                            btnClass='optionBtnLarge'
                            handleMemoryOptionsChange={handleMemoryOptionsChange}
                            step={step}
                            option={'tournament'}
                            val={'tournament'} />
                    </div>
                </div>
                <div className='gameGridSize'>
                    <div className='gameGridSize-header'>
                        <h4 className=''>{ t('select grid size') }</h4>
                    </div>
                    <div className='gameGridSize-options d-flex justify-content-around'>
                        <OptionBtn
                            btnClass='optionBtnMedium'
                            handleMemoryOptionsChange={handleMemoryOptionsChange}
                            step={step}
                            option={'4x4'}
                            val={'4x4'}/>
                        <OptionBtn
                            btnClass='optionBtnMedium'
                            handleMemoryOptionsChange={handleMemoryOptionsChange}
                            step={step}
                            option={'6x6'}
                            val={'6x6'}/>
                    </div>
                </div>
                <NextBtn handleNextBtnClick={handleNextBtnClick}/>
            </div>
        </div>
    );
}

export default MemoryGameMenu;