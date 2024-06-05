import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { generateTiles } from '../../../utils/gameHelper';
import defaults from '../../../utils/defaults';
import axios from 'axios';
import { closeIcon } from '../../../assets/';
import { useNavigate } from 'react-router-dom';

const MemorySingle = ({ gridSize, theme, selectedPlayers }) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [tiles, setTiles] = useState([]);
    const [flippedTiles, setFlippedTiles] = useState([]);
    const [matchedTiles, setMatchedTiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [countdown, setCountdown] = useState(defaults.MEMORY_SINGLE_TIME);
    const [gameOver, setGameOver] = useState(false);
    const [showStartModal, setShowStartModal] = useState(true);
    const timerRef = useRef(null);
    const [totalFlips, setTotalFlips] = useState(0);
    const [totalMoves, setTotalMoves] = useState(0);
    const [singlePlayerResult, setSinglePlayerResult] = useState({
        username: selectedPlayers[0].username,
        email: selectedPlayers[0].email,
        pong_single_player: selectedPlayers[0].pong.singlePlayer,
        pong_multi_player: selectedPlayers[0].pong.multiPlayer,
        memory_single_player: selectedPlayers[0].memory.singlePlayer,
        memory_multi_player: selectedPlayers[0].memory.multiPlayer,
    });

    useEffect(() => {
        const initialTiles = generateTiles(theme, gridSize);
        setTiles(initialTiles);
    }, [theme, gridSize]);

    useEffect(() => {
        if (showStartModal) {
            clearInterval(timerRef.current);
        } else {
            timerRef.current = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [showStartModal]);

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerRef.current);
            setGameOver(true);
            setSinglePlayerResult(prevResult => ({
                ...prevResult,
                memory_single_player: {
                    ...prevResult.memory_single_player,
                    total: prevResult.memory_single_player.total + 1,
                    loss: prevResult.memory_single_player.loss + 1,
                },
            }));
            setModalMessage(`time's up! you didn't find all pairs`);
            setShowModal(true);
        }
    }, [countdown]);

    useEffect(() => {
        if (matchedTiles.length === tiles.length && tiles.length > 0) {
            clearInterval(timerRef.current);
            setSinglePlayerResult(prevResult => ({
                ...prevResult,
                memory_single_player: {
                    ...prevResult.memory_single_player,
                    total: prevResult.memory_single_player.total + 1,
                    win: prevResult.memory_single_player.win + 1,
                },
            }));
            setModalMessage(`congratulations! you found all pairs before the time ran out`);
            setShowModal(true);
        }
    }, [matchedTiles, tiles.length]);

    const handleTileClick = (index) => {
        if (gameOver || flippedTiles.length >= 2 || flippedTiles.includes(index) || matchedTiles.includes(index)) {
            return;
        }
        setFlippedTiles(prev => [...prev, index]);
        setTotalFlips(totalFlips + 1);
    };

    useEffect(() => {
        if (flippedTiles.length === 2) {
            const [firstIndex, secondIndex] = flippedTiles;
            if (tiles[firstIndex].content === tiles[secondIndex].content) {
                setMatchedTiles(prev => [...prev, firstIndex, secondIndex]);
                setFlippedTiles([]);
            } else {
                setTimeout(() => {
                    setFlippedTiles([]);
                }, 1000);
            }
            setTotalMoves(totalMoves + 1);
        }
    }, [flippedTiles, tiles]);

    useEffect(() => {
        if (gameOver || showModal) {
            handleSubmitResult();
        }
    }, [gameOver, showModal]);

    const handleSubmitResult = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8000/pong/users/${selectedPlayers[0].id}/`,
                singlePlayerResult,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Response: ', response);

        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }
    };

    const startGame = () => {
        setShowStartModal(false);
    };

    return (
        <div className='memoryGame--single'>
            <div className={`memory-grid ${gridSize === '4x4' ? 'fourByFour' : 'sixBySix'}`}>
                {tiles.map((tile, index) => (
                    <div
                        key={index}
                        className={`memory-tile ${flippedTiles.includes(index) ? 'flipped' : ''} ${matchedTiles.includes(index) ? 'matched' : ''}`}
                        onClick={() => handleTileClick(index)}
                    >
                        {flippedTiles.includes(index) || matchedTiles.includes(index) ? tile.content : ''}
                    </div>
                ))}
            </div>
            <div className='timer'>{ t('time remaining') }: {countdown}s</div>
            <div className='moves'>
                {selectedPlayers.map((player, index) => (
                    <div key={index} className='player-moves'>
                        <div>
                            { t('player') }: {player.username}
                            <br />
                            { t('moves') }: {totalMoves}
                        </div>
                    </div>
                ))}
            </div>

            {/* Initial Start Modal */}
            {showStartModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header justify-content-between">
                                <h5 className="modal-title">{ t('start game') }</h5>
                                <div type="button" className="close" onClick={() => setShowStartModal(false)}>
                                    <span className="btn btn-danger" aria-hidden="true" ><img src={ closeIcon } width={20} /></span>
                                </div>
                            </div>
                            <div className="modal-body">
                                <p className='text-center mb-0'>{ t('you have') } <em><b>{defaults.MEMORY_SINGLE_TIME}</b></em> { t('seconds to find all pairs. are you ready') } ?</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="game-btn-enabled" onClick={startGame}>{ t('start game') }</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* End Game Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header justify-content-between">
                                <h5 className="modal-title">{ t('game over') }</h5>
                                <div type="button" className="close" onClick={() => setShowModal(false)}>
                                    <span className='btn btn-danger' aria-hidden="true" ><img src={ closeIcon } width={20} /></span>
                                </div>
                            </div>
                            <div className="modal-body">
                                <p className='text-center mb-0'>{ t(modalMessage) }</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="game-btn-enabled" onClick={() => navigate('/dashboard') }>{ t('play again') }</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemorySingle;
