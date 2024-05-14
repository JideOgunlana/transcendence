import './selectedBar.css';
import topPlayersIcon from '../../assets/svg/historyTopPlayers.svg';
import mostPlaysIcon from '../../assets/svg/historyMostPlays.svg';
import head2HeadIcon from '../../assets/svg/historyHead2Head.svg';
import userIcon from '../../assets/svg/user.svg';
import {Player} from '../../components'


const SelectedBar = () => {
    return (
        <div className='selectedBar'>
            <div className='selectedBar--title'>
                <h4 className='mNoMarginBottom'>{'i18n.pong - data.type'}</h4>
                <h5 className='mTop16'>{'* data.requirements'}</h5>
            </div>
            <div className='selectedBar--picks'>
                <div className='selectedBar--heading'>{'i18n.Selectd Users'}</div>
                { /* A loop that adds all players selectd*/}
                {
                    <Player />  
                }
            </div>
            <div className='startPong'>
                <button className='btn-primary'>{'i18n.Start'}</button>
            </div>
        </div>
    );
}

export default SelectedBar;