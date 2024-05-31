import { PlayerList, StartGameBar } from '../../components';

const MemoryGamePlayerList = ({ step, setStep }) => {

    return (
        <div className='memoryGamePlayerList d-flex'>
            <PlayerList step={step} setStep={setStep} />
            <div className='sideBar--startGame mt-5 flex-fill'>
                <StartGameBar step={step} setStep={setStep} />
            </div>
        </div>
    );
};

export default MemoryGamePlayerList;
