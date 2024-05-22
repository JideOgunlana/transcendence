export const generatePairs = (players) => {
    const shuffledPlayers = shuffleArray(players);
    const pairs = [];
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
        pairs.push([shuffledPlayers[i], shuffledPlayers[i + 1]]);
    }
    return pairs;
};

export const generateTiles = (theme, gridSize) => {
    const size = gridSize === '4x4' ? 16 : gridSize === '6x6' ? 36 : '6';
    let tileContent = theme === 'icons' ? generateIcons(size / 2) : generateNumbers(size / 2);
    tileContent = [...tileContent, ...tileContent];
    return shuffleArray(tileContent).map((content, index) => ({ content, id: index }));
};


const generateIcons = (num) => {
    const icons = [
        '🍎', 
        '🍌', 
        '🍒', 
        '🍇', 
        '🍉', 
        '🍑', 
        '🍍', 
        '🍓', 
        '🥝', 
        '🍆', 
        '🥑', 
        '🍔', 
        '🍕', 
        '🍣', 
        '🍩', 
        '🍪', 
        '🍫', 
        '🍿',
    ];
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
