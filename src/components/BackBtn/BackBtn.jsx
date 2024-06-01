import { backBtnIcon } from "../../assets";

const BackBtn = ({handleBackBtnClick}) => {
    return (
        <div className="backBtn">
            <button 
                className='btn btn-primary clickable'
                onClick={handleBackBtnClick}>
                <img src={ backBtnIcon } alt="back" />
            </button>
        </div>
    );
};

export default BackBtn;