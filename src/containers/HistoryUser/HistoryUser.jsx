
import './historyUser.css';
import {Player} from '../../components'

const WinLoss = () => {
    return (
        <div className='statsCard'>
            Win Loss Ratio Graph Pong
        </div>
    );
}

const TotalGames = () => {
    return (
        <div className='statsCard'>
            Win Loss Ratio Graph Memory
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
        <div className='historyUser'>
            <h4>{'i18n.User History'}</h4>
            <div className='historyUser--stats' >
                <Player />
                <div className='historyUser--stats-grid'>
                    <WinLoss />
                    <TotalGames />
                    <Ranking />
                    <BestGame />

                </div>
            </div>
        </div>
    );
}

export default HistoryUser;