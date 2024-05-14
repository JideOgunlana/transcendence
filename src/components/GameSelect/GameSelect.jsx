import './gameSelect.css';
import pong2D from '../../assets/svg/pong2D.svg';
import memory from '../../assets/svg/memory.svg';

import React, {useState} from 'react';


const GameSelect = () => {

    const [activeTab, setActiveTab] = useState("pong");

    const selectGameTab = (e) => {
        (e.target.innerText.toLowerCase().includes("pong")) ? 
                        setActiveTab("pong") 
                        : 
                        setActiveTab("memory");
    }

    return (
        <>
            <div className='gameSelect'>
                <div 
                    className='gameSelect--tabs clickable'
                    onClick={selectGameTab} 
                >
                    <div
                        className=
                        {
                            `gameSelect--tabs--pong ${activeTab === 'pong' ? 'tabActive': 'tabInactive'}`
                        }
                    >
                        <h4>
                            Pong
                        </h4>
                        <div className=''></div>
                    </div>
                    <div
                        className=
                        {
                            `gameSelect--tabs--pong ${activeTab === 'memory' ? 'tabActive': 'tabInactive'}`
                        }
                    >
                        <h4>
                            Memory
                        </h4>
                        <div className=''></div>
                    </div>
                </div>
                <div className='gameSelect--gameImg'>
                    {
                        activeTab === 'pong' ? <img src={pong2D} /> : <img src={memory} />
                    }
                </div>
            </div>
        </>
    );
}

export default GameSelect;