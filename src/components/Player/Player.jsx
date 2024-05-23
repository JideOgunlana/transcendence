import './player.css';

const Player = ({ userImg, username, selected, onClick }) => {
    return (
        <div 
            className={`player d-flex flex-column justify-content-center align-items-center gap-2 ${selected ? 'selected' : ''}`}
            onClick={onClick} >
            <div className='player--img'>
                <img src={ userImg } alt={username} width='50' />
            </div>
            <div className='player--username'>
                <strong>{username}</strong>
            </div>
        </div>
    );
};

export default Player;
