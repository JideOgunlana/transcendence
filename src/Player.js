import * as THREE from 'three';
import Events from './Events';

export default class Player {
    
    constructor(paddle, name) {
        this.paddle = paddle
        this.score = 0
        this.name = name
        this.scoresHtml = this.GetHTMLElem()
        this.winHtml = window.document.getElementById("winning-background")


        this.handleReset = this.handleReset.bind(this)
        this.startListening()
        /* window.addEventListener("stopGame", (e) => {
            this.stopListening()
        }, false)
        window.addEventListener("startGame", (e) => {
            console.log("in here howhwoqhqwow")
            this.startListening()
        }, false) */

    }
    startListening() {
        window.addEventListener("reset", this.handleReset, false)
        
    }
    stopListening()
    {
        window.removeEventListener("reset", this.handleReset)
    }
    handleReset()
    {
        this.score = 0;
        /* this.scoresHtml.innerHTML = this.score;
        this.winHtml.style.display = "none"; */
    }
    GetHTMLElem()
    {
        if (this.paddle == undefined)
            return null
        else if (this.paddle.name == "left")
            return window.document.getElementsByClassName("score-left")[0];
        else if (this.paddle.name == "right")
            return window.document.getElementsByClassName("score-right")[0];
        return null;
    }

    HitWall()
    {
        this.score += 1
        let e = Events["updateScore"]
        e.detail = {
            position: this.paddle.name,
            newScore : this.score
        }
        dispatchEvent(e)
        //this.scoresHtml.innerHTML = this.score
        /* if (this.paddle.name == "left" && ball.CollisionXRight() || this.paddle.name == "right" && ball.CollisionXLeft())
        {
            this.score += 1;
            this.scoresHtml.innerHTML = this.score;
            return true
        }
        return false */
        /* if (this.paddle.name == "left" && leftRight == "right" || this.paddle.name == "right" && leftRight == "left")
        {
            this.score += 1
            this.scoresHtml.innerHTML = this.score
            return true
        }
        return false */
    }
    Won(maxScores)
    {
        if (this.score == maxScores) {
            let e = Events["playerWon"]
            e.detail = {
                playerName : this.name
            }
            dispatchEvent(e)
            /* this.winHtml.innerHTML = `<p id='winning-text'>Player ${this.name} won the game!</p>`;
            this.winHtml.style.display = "block"; */
            return true
        }
        return false
    }
    
}