import './hero.css';
import circle from '../../assets/svg/circle.svg';
import pong2D from '../../assets/svg/pong2D.svg';
import rightArrow from '../../assets/svg/rightArrow.svg';
import before from '../../assets/svg/footerBefore.svg';

const Hero = props => {
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
                    <p class="text-13">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, recusandae?
                    </p>
                </div>
                <div>
                    <div>
                        <img src={circle} />
                    </div>
                    <h2>Play against</h2>
                    <p class="text-13">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, recusandae?
                    </p>
                </div>
                <div>
                    <div>
                        <img src={circle} />
                    </div>
                    <h2>Play for fun</h2>
                    <p class="text-13">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, recusandae?
                    </p>
                </div>
            </div>
            <div className='heroSection-gameSelect'>
                <div className='heroSection-gameSelect--tabs'>
                    <div className="heroSection-gameSelect--tabs--pong tabActive">
                        <h4>
                            Pong
                        </h4>
                        <div className=''></div>
                    </div>
                    <div className="heroSection-gameSelect--tabs--memory tabInactive">
                        <h4>
                            Memory
                        </h4>
                        <div className=''></div>
                    </div>
                </div>
                <div className='heroSection-gameSelect--gameImg'>
                    <img src={pong2D} />
                </div>
            </div>
            <div className='heroSection-signup'>
                <div className='heroSection-signup--btn text-13'>
                    <span>SignUp/Sing In</span>
                    <img src={rightArrow} />
                </div>
            </div>
            <div className='heroSection-signup--beforeFooter'>
                <img src={before} />
            </div>
        </div>
    )
}

export default Hero;