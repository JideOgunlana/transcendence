import './playerList.css';
import {Player} from '../../components'

const PlayerList = () => {
    return (
        <div className='playerList'>
            <div className='playerList--heading'>
                <h3>{'i18n.Player List'}</h3>
            </div>
            <div className='playerList--info'>
                <h4>
                    {'i18n.*Click on a user to select or unselect'}
                </h4>
            </div>
            <div className='playerList--players'>
                <Player />
                <Player />
                <Player />
                <Player />
                <Player />
                <Player />
                <Player />
                <Player />
            </div>
        </div>
    );
}

export default PlayerList;