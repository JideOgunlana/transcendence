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
    }
    startListening() {
        window.addEventListener("reset", this.handleReset, false)
        
    }
    SetPaddle(paddle)
    {
        this.paddle = paddle
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
    }
    Won(maxScores)
    {
        if (this.score == maxScores) {
            let e = Events["playerWon"]
            e.detail = {
                playerName : this.name
            }
            dispatchEvent(e)
            return true
        }
        return false
    }
    
}