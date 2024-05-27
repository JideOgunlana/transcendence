

const BackBtn = ({handleBackBtnClick}) => {
    return (
        <div>
            <button 
                className='btn btn-primary clickable'
                onClick={handleBackBtnClick}
            >
                Back
            </button>
        </div>
    );
};

export default BackBtn;