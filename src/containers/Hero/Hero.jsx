
import GameSelect from '../../components/GameSelect/GameSelect';

import './hero.css';
import circle from '../../assets/svg/circle.svg';
import rightArrow from '../../assets/svg/rightArrow.svg';
import before from '../../assets/svg/footerBefore.svg';

const Hero = ({handleSignup}) => {

    const handlePongOptionsChange = () => {}
    const handleMemoryOptionsChange = () => {}

    return (
        <div className='heroSection'>
            <div className="heroSection-header">
                <h1>
                    Experience the fun 
                </h1>
                <h1>
                    of gaming
                </h1>
            </div>
            <div className="heroSection-about">
                <div>
                    <div>
                        <img src={circle} />
                    </div>
                    <h2>Play Solo</h2>
                    <p className="text-13">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, recusandae?
                    </p>
                </div>
                <div>
                    <div>
                        <img src={circle} />
                    </div>
                    <h2>Play against</h2>
                    <p className="text-13">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, recusandae?
                    </p>
                </div>
                <div>
                    <div>
                        <img src={circle} />
                    </div>
                    <h2>Play for fun</h2>
                    <p className="text-13">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, recusandae?
                    </p>
                </div>
            </div>
            <GameSelect 
                handlePongOptionsChange={handlePongOptionsChange}
                handleMemoryOptionsChange={handleMemoryOptionsChange}
            />
            <div className='heroSection-signup'>
                <button 
                    className='heroSection-signup--btn btn-primary clickable text-13'
                    onClick={handleSignup}
                    >
                    <span>SignUp</span>
                    <img src={rightArrow} />
                </button>
            </div>
            <div className='heroSection-signup--beforeFooter'>
                <img src={before} />
            </div>
        </div>
    )
}

export default Hero;