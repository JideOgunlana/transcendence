import * as THREE from 'three';

export default class Player {
    
    constructor(paddle, name) {
        this.paddle = paddle
        this.score = 0
        this.name = name
        this.scoresHtml = this.GetHTMLElem()
        this.winHtml = window.document.getElementById("winning-background")
    }

    GetHTMLElem()
    {
        if (this.paddle.name == "left")
            return window.document.getElementsByClassName("score-left")[0];
        else if (this.paddle.name == "right")
            return window.document.getElementsByClassName("score-right")[0];
        return null;
    }

    HitWall(ball)
    {
        if (this.paddle.name == "left" && ball.CollisionXRight() || this.paddle.name == "right" && ball.CollisionXLeft())
        {
            this.score += 1;
            this.scoresHtml.innerHTML = this.score;
            return true
        }
        return false
    }
    Won(maxScores)
    {
        if (this.score == maxScores) {
            this.winHtml.innerHTML = `<p id='winning-text'>Player ${this.name} won the game!</p>`;
            this.winHtml.style.display = "block";
            //this.winHtml.textContent = "Player " + this.name + " won the game!";
            return true
        }
        return false
    }
    ResetScore()
    {
        this.score = 0;
        this.scoresHtml.innerHTML = this.score;
        this.winHtml.style.display = "none";
    }
}