
import '../optionBtn.css';

const OptionBtnLarge = ({option}) => {
    return (
        <div
            className={`clickable optionBtnLarge ${'optionBtn-inactive'}`}
        >
            {option}
        </div>
    );
}

export default OptionBtnLarge;