
import '../optionBtn.css';

const OptionBtnMedium = ({option, btnMedActive}) => {
    const handleClick = e => {
        console.log(e);
    }
    return (
        <div 
            className={`clickable optionBtnMedium ${'optionBtn-active'}`} 
            onClick={handleClick}
        >{option}</div>
    );
}

export default OptionBtnMedium;