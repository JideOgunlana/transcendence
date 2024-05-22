import React, { useState, useEffect } from 'react';
import { generateTiles, generatePairs } from '../../../utils/memoryHelper';

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
        console.log("Semi 1 winner is: ", winner1, player1Points, player2Points, player1, player2);
        if (player1Points === player2Points && player1Points !== 0) {
            console.log("It was a tie");
            alert("Match is a Tie, game will restart");
            setGameRound(1);
            replayGame();
            setS1Points([0, 0]);
            return;
        }
        setSemiOneWinner(winner1);
        alert("Round 1 winner: " + winner1.alias);
        setPairs([pairs[1]]);
        setGameRound(2);
        resetGame();
    };

    const handleSemifinalTwoEnd = () => {
        const [player3, player4] = pairs[0];
        const player3Points = s2Points[0];
        const player4Points = s2Points[1];
        const winner2 = player3Points > player4Points ? player3 : player4;
        console.log("Semi 2 winner is: ", winner2, player3Points, player4Points, player3, player4);
        if (player3Points === player4Points && player3Points !== 0) {
            console.log("Handling Tie");
            alert("Match is a Tie, game will restart");
            setGameRound(2);
            replayGame();
            setS2Points([0, 0]);
            return;
        }
        alert("Round 2 winner: " + winner2.alias);
        console.log('S1 winner: ', semiOneWinner, '\n');
        console.log('\n');
        console.log('S2 winner: ', winner2, '\n');
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
        const winner = player1Points > player2Points ? player1.alias : player2.alias;
        if (player1Points === player2Points && player1Points !== 0) {
            alert("Match is a Tie, game will restart");
            setGameRound(3);
            resetGame();
            return;
        }
        alert("Winner is: " + winner);
        setWinner(winner);
        setShowModal(true);
    };

    const getCurrentPlayerName = () => {
        return pairs[0] && pairs[0][currentPlayer] ? pairs[0][currentPlayer].alias : '';
    };

    return (
        <div className='memory-game'>
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
            {showModal && (
                <div className='modal-content'>
                    <h2>Winner: {winner}</h2>
                    <button onClick={() => window.location.reload()}>Play Again</button>
                </div>
            )}
        </div>
    );
};

export default MemoryTournament;
