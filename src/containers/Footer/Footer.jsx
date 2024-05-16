
import './footer.css';
import transcendLogo from '../../assets/svg/transcend.svg';
import githubIcon from '../../assets/svg/github.svg';

const Footer = props => {
    return (
        <footer>
            <div className="left-footer">
                <div className='mb-2 d-flex align-items-center'>
                    <img src={transcendLogo} />
                </div>
                <div className='text-13 mb-5 d-flex align-items-center'>
                    <a href='#'> <img src={githubIcon} /> </a>
                    <span className='ms-4'>
                        The 😎 Team
                    </span>
                </div>
            </div>
            <div className='right-footer text-13'>
                <div>
                    &copy; 2024 Team T*D*B*S
                </div>
            </div>
        </footer>
    )
}

export default Footer;