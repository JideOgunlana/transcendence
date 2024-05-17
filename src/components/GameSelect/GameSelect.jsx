import './gameSelect.css';
import pong2D from '../../assets/svg/pong2D.svg';
import memory from '../../assets/svg/memory.svg';

import React, {useState} from 'react';


const GameSelect = ({handlePongOptionsChange, handleMemoryOptionsChange}) => {

    const [activeTab, setActiveTab] = useState("pong");
    
    const selectGameTab = (e) => {
        const tabName = e.target.innerText.toLowerCase();
        setActiveTab(tabName);
        if (tabName === "pong") {
            handlePongOptionsChange({ selected: true });
            handleMemoryOptionsChange({ selected: false });
        } else  {
            handlePongOptionsChange({ selected: false });
            handleMemoryOptionsChange({ selected: true });
        }
    }

    return (
        <>
            <div className='gameSelect d-flex flex-column align-items-center gap-5'>
                <div 
                    className='gameSelect--tabs clickable d-flex col-4 justify-content-center'
                    onClick={selectGameTab} >
                    <div
                        className=
                        {
                            `col-12 col-md-4 gameSelect--tabs--pong ${activeTab === 'pong' ? 'tabActive': 'tabInactive'}`
                        }>
                        <h4 className='mb-3 text-center'>
                            Pong
                        </h4>
                    </div>
                    <div
                        className=
                        {
                            `col-12 col-md-4 gameSelect--tabs--pong ${activeTab === 'memory' ? 'tabActive': 'tabInactive'}`
                        }>
                        <h4 className='text-center'>
                            Memory
                        </h4>
                    </div>
                </div>
                <div className='gameSelect--gameImg'>
                    {
                        activeTab === 'pong' ? 
                        <img src={pong2D} className='img-fluid' /> 
                        : <img src={memory} className='img-fluid' />
                    }
                </div>
            </div>
        </>
    );
}

export default GameSelect;