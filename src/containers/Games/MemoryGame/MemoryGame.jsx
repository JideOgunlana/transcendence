import './memoryGame.css';
import React, { useState, useEffect, useRef, useMemo } from 'react';

const generatePairs = (players) => {
    const shuffledPlayers = shuffleArray(players);
    const pairs = [];
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
        pairs.push([shuffledPlayers[i], shuffledPlayers[i + 1]]);
    }
    return pairs;
};

const generateTiles = (theme, gridSize) => {
    const size = gridSize === '4x4' ? 16 : 36;
    let tileContent = theme === 'icons' ? generateIcons(size / 2) : generateNumbers(size / 2);
    tileContent = [...tileContent, ...tileContent];
    return shuffleArray(tileContent).map((content, index) => ({ content, id: index }));
};

const generateIcons = (num) => {
    const icons = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍑', '🍍', '🍓', '🥝', '🍆', '🥑', '🍔', '🍕', '🍣', '🍩', '🍪', '🍫', '🍿'];
    return icons.slice(0, num);
};

const generateNumbers = (num) => {
    return Array.from({ length: num }, (_, i) => i + 1);
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const MemoryGame = ({ step }) => {
    const initialSelectedPlayers = [
        { username: 'user2', email: 'xyz@email.com', alias: '2xman' },
        // { username: 'user3', email: 'uabc@email.com', alias: '3abc' },
        // { username: 'user4', email: 'uabc@email.com', alias: '4abc' },
        // { username: 'user1', email: 'uabc@email.com', alias: '1abc' }
    ];

    const { mode, gridSize, theme, selectedPlayers } = useMemo(() => ({
        selected: true,
        theme: 'icons',
        mode: 'singlePlayer',
        gridSize: '4x4',
        selectedPlayers: initialSelectedPlayers
    }), []);

    const [tiles, setTiles] = useState([]);
    const [flippedTiles, setFlippedTiles] = useState([]);
    const [matchedTiles, setMatchedTiles] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [points, setPoints] = useState(selectedPlayers.map(() => 0));
    const [pairs, setPairs] = useState([]);
    const [gameRound, setGameRound] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [winner, setWinner] = useState(null);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);
    const [totalFlips, setTotalFlips] = useState(0);

    useEffect(() => {
        const initialTiles = generateTiles(theme, gridSize);
        setTiles(initialTiles);
    }, [theme, gridSize]);

    useEffect(() => {
        if (mode === 'singlePlayer') {
            timerRef.current = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);

            return () => clearInterval(timerRef.current);
        }
    }, [mode]);

    useEffect(() => {
        if (mode === 'tournament') {
            const initialPairs = generatePairs(selectedPlayers);
            setPairs(initialPairs);
        }
    }, [mode, selectedPlayers]);

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
                    if (mode !== 'singlePlayer') {
                        setCurrentPlayer(prev => (prev + 1) % selectedPlayers.length);
                    }
                }, 1000);
            }
        }
    }, [flippedTiles, tiles, mode, selectedPlayers.length, currentPlayer]);

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

            if (mode === 'singlePlayer') {
                clearInterval(timerRef.current);
                // Determine the number of moves
                const totalMoves = totalFlips / 2;
                alert(`Congratulations! You found all pairs in ${timer} seconds with ${totalMoves} moves.`);
            }


            // Display the time and number of moves
            determineWinner();
        }
    }, [matchedTiles, tiles.length]);

    const determineWinner = () => {
        const maxPoints = Math.max(...points);
        const winners = selectedPlayers.filter((_, index) => points[index] === maxPoints);
        if (winners.length === 1) {
            setWinner(winners[0].alias);
        } else {
            setWinner('tie');
        }
        setShowModal(true);
    };

    const getCurrentPlayerName = () => {
        return mode === 'tournament' ? selectedPlayers[currentPlayer].alias : selectedPlayers[currentPlayer].username;
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
            {mode === 'singlePlayer' && <div className='timer'>Time: {timer}s</div>}
            {mode !== 'singlePlayer' && <div className='current-player'>Current Player: {getCurrentPlayerName()}</div>}
            <div className='points'>
                {selectedPlayers.map((player, index) => (
                    <div key={index} className='player-points'>
                        {player.alias}: {points[index]} points
                    </div>
                ))}
            </div>
            {showModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        {winner === 'tie' ? <h2>It's a tie!</h2> : <h2>Winner: {winner}</h2>} 
                        <button onClick={() => window.location.reload()}>Play Again</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemoryGame;
