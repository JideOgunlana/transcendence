import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PongGameOverModal = ({ show, winner }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  if (!show) {
    return null;
  }

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header justify-content-between">
            <h5 className="modal-title">{ t('game over') }</h5>

          </div>
          <div className="modal-body">
            <p className='text-center mb-0'>{`${winner} ${ t('wins') }!`}</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="button" className="game-btn-enabled" onClick={() => navigate('/dashboard') }>{ t('play again') }</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PongGameOverModal;
