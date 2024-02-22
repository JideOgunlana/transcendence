// Define HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');
const wall = document.getElementById('wall');

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
let gamePaused = false;
let throughWall = true;

// Draw game map, snake, food
function draw() {
	board.innerHTML = '';
	drawSnake();
	drawFood();
	updateScore();
}

// Draw snake
function drawSnake() {
	snake.forEach((segment) => {
		const snakeElement = createGameElement('div', 'snake');
		setPosition(snakeElement, segment);
		board.appendChild(snakeElement);
	});
}

// Create a snake or food cube/div
function createGameElement(tag, className) {
	const element = document.createElement(tag);
	element.className = className;
	return element;
}

// Set the position of snake or food
function setPosition(element, position) {
	if (throughWall) {
		if (position.x < 1) {
			position.x = 20;
		} else if (position.x > 20) {
			position.x = 1;
		}
		if (position.y < 1) {
			position.y = 20;
		} else if (position.y > 20) {
			position.y = 1;
		}
	}

	element.style.gridColumn = position.x;
	element.style.gridRow = position.y;
}

// Draw food function
function drawFood() {
	if (gameStarted) {
		const foodElement = createGameElement('div', 'food');
		setPosition(foodElement, food);
		board.appendChild(foodElement)
	}
}

// Generate food
function generateFood() {
	const x = Math.floor(Math.random() * gridSize) + 1;
	const y = Math.floor(Math.random() * gridSize) + 1;
	return { x, y };
}

// Moving snake
function move() {
	const head = { ...snake[0] };
	switch (direction) {
		case 'right':
			head.x++;
			break;
		case 'left':
			head.x--;
			break;
		case 'up':
			head.y--;
			break;
		case 'down':
			head.y++;
			break;
	}

	snake.unshift(head);

	if (head.x === food.x && head.y === food.y) {
		food = generateFood();
		increaseSpeed();
		clearInterval(gameInterval);
		gameInterval = setInterval(() => {
			move();
			checkCollision();
			draw();
		}, gameSpeedDelay);
	} else {
		snake.pop();
	}
}

function startGame() {
	gameStarted = true;
	instructionText.style.display = 'none';
	logo.style.display = 'none';
	gameInterval = setInterval(() => {
		move();
		checkCollision();
		draw();
	}, gameSpeedDelay);
}

function handleKeyPress(event) {
	if (event.key === 'Escape') {
		resetGame();
	} else if ((event.key === 'Space' || event.key === ' ') && gameStarted) {
		pauseGame();
	} else if ((event.code === 'Space' || event.key === ' ') && !gameStarted) {
		startGame();
	} else {
		switch (event.key) {
			case 'Enter':
				changeWall();
				break;
			case 'ArrowUp':
				direction = 'up';
				break;
			case 'ArrowDown':
				direction = 'down';
				break;
			case 'ArrowLeft':
				direction = 'left';
				break;
			case 'ArrowRight':
				direction = 'right';
				break;
		}
	}
}

function changeWall() {
	if (throughWall) {
		wall.innerHTML = 'Through the wall: impossible'
	} else {
		wall.innerHTML = 'Through the wall: possible'
	}
	throughWall = !throughWall;
}

function resetGame() {
	updateHighScore();
	clearInterval(gameInterval);
	snake = [{ x: 10, y: 10 }];
	food = generateFood();
	direction = 'right';
	gameStarted = false;
	gameSpeedDelay = 200;
	updateScore();
	instructionText.innerText = 'Press spacebar to start the game';
	instructionText.style.display = 'block';
	logo.style.display = 'block';
	draw();
}

function updateHighScore() {
	highScoreText.style.display = 'block';
	const currentScore = snake.length - 1;
	if (currentScore > highScore) {
		highScore = currentScore;
		highScoreText.textContent = highScore.toString().padStart(3, '0');
	}
}

function updateScore() {
	const currentScore = snake.length -1;
	score.textContent = currentScore.toString().padStart(3, '0');
}

function pauseGame() {
	clearInterval(gameInterval);

	if (gamePaused) {
		gameInterval = setInterval(() => {
			move();
			checkCollision();
			draw();
		}, gameSpeedDelay);
		instructionText.style.display = 'none';
	} else {
		instructionText.innerText = "Paused - Press 'Space' to resume";
		instructionText.style.display = 'block';
	}
	console.log(gamePaused);
	gamePaused = !gamePaused;
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
	if (gameSpeedDelay > 150) {
		gameSpeedDelay -= 5;
	} else if (gameSpeedDelay > 100) {
		gameSpeedDelay -=3;
	} else if (gameSpeedDelay > 50) {
		gameSpeedDelay -=2;
	} else if (gameSpeedDelay > 25) {
		gameSpeedDelay -=1;
	}
}

function checkCollision() {
	const head = snake[0];

	if (!throughWall) {
		if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
			resetGame();
		}
	}

	for (let i = 1; i < snake.length; i++) {
		if (head.x === snake[i].x && head.y === snake[i].y) {
			resetGame();
		}
	}
}