import './player.css';

const Player = () => {
    return (
        <div className='player'>
            <div className='player--img'>
                <img src={''} alt='data.profile-image' />
            </div>
            <div className='player--username'>
                {
                    'data.username'
                }
            </div>
            
        </div>
    );
}

export default Player;