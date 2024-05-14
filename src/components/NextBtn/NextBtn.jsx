

const NextBtn = ({handleNextBtnClick}) => {
    return (
        <div>
            <button 
                className='btn-primary clickable'
                onClick={handleNextBtnClick}    
            >
                Next
            </button>
        </div>
    );
};

export default NextBtn;