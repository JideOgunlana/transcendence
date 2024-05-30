import React, { useState, useRef, useEffect } from 'react';
import { generateTiles } from '../../../utils/memoryHelper';
import defaults from '../../../utils/defaults';

const MemorySingle = ({ gridSize, theme, selectedPlayers }) => {
    const [tiles, setTiles] = useState([]);
    const [flippedTiles, setFlippedTiles] = useState([]);
    const [matchedTiles, setMatchedTiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState(defaults.MEMORY_SINGLE_TIME);
    const [gameOver, setGameOver] = useState(false);
    const timerRef = useRef(null);
    const [totalFlips, setTotalFlips] = useState(0);
    const [totalMoves, setTotalMoves] = useState(0);

    useEffect(() => {
        const initialTiles = generateTiles(theme, gridSize);
        setTiles(initialTiles);
    }, [theme, gridSize]);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerRef.current);
            setGameOver(true);
            alert(`Time's up! You didn't find all pairs.`);
            setShowModal(true);
        }
    }, [countdown]);

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
    }, [flippedTiles, tiles, selectedPlayers.length]);

    useEffect(() => {
        if (matchedTiles.length === tiles.length && tiles.length > 0) {
            clearInterval(timerRef.current);
            alert(`Congratulations! You found all pairs with ${totalMoves} moves before time ran out.`);
            setShowModal(true);
            return;
        }
    }, [matchedTiles, tiles.length]);

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
            <div className='timer'>Time Remaining: {countdown}s</div>
            <div className='moves'>
                {selectedPlayers.map((player, index) => (
                    <div key={index} className='player-moves'>
                        <div>
                            Player: {player.username}
                            <br />
                            Moves: {totalMoves}
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className='modal-content'>
                    <button onClick={() => window.location.href = '/dashboard'}>Play Again</button>
                </div>
            )}
        </div>
    );
}

export default MemorySingle;
