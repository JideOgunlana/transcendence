
import './footer.css';
import transcendLogo from '../../assets/svg/transcend.svg';
import githubIcon from '../../assets/svg/github.svg';

const Footer = props => {
    return (
        <>
            <footer>
                <div className="left-footer">
                    <div>
                        <img src={transcendLogo} />
                    </div>
                    <div className='text-13'>
                        <a href='#'> <img src={githubIcon} /> </a>
                        <span >
                            The 😎 Team
                        </span>
                    </div>
                    <div className='text-13'>
                        <select className='clickable'>
                            <option>English (US)</option>
                            <option>German (DE)</option>
                            <option>Spanish (ES)</option> 
                        </select>
                    </div>
                </div>
                <div className='right-footer text-13'>
                    <div>
                        &copy; 2024 Team T*D*B*S
                    </div>
                </div>
            </footer>        
        </>
    )
}

export default Footer;