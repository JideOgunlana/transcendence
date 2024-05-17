
import GameSelect from '../../components/GameSelect/GameSelect';
import { Link } from 'react-router-dom';


import './hero.css';
import circle from '../../assets/svg/circle.svg';
import rightArrow from '../../assets/svg/rightArrow.svg';
import before from '../../assets/svg/footerBefore.svg';

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
            <div className="heroSection-about d-flex flex-wrap gap-5 mt-5 justify-content-center">
                <div>
                    <div>
                        <img src={circle} />
                    </div>
                    <h2>Play Solo</h2>
                    <p className="cust-text-13">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, recusandae?
                    </p>
                </div>
                <div>
                    <div>
                        <img src={circle} />
                    </div>
                    <h2>Play against</h2>
                    <p className="cust-text-13">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, recusandae?
                    </p>
                </div>
                <div>
                    <div>
                        <img src={circle} />
                    </div>
                    <h2>Play for fun</h2>
                    <p className="cust-text-13">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, recusandae?
                    </p>
                </div>
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
                <img src={before} className='img-fluid' />
            </div>
        </div>
    )
}

export default Hero;