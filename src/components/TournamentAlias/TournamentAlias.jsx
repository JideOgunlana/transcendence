// TournamentAlias.js
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { closeIcon } from '../../assets/';
import './tournamentAlias.css';

const TournamentAlias = ({ show, handleModalClose, handleAliasSubmit, selectedPlayers, showError }) => {

    const { t } = useTranslation();
    const [aliases, setAliases] = useState(selectedPlayers.map(player => ({ ...player, alias: '' })));

    useEffect(() => {
        setAliases(selectedPlayers.map(player => ({ ...player, alias: '' })));
    }, [selectedPlayers]);

    const handleAliasChange = (index, alias) => {
        const newAliases = [...aliases];
        newAliases[index].alias = alias;
        setAliases(newAliases);
    };

    const handleSubmit = () => {
        handleAliasSubmit(aliases);
    };

    return (
        <div className={`tournamentAlias modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header justify-content-around">
                        <h5 className="modal-title">{ t('enter an alias for your user') }</h5>
                        <div type="button" className="close" onClick={handleModalClose} aria-label="Close">
                            <span aria-hidden="true" ><img src={closeIcon} width={20} /></span>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className='mb-5 alias-note'>
                            <h4>!{ t('notice') }</h4>
                            <ul>
                                <li>
                                    {t('every player alias must be unique')}
                                </li>
                                <li>
                                    { t('alias must be between 2 to 15 characters') }
                                </li>
                                <li>
                                    { t('alias must not have trailing or leading space') }
                                </li>
                                <li>
                                    { t('alias should contain only letters / numbers') }
                                </li>
                                <li>
                                    { t('alias should start with a letter') }
                                </li>
                            </ul>
                        </div>
                        {aliases.map((player, index) => (
                            <div key={index} className="custom-input">
                                <label className='me-2'>{player.username}: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={player.alias}
                                    onChange={(e) => handleAliasChange(index, e.target.value)}
                                    placeholder={ t('enter an alias') }
                                    maxLength={15}
                                    minLength={2}
                                />
                            </div>
                        ))}
                    </div>
                    {
                        showError && (
                        <dialog open className='alert alert-danger' role='alert'>
                                { t('oops! invalid alias used') }
                        </dialog>
                        )
                    }
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="game-btn-enabled" onClick={handleSubmit}>{ t('submit') }</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentAlias;
