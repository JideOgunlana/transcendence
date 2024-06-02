import { useTranslation } from "react-i18next";

const NextBtn = ({handleNextBtnClick}) => {

    const { t } = useTranslation();

    return (
        <div>
            <button 
                className='game-btn-enabled clickable'
                onClick={handleNextBtnClick}>
                { t('next') }
            </button>
        </div>
    );
};

export default NextBtn;