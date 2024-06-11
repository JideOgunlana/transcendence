import { PlayerList, StartGameBar } from '../../components';

const PongGamePlayerList = ({ step, setStep }) => {

    return (
        <div className='pongGamePlayerList d-flex'>
            <PlayerList step={step} setStep={setStep} />
            <div className='sideBar--startGame mt-5 flex-fill'>
                <StartGameBar step={step} setStep={setStep} />
            </div>
        </div>
    );
};

export default PongGamePlayerList;
