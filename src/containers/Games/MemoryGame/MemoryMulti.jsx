import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { generateTiles } from '../../../utils/gameHelper';
import { closeIcon } from '../../../assets/';


const MemoryMulti = ({ gridSize, theme, selectedPlayers }) => {

    const { t } = useTranslation();
    const navigate = useNavigate()
    const [tiles, setTiles] = useState([]);
    const [flippedTiles, setFlippedTiles] = useState([]);
    const [matchedTiles, setMatchedTiles] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [points, setPoints] = useState(selectedPlayers.map(() => 0));
    const [showModal, setShowModal] = useState(false);
    const [winner, setWinner] = useState(null);
    const [totalFlips, setTotalFlips] = useState(0);
    const [multiPlayerResults, setMultiPlayerResults] = useState(
        selectedPlayers.map(player => ({
            username: player.username,
            email: player.email,
            pong_single_player: player.pong.singlePlayer,
            pong_multi_player: player.pong.multiPlayer,
            memory_single_player: player.memory.singlePlayer,
            memory_multi_player: player.memory.multiPlayer,
        }))
    );

    useEffect(() => {
        const initialTiles = generateTiles(theme, gridSize);
        setTiles(initialTiles);
    }, [theme, gridSize]);

    const handleTileClick = (index) => {
        if (flippedTiles.length < 2 && !flippedTiles.includes(index) && !matchedTiles.includes(index)) {
            setFlippedTiles(prev => [...prev, index]);
        }
        setTotalFlips(totalFlips + 1);
        // console.log("FlippedTiles count: " + totalFlips);
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
                    setCurrentPlayer(prev => (prev + 1) % selectedPlayers.length);
                }, 1000);
            }
        }
    }, [flippedTiles, tiles, selectedPlayers.length, currentPlayer]);

    const updatePoints = (playerIndex) => {
        setPoints(prevPoints => {
            const newPoints = [...prevPoints];
            newPoints[playerIndex] += 1;
            return newPoints;
        });
    };

    useEffect(() => {
        // console.log(flippedTiles.length);
        if (matchedTiles.length === tiles.length && tiles.length > 0) {
            determineWinner();
        }
    }, [matchedTiles, tiles.length]);

    const determineWinner = () => {
        const maxPoints = Math.max(...points);
        const winners = selectedPlayers.filter((_, index) => points[index] === maxPoints);
        console.log('Here -in determine winner-', winners)
        if (winners.length === 1) {
            setWinner(winners[0].username);
            updateMultiPlayerResults(winners[0].username);
            setShowModal(true);
        } else {
            // alert('tie Breaker')
            setWinner('tie');
            setShowModal(true);
            replayGame();
        }
    };

    const replayGame = () => {
        setTiles(generateTiles(theme, ''));
        setFlippedTiles([]);
        setMatchedTiles([]);
        setCurrentPlayer(0);
    };

    const getCurrentPlayerName = () => {
        return selectedPlayers[currentPlayer].username;
    };

    const updateMultiPlayerResults = (winnerUsername) => {
        setMultiPlayerResults(prevResults =>
            prevResults.map(result => {
                if (result.username === winnerUsername) {
                    return {
                        ...result,
                        memory_multi_player: {
                            ...result.memory_multi_player,
                            total: result.memory_multi_player.total + 1,
                            win: result.memory_multi_player.win + 1,
                        },
                    };
                } else {
                    return {
                        ...result,
                        memory_multi_player: {
                            ...result.memory_multi_player,
                            total: result.memory_multi_player.total + 1,
                            loss: result.memory_multi_player.loss + 1,
                        },
                    };
                }
            })
        );
    };

    useEffect(() => {
        if (showModal && winner !== 'tie') {
            handleSubmitResults();
        }
    }, [showModal]);

    const handleSubmitResults = async () => {
        try {
            const response = await Promise.all(multiPlayerResults.map(result =>
                axios.put(
                    `http://localhost:8000/pong/users/${selectedPlayers.find(player => player.username === result.username).id}/`,
                    result,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
            ));
            console.log('Response: ', response);

        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }
    };

    return (
        <div className='memoryGame--multi'>
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

            <div className='current-player p-3 mt-3'>
                { t('current player') }: 
                <span className={`px-2 rounded ${ currentPlayer === 0 ? 'player-left': 'player-right'}`}>
                    {getCurrentPlayerName()}
                </span>
            </div>
            <div className='points row'>
                {selectedPlayers.map((player, index) => (
                    <div key={index}
                        className={`col-12 text-center p-2 rounded ${currentPlayer === 0 ? `${getCurrentPlayerName() === player.username ? 'player-left' : ''}` : `${getCurrentPlayerName() === player.username ? 'player-right' : ''}`}`}>
                        {
                            <div>
                                {player.username} : {points[index]} {t('points')}
                            </div>
                        }
                    </div>
                ))}
            </div>
            {
                showModal &&
                (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header justify-content-between">
                                    <h5 className="modal-title">
                                        { winner === 'tie' ? t('tie breaker') : t('game over') }
                                    </h5>
                                    <div type="button" className="close" onClick={() => setShowModal(false)}>
                                        <span className='btn btn-danger' aria-hidden="true" ><img src={closeIcon} alt='close' width={20} /></span>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <p className='text-center mb-0'>
                                        {winner === 'tie' ? t('match is a tie, start tie breaker') : `${ t('winner') } ${ winner }!`}
                                    </p>
                                </div>
                                {
                                    winner !== 'tie' && (
                                        <div className="modal-footer justify-content-center">
                                            <button
                                                type="button"
                                                className="game-btn-enabled"
                                                onClick={() => navigate('/dashboard') }>
                                                    { t('play again') }
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
}

export default MemoryMulti;