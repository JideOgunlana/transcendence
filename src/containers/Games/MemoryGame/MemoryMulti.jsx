import React, { useState, useEffect } from 'react';
import { generateTiles } from '../../../utils/memoryHelper';
import axios from 'axios';

const MemoryMulti = ({gridSize, theme, selectedPlayers}) => {
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
        console.log("FlippedTiles count: " + totalFlips);
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
        console.log(flippedTiles.length);
        if (matchedTiles.length === tiles.length && tiles.length > 0) {

            determineWinner();
        }
    }, [matchedTiles, tiles.length]);

    const determineWinner = () => {
        const maxPoints = Math.max(...points);
        const winners = selectedPlayers.filter((_, index) => points[index] === maxPoints);
        console.log('Here -in determine winner-',winners)
        if (winners.length === 1) {
            setWinner(winners[0].username);
            updateMultiPlayerResults(winners[0].username);
            setShowModal(true);
        } else {
            alert('tie Breaker')
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
        <div className='memory-game'>
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

            <div className='current-player'>
                Current Player: { getCurrentPlayerName() }
            </div>
            <div className='points'>
                {selectedPlayers.map((player, index) => (
                    <div key={index} className='player-points'>
                        {
                            <div>
                                { player.username } : { points[index] } points
                            </div>
                        }
                    </div>
                ))}
            </div>
            {
                showModal && 
                (
                    <div className='modal-content'>
                        {
                            <div>
                                <h2>Winner: {winner}</h2>
                                <button className='game-btn-enabled' onClick={() => window.location.href = '/dashboard'}>Play Again</button>
                            </div>
                        }
                    </div>
                )
            }
        </div>
    );
}

export default MemoryMulti;