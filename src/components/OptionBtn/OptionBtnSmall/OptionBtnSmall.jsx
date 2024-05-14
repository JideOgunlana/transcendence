
import '../optionBtn.css';

const OptionBtnSmall = ({option}) => {
    const handleClick = e => {
        console.log(e);
    }
    return (
        <div 
            className={`clickable optionBtnSmall ${'optionBtn-active'}`} 
            onClick={handleClick}
        >{option}</div>
    );
}

export default OptionBtnSmall;