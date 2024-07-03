import { useTranslation } from 'react-i18next';
import { unauthorizedIcon } from '../../assets';
import './unauthorized.css';

const Unauthorized = () => {

	const { t } =useTranslation();

	return (
		<div className='text-center'>
			 <img src={unauthorizedIcon} alt='Unatuhorized' />
			 <div className='mt-3'>
				{ t('you are not authorized to view this page') }
			 </div>
		</div>
	)
}

export default Unauthorized;