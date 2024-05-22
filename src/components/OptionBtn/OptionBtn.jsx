
import './optionBtn.css';

const OptionBtn = ({btnClass, handlePongOptionsChange, handleMemoryOptionsChange, step, option, val}) => {

    const isActive = (
        (step.pong.selected && (step.pong.theme === option || step.pong.mode === option)) ||
        (step.memory.selected && (step.memory.theme === option || step.memory.mode === option || step.memory.gridSize === option))
    );

    const handleClick = () => {
        if (step.pong.selected) {
            if (['2D', '3D'].includes(option)) {
                handlePongOptionsChange({ theme: option });
            } else {
                handlePongOptionsChange({ mode: option });
            }
        } else {
            if (['icons', 'numbers'].includes(option)) {
                handleMemoryOptionsChange({ theme: option });
            } else if (['singlePlayer', 'multiplayer', 'tournament'].includes(option)) {
                handleMemoryOptionsChange({ mode: option });
            } else {
                handleMemoryOptionsChange({ gridSize: option });
            }
        }
    };

    return (
        <div 
            className={`clickable ${btnClass}  ${isActive ? 'optionBtn-active' : 'optionBtn-inactive'}`}
            onClick={handleClick}
            id={option}
        >{val}</div>
    );
}

export default OptionBtn;