import './historyAll.css';


const HistoryColumn = () => {
    return (
        <div className='flex-fill d-flex align-items-center justify-content-center historyAll--column mb-3 mt-3'>
            <div>
                <img src='' alt='data.img' />
            </div>
            <div>
                {'data.username'}
            </div>
            <div>
                {'data.no-of-wins'} wins 
            </div>
            <div>
                {'data.no-of-losses'} losses
            </div>
            <div>
                {'data.no-of-games'} played
            </div>
        </div>
    );
}


const HistoryAll = () => {
    return (
        <div className='historyAll d-flex justify-content-center'>
            <div className='historyAll-pong'>
                <h3>{'Pong i18n.History'}</h3>
                <HistoryColumn />
                <HistoryColumn />
            </div>
            <div className='historyAll-memory'>
                <h3 className='text-center'>{'Memory i18n.History'}</h3>
                <HistoryColumn />
                <HistoryColumn />
                <HistoryColumn />
                <HistoryColumn />
            </div>
        </div>
    );
}

export default HistoryAll;