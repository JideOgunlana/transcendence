import React, { useState, useEffect } from 'react';
import { generateTiles } from '../../../utils/memoryHelper';


const MemoryMulti = ({gridSize, theme, selectedPlayers}) => {
    const [tiles, setTiles] = useState([]);
    const [flippedTiles, setFlippedTiles] = useState([]);
    const [matchedTiles, setMatchedTiles] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [points, setPoints] = useState(selectedPlayers.map(() => 0));
    const [showModal, setShowModal] = useState(false);
    const [winner, setWinner] = useState(null);
    const [totalFlips, setTotalFlips] = useState(0);

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
        } else {
            alert('tie Breaker')
            setWinner('tie');
            replayGame();
        }
        setShowModal(true);
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
                            winner !== 'tie' && (
                                <>
                                <h2>Winner: {winner}</h2>
                                <button onClick={() => window.location.href = '/dashboard'}>Play Again</button>
                                </>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default MemoryMulti;