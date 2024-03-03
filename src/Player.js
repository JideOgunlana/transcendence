import * as THREE from 'three';

export default class Player {
    
    constructor(paddle, name) {
        this.paddle = paddle
        this.score = 0
        this.name = name
    }

    HitWall(ball)
    {
        if (this.paddle.name == "left" && ball.CollisionXRight() || this.paddle.name == "right" && ball.CollisionXLeft())
        {
            this.score += 1;
            return true
        }
        return false
    }
    Won(maxScores)
    {
        if (this.score == maxScores)
            return true
        return false
    }
}