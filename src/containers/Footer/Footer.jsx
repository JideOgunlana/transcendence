
import './footer.css';
import transcendLogo from '../../assets/svg/transcend.svg';
import githubIcon from '../../assets/svg/github.svg';

const Footer = props => {
    return (
        <footer className="d-flex flex-column justify-content-center align-items-center gap-1 p-4">
            <div className='mb-2 d-flex align-items-center'>
                <img src={transcendLogo} />
            </div>
            <div className='cust-text-13 d-flex align-items-center'>
                <div><a href='#'> <img src={githubIcon} /> </a></div>
                <span className='ms-4'>
                    The 😎 Team
                </span>
            </div>
            <div className='cust-text-13'>
                &copy; 2024 Team T*D*B*S
            </div>
        </footer>
    )
}

export default Footer;