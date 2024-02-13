window.addEventListener('DOMContentLoaded', () => {
    setup()
    
    //ball2.translate()

    class GameManager {
        constructor(players, ball, paddleLeft, paddleRight) {
            this.players = players
            this.ball = ball
            this.paddleLeft = paddleLeft
            this.paddleRight = paddleRight
            this.hitMask = 0b00
        }

        /* inputHandler() {
            window.addEventListener('keydown',(event) => {
                let key = event.key
                switch (key) {
                    case "ArrowUp": this.players[1].paddle.moveUp(); break;
                    case "ArrowDown": this.players[1].paddle.moveDown(); break;
                    case "w": this.players[0].paddle.moveUp(); break;
                    case "s": this.players[0].paddle.moveDown(); break;
                }
            },false);

            window.addEventListener('keyup',(event) => {
                let key = event.key
                switch (key) {
                    case "ArrowUp": this.players[1].paddle.resetSpeed(); break;
                    case "ArrowDown": this.players[1].paddle.resetSpeed(); break;
                    case "w" : this.players[0].paddle.resetSpeed(); break;
                    case "s": this.players[0].paddle.resetSpeed(); break;
                }
            
            },false);
        } */

        hitRightPaddle() {
            let paddleY = this.paddleRight.pos.y
            let paddleX = this.paddleRight.pos.x
            let paddleHeight = this.paddleRight.height
            let ballRadius = this.ball.radius
            let ballY = this.ball.pos.y
            let ballX = this.ball.pos.x
            let directionY = this.ball.direction.y

            if (ballX + ballRadius >= paddleX && ballX + ballRadius <= paddleX + this.ball.speed){
                if (directionY > 0 && ballY + ballRadius >= paddleY && ballY + ballRadius <= paddleY + paddleHeight)
                    return true
                if (directionY < 0 && ballY - ballRadius >= paddleY && ballY - ballRadius <= paddleY + paddleHeight)
                    return true
            }
            return false
        }
        hitLeftPaddle() {
            let paddleY = this.paddleLeft.pos.y
            let paddleX = this.paddleLeft.pos.x
            let paddleHeight = this.paddleLeft.height
            let paddleWidth = this.paddleLeft.width
            let ballRadius = this.ball.radius
            let ballY = this.ball.pos.y
            let ballX = this.ball.pos.x
            let directionY = this.ball.direction.y
            let directionX = this.ball.direction.x

            if (ballX - ballRadius <= paddleX + paddleWidth && ballX - ballRadius >= paddleX + paddleWidth - this.ball.speed) {
                if (directionY > 0 && ballY + ballRadius > paddleY && ballY + ballRadius < paddleY + paddleHeight) {
                    console.log("paddle y: " + paddleY + " ball y: " + ballY)
                    console.log("paddly x: " + paddleX + " ball x: " + ballX);
                    return true
                }
                if (directionY < 0 && ballY - ballRadius > paddleY && ballY - ballRadius < paddleY + paddleHeight)
                    return true
            }
            return false
        }

        hitUpDownWalls() {
            if (this.ball.direction.y > 0 && this.ball.pos.y + this.ball.radius >= canvas.height) {
                return true
            } else if (this.ball.direction.y < 0 && this.ball.pos.y - this.ball.radius <= 0) {
                return true
            }
            return false
        }

        hitLeftRightWalls() {
            if (this.ball.direction.x > 0 && this.ball.pos.x + this.ball.radius >= canvas.width) {
                return true
            }
            else if (this.ball.direction.x < 0 && this.ball.pos.x - this.ball.radius <= 0) {
                return true
            }
            return false
        }

        async toggleHitMask(num) {
            setTimeout(() => {
                this.hitMask ^= num
                console.log(this.hitMask)
                console.log("in here num:" + num)
                console.log(this.hitMask)
            }, 300);
        }
        

        checkCollision() {
            console.log(this.hitMask )
            if (!(this.hitMask & 1) && (this.hitRightPaddle() || this.hitLeftPaddle())) {
                this.hitMask |= 1
                this.ball.direction.x *= -1
                this.toggleHitMask(1)
                console.log("Hit paddle");
            }

            else if (this.hitUpDownWalls()) {
                this.ball.direction.y *= -1
            }
            else if (this.hitLeftRightWalls()) {
                console.log("hit left right wall");
                this.ball.direction.x *= -1
                //this.ball.resetPos()
            }
        }

        /* loop() {
            window.requestAnimationFrame(this.loop.bind(this))
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            this.checkCollision()
            this.players[0].paddle.update()
            this.players[1].paddle.update()
            this.ball.update()
        } */

    }

    let pos = new Vector2(200, 200)
    let dir =  new Vector2(-1, 1)
    dir.normalize()
    const ball = new Ball(pos, dir, 5, "red", 20)

    const paddleLeft = new Paddle(new Vector2(50, canvas.height / 2), 2, "yellow", 20, 100)
    const paddleRight = new Paddle(new Vector2(1120, canvas.height / 2), 2, "yellow", 20, 100)
    const player1 = new Player(paddleLeft, "Tali", 0)
    const player2 = new Player(paddleRight, "Dennis", 0)
    const gameManager = new GameManager([player1, player2], ball, paddleLeft, paddleRight)
    window.addEventListener('keydown',(event) => {
        let key = event.key
        switch (key) {
            case "ArrowUp": player2.paddle.moveUp(); break;
            case "ArrowDown": player2.paddle.moveDown(); break;
            case "w": player1.paddle.moveUp(); break;
            case "s": player1.paddle.moveDown(); break;
        }
    },false);

    window.addEventListener('keyup',(event) => {
        let key = event.key
        switch (key) {
            case "ArrowUp": player2.paddle.resetSpeed(); break;
            case "ArrowDown": player2.paddle.resetSpeed(); break;
            case "w" : player1.paddle.resetSpeed(); break;
            case "s": player1.paddle.resetSpeed(); break;
        }
    
    },false);

    function animate()
    {
        window.requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        player1.paddle.update()
        player2.paddle.update()
        gameManager.checkCollision()
        ball.update()
    }
    //gameManager.inputHandler()
    //gameManager.loop()
    animate()
});
