import { error404Icon } from '../../assets';
import './errorPage.css';

const ErrorPage = () => {
    return (
        <div className='errorPage d-flex align-items-center justify-content-center'>
            <img src={error404Icon} alt='Error 404' />
        </div>
    );
};


export default ErrorPage;