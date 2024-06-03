import { unauthorizedIcon } from '../../assets';
import './unauthorized.css';

const Unauthorized = () => {

	return (
		<div className='text-center'>
			 <img src={unauthorizedIcon} alt='Unatuhorized' />
		</div>
	)
}

export default Unauthorized;