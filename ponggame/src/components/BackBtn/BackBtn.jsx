import { useTranslation } from "react-i18next";
import { backBtnIcon } from "../../assets";

const BackBtn = ({handleBackBtnClick}) => {

    const { t } = useTranslation();

    return (
        <div className="backBtn">
            <button 
                className='btn btn-secondary clickable d-flex align-items-center'
                onClick={handleBackBtnClick}>
                <img src={ backBtnIcon } alt="back" />
                <span>{ t('back') }</span>
            </button>
        </div>
    );
};

export default BackBtn;