import { PlayerList, SelectedBar } from '../../components';
import './pongGamePlayerList.css';

const PongGamePlayerList = () => {
    return (
        <div className='pongGamePlayerList'>
            <PlayerList />
            <SelectedBar />
        </div>
    );
}

export default PongGamePlayerList;