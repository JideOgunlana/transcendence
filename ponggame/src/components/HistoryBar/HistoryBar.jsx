import './historyBar.css';
import { userIcon, topPlayersIcon, mostPlaysIcon, head2HeadIcon } from '../../assets/';

const TopPlayers = () => {
    return (
        <>
            <div className='list-player'>
                <div>
                    <img src={userIcon} width={'40px'} />
                    <div>
                        {'data.username'}
                    </div>
                </div>
                <div>
                    {'data.wins'}
                </div>
            </div>
        </>
    );
}

const MostPlays = () => {
    return (
        <>
            <div className='list-player'>
                <div>
                    <img src={userIcon} width={'40px'} />
                    <div>
                        {'data.username'}
                    </div>
                </div>
                <div>
                    {'data.wins'}
                </div>
            </div>
        </>
    );
}

const Head2Head = () => {
    return (
        <>
            <div>
                <div>
                    <img src={userIcon} width={'40px'} />
                    <div>
                        {'data.wins'}
                    </div>
                </div>
                <div>
                    {'data.username'}
                </div>
            </div>
        </>
    );
}



const HistoryBar = ({step}) => {
    return (
        <div className='historyBar p-3 d-grid gap-3'>
            <div className='historyBar--title'>
                <h4 className='mb-0'>{'History'}</h4>
            </div>
            <div className='topPlayers p-3'>
                <h5>
                    <img src={topPlayersIcon} /> {'Top Players'}
                </h5>
                <div className='topPlayers--list'>
                    <TopPlayers /> {/*   **To-Do logic showing top players or -- No data -- */}
                </div>
            </div>
            <div className='mostPlays p-3'>
                <h5>
                    <img src={mostPlaysIcon} /> {'Most Plays'}
                </h5>
                <div className='mostPlays--list'>
                    <MostPlays /> {/*   **To-Do logic showing Players with most plays or -- No data -- */}
                </div>
            </div>
            
            <div className='head2Head p-3'>
                <h5>
                    <img src={head2HeadIcon} /> {'Head-2-Head'}
                </h5>
                <div className="head2Head--players">
                    {
                        step.stepNumber !== 0 || 
                        step.pong.mode !== 'singlePlayer' ||
                        step.pong.mode !== 'multiPlayer' ||
                        step.memory.mode !== 'tournament'
                        ?
                        `i18n No Data Available`
                        : 
                        <Head2Head /> 
                    
                        // ** To-Do logic showing head-2-head or -- No data -- 
                        // ** Check for head 2 head only when there are 2 players
                        // ** For more than 2 players H-2-H is Unavailable
                    
                    }
                </div>
            </div>
            <div className='fullHistory align-items-center'>
                <button className='game-btn-enabled'>{'i18n. Full History'}</button>
            </div>
        </div>
    );
}

export default HistoryBar;