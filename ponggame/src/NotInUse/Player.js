import Events from './Events';

export default class Player {
    
    constructor(paddle, name) {
        this.paddle = paddle
        this.score = 0
        this.name = name
        /* this.scoresHtml = this.GetHTMLElem()
        this.winHtml = window.document.getElementById("winning-background") */


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
                player : this
            }
            dispatchEvent(e)
            return true
        }
        return false
    }
    
}