import React, { useState, useEffect } from 'react';
import { generateTiles, generatePairs } from '../../../utils/memoryHelper';
import { closeIcon } from '../../../assets/';

const MemoryTournament = ({ gridSize, theme, selectedPlayers }) => {
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
            setModalMessage("Match is a Tie, game will restart");
            setShowModal(true);
            setGameRound(1);
            replayGame();
            setS1Points([0, 0]);
            return;
        }
        setSemiOneWinner(winner1);
        setModalMessage(`Round 1 winner: ${winner1.alias}`);
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
            setModalMessage("Match is a Tie, game will restart");
            setShowModal(true);
            setGameRound(2);
            replayGame();
            setS2Points([0, 0]);
            return;
        }
        setModalMessage(`Round 2 winner: ${winner2.alias}`);
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
            setModalMessage("Match is a Tie, game will restart");
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
                    <div className='current-player'>Current Player: {getCurrentPlayerName()}</div>
                    <div className='points'>
                        {pairs[0].map((player, index) => (
                            <div key={index} className='player-points'>
                                {player.alias}: {gameRound === 1 ? s1Points[index] : gameRound === 2 ? s2Points[index] : finalsPoints[index]}
                            </div>
                        ))}
                    </div>
                </>
            )}
            {
                showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header justify-content-between">
                                    <h5 className="modal-title">
                                        { winner === 'tie' ? "Tie Breaker" : gameRound === 3 ? "Game Over" : "Round Over" }
                                    </h5>
                                    <div type="button" className="close" onClick={() => setShowModal(false)}>
                                        <span aria-hidden="true"><img src={ closeIcon } alt='close' width={20} /></span>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <p className='text-center mb-0'>{ modalMessage }</p>
                                </div>
                                {
                                    gameRound === 3 && winner !== 'tie' && (
                                    <div className="modal-footer justify-content-center">
                                        <button type="button" className="game-btn-enabled" onClick={() => window.location.href = '/dashboard'}>Play Again</button>
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
