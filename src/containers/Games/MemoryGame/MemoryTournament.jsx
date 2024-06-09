import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { generateTiles, generatePairs } from '../../../utils/gameHelper';
import { closeIcon } from '../../../assets/';
import { useNavigate } from 'react-router-dom';

const MemoryTournament = ({ gridSize, theme, selectedPlayers }) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [tiles, setTiles] = useState([]);
    const [flippedTiles, setFlippedTiles] = useState([]);
    const [matchedTiles, setMatchedTiles] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [finalsPoints, setFinalsPoints] = useState([0, 0]);
    const [s1Points, setS1Points] = useState([0, 0]);
    const [s2Points, setS2Points] = useState([0, 0]);
    const [pairs, setPairs] = useState([]);
    const [gameRound, setGameRound] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [winner, setWinner] = useState(null);
    const [semiOneWinner, setSemiOneWinner] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [announceRound, setAnnounceRound] = useState(true);

    useEffect(() => {
        const initialTiles = generateTiles(theme, gridSize);
        setTiles(initialTiles);
    }, [theme, gridSize]);

    useEffect(() => {
        setPairs(generatePairs(selectedPlayers));
    }, [selectedPlayers]);

    const handleTileClick = (index) => {
        if (flippedTiles.length < 2 && !flippedTiles.includes(index) && !matchedTiles.includes(index)) {
            setFlippedTiles(prev => [...prev, index]);
        }
    };

    useEffect(() => {
        if (flippedTiles.length === 2) {
            const [firstIndex, secondIndex] = flippedTiles;
            if (tiles[firstIndex].content === tiles[secondIndex].content) {
                setMatchedTiles(prev => [...prev, firstIndex, secondIndex]);
                updatePoints(currentPlayer);
                setFlippedTiles([]);
            } else {
                setTimeout(() => {
                    setFlippedTiles([]);
                    setCurrentPlayer(prev => (prev + 1) % 2);
                }, 1000);
            }
        }
    }, [flippedTiles, tiles, currentPlayer]);

    const updatePoints = (playerIndex) => {
        if (gameRound === 1) {
            setS1Points(prevPoints => {
                const newPoints = [...prevPoints];
                newPoints[playerIndex] += 1;
                return newPoints;
            });
        } else if (gameRound === 2) {
            setS2Points(prevPoints => {
                const newPoints = [...prevPoints];
                newPoints[playerIndex] += 1;
                return newPoints;
            });
        } else if (gameRound === 3) {
            setFinalsPoints(prevPoints => {
                const newPoints = [...prevPoints];
                newPoints[playerIndex] += 1;
                return newPoints;
            });
        }
    };

    useEffect(() => {
        if (matchedTiles.length === tiles.length && tiles.length > 0) {
            if (gameRound === 1) {
                handleSemifinalOneEnd();
            } else if (gameRound === 2) {
                handleSemifinalTwoEnd();
            } else if (gameRound === 3) {
                determineWinner();
            }
        }
    }, [matchedTiles, tiles.length]);

    const handleSemifinalOneEnd = () => {
        const [player1, player2] = pairs[0];
        const player1Points = s1Points[0];
        const player2Points = s1Points[1];
        const winner1 = player1Points > player2Points ? player1 : player2;
        if (player1Points === player2Points && player1Points !== 0) {
            setWinner('tie');
            setModalMessage("match is a tie, start tie breaker");
            setShowModal(true);
            setGameRound(1);
            replayGame();
            setS1Points([0, 0]);
            return;
        }
        setSemiOneWinner(winner1);
        setModalMessage(`Round 1 winner: ${winner1.alias}`);
        setAnnounceRound(true);
        setShowModal(true);
        setPairs([pairs[1]]);
        setGameRound(2);
        resetGame();
    };

    const handleSemifinalTwoEnd = () => {
        const [player3, player4] = pairs[0];
        const player3Points = s2Points[0];
        const player4Points = s2Points[1];
        const winner2 = player3Points > player4Points ? player3 : player4;
        if (player3Points === player4Points && player3Points !== 0) {
            setWinner('tie');
            setModalMessage("match is a tie, start tie breaker");
            setShowModal(true);
            setGameRound(2);
            replayGame();
            setS2Points([0, 0]);
            return;
        }
        setModalMessage(`Round 2 winner: ${winner2.alias}`);
        setAnnounceRound(true);
        setShowModal(true);
        setPairs([[semiOneWinner, winner2]]);
        setGameRound(3);
        resetGame();
    };

    const resetGame = () => {
        setTiles(generateTiles(theme, gridSize));
        setFlippedTiles([]);
        setMatchedTiles([]);
        setCurrentPlayer(0);
    };

    const replayGame = () => {
        setTiles(generateTiles(theme, ''));
        setFlippedTiles([]);
        setMatchedTiles([]);
        setCurrentPlayer(0);
    };

    const determineWinner = () => {
        const [player1, player2] = pairs[0];
        const player1Points = finalsPoints[0];
        const player2Points = finalsPoints[1];
        const finalWinner = player1Points > player2Points ? player1.alias : player2.alias;
        if (player1Points === player2Points && player1Points !== 0) {
            setWinner('tie');
            setModalMessage("match is a tie, start tie breaker");
            setShowModal(true);
            setGameRound(3);
            resetGame();
            return;
        }
        setModalMessage(`Winner is: ${finalWinner}`);
        setWinner(finalWinner);
        setShowModal(true);
    };

    const getCurrentPlayerName = () => {
        return pairs[0] && pairs[0][currentPlayer] ? pairs[0][currentPlayer].alias : '';
    };

    return (
        <div className='memoryGame--tournament'>
            <div className={`memory-grid ${gridSize === '4x4' ? 'fourByFour' : 'sixBySix'}`}>
                {tiles.map((tile, index) => (
                    <div
                        key={index}
                        className={`memory-tile ${flippedTiles.includes(index) ? 'flipped' : ''} ${matchedTiles.includes(index) ? 'matched' : ''}`}
                        onClick={() => handleTileClick(index)}>
                        {
                            flippedTiles.includes(index) || matchedTiles.includes(index) ? tile.content : ''
                        }
                    </div>
                ))}
            </div>
            {pairs.length > 0 && (
                <>
                    <div className='current-player p-3 mt-3'>
                        {t('current player')}: 
                        <span className={`px-2 rounded ${ currentPlayer === 0 ? 'player-left': 'player-right'}`}>
                            {getCurrentPlayerName()}
                        </span>
                    </div>
                    <div className='points row'>
                        {pairs[0].map((player, index) => (
                            <div key={index}
                                className={`col-12 text-center p-2 rounded ${currentPlayer === 0 ? `${getCurrentPlayerName() === player.alias ? 'player-left' : ''}` : `${getCurrentPlayerName() === player.alias ? 'player-right' : ''}`}`}>
                                <div>
                                    {player.alias}: {gameRound === 1 ? s1Points[index] : gameRound === 2 ? s2Points[index] : finalsPoints[index]} {t('points')}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {
                announceRound && pairs.length > 0 && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header justify-content-between">
                                    <h5 className="modal-title">
                                        {gameRound !== 3 ? `${t('starting round')} ${gameRound}` : `${t('starting final round')}`}
                                    </h5>
                                    <div type="button" className="close" onClick={() => setAnnounceRound(false)}>
                                        <span className='btn btn-danger' aria-hidden="true"><img src={closeIcon} alt='close' width={20} /></span>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <p className='text-center mb-0'>
                                        {pairs[0][0].alias} x {pairs[0][1].alias}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header justify-content-between">
                                    <h5 className="modal-title">
                                        {winner === 'tie' ? '' : gameRound === 3 ? `${t('game over')}` : `${t('round over')}`}
                                    </h5>
                                    <div type="button" className="close" onClick={() => setShowModal(false)}>
                                        <span className='btn btn-danger' aria-hidden="true"><img src={closeIcon} alt='close' width={20} /></span>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <p className='text-center mb-0'>{t(modalMessage)}</p>
                                </div>
                                {
                                    gameRound === 3 && winner !== 'tie' && (
                                        <div className="modal-footer justify-content-center">
                                            <button
                                                type="button"
                                                className="game-btn-enabled"
                                                onClick={() => navigate('/dashboard')}>
                                                {t('play again')}
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default MemoryTournament;
