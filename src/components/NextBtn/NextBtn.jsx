

const NextBtn = ({handleNextBtnClick}) => {
    return (
        <div>
            <button 
                className='game-btn-enabled clickable'
                onClick={handleNextBtnClick}    
            >
                Next
            </button>
        </div>
    );
};

export default NextBtn;