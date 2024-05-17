
import './historyUser.css';
import {Player} from '../../components'

const RecentGames = () => {
    return (
        <div className='statsCard'>
            Last 5 games pong / Memory
        </div>
    );
}

const Ranking = () => {
    return (
        <div className='statsCard'>
            Ranking
        </div>
    );
}
const BestGame = () => {
    return (
        <div className='statsCard'>
            Best Game
        </div>
    );
}

const HistoryUser = () => {
    return (
        <div className='historyUser d-flex flex-column align-content-center align-items-center'>
            <h4>{'i18n.User History'}</h4>
            <div className='historyUser--stats mTop32' >
                <div className='historyUser--player'>
                    <Player />
                </div>
                <div className='historyUser--stats-grid'>
                    <RecentGames />
                    <RecentGames />
                    <Ranking />
                    <BestGame />

                </div>
            </div>
        </div>
    );
}

export default HistoryUser;