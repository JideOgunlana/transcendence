
import React, { useState, useRef, useEffect } from 'react';
import { generateTiles } from '../../../utils/memoryHelper';


const MemorySingle = ({gridSize, theme, selectedPlayers}) => {


    const [tiles, setTiles] = useState([]);
    const [flippedTiles, setFlippedTiles] = useState([]);
    const [matchedTiles, setMatchedTiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);
    const [totalFlips, setTotalFlips] = useState(0);
    const [totalMoves, setTotalMoves] = useState(0);

    useEffect(() => {
        const initialTiles = generateTiles(theme, gridSize);
        setTiles(initialTiles);
    }, [theme, gridSize]);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

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
        console.log(flippedTiles.length);
        if (matchedTiles.length === tiles.length && tiles.length > 0) {

                clearInterval(timerRef.current);
                // Determine the number of moves
                alert(`Congratulations! You found all pairs in ${timer} seconds with ${totalMoves} moves.`);
                setShowModal(true);
                return ;
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
            {
                <div className='timer'>Time: {timer}s</div>
            }

            <div className='moves'>
                {selectedPlayers.map((player, index) => (
                    <div key={index} className='player-moves'>
                        {
                            <div>
                                Player: {player.username}
                                <br />
                                moves: {totalMoves}
                            </div>

                        }
                    </div>
                ))}
            </div>
            {
                showModal && 
                (
                    <div className='modal'>
                        <button onClick={() => window.location.reload()}>Play Again</button>
                    </div>
                )
            }
        </div>
    );
}


export default MemorySingle