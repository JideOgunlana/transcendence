
import GameSelect from '../../components/GameSelect/GameSelect';
import { Link } from 'react-router-dom';
import { footerBefore, rightArrow } from '../../assets';
import './hero.css';


const Hero = ({handleSignup}) => {

    const handlePongOptionsChange = () => {}
    const handleMemoryOptionsChange = () => {}

    return (
        <div className='heroSection d-grid gap-5'>
            <div className="heroSection-header">
                <h1>
                    Experience the fun 
                </h1>
                <h1>
                    of gaming
                </h1>
            </div>
            <GameSelect 
                handlePongOptionsChange={handlePongOptionsChange}
                handleMemoryOptionsChange={handleMemoryOptionsChange}
            />
            <div className='heroSection-signup d-flex justify-content-center'>
                <Link to='signup' >
                    <button 
                        className='heroSection-signup--btn game-btn-enabled clickable cust-text-13 justify-content-around'
                        onClick={handleSignup}
                        >
                        <span>SignUp</span>
                        <img src={rightArrow} />
                    </button>
                </Link>
            </div>
            <div className='heroSection-signup--beforeFooter'>
                <img src={footerBefore} className='img-fluid' />
            </div>
        </div>
    )
}

export default Hero;