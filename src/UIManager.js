import { GameModes } from "./Enums"

export default class UIManager {
    constructor() {
        this.mode = GameModes.DoublePlayer
        this.winHtml = window.document.getElementById("winning-background")
        this.winText = window.document.getElementById("winning-text")
        this.playerNames = window.document.getElementsByClassName("player-name")
        this.scores = window.document.getElementsByClassName("score")

        this.handleWin = this.handleWin.bind(this)
        this.handleScoreUpdate = this.handleScoreUpdate.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.startListening()
    }
    handleWin(e)
    {
        console.log("player Won ", e.detail.playerName)
        this.winHtml.innerHTML = `<p id='winning-text'>Player ${e.detail.playerName} won the game!</p>`;
        this.winHtml.style.display = "block";
    }

    handleScoreUpdate(e)
    {
        if (e.detail.position == "left")
            this.scores[0].innerHTML = e.detail.newScore
        else if (e.detail.position == "right")
            this.scores[1].innerHTML = e.detail.newScore
        else if (e.detail.position == "both") {
            this.scores[0].innerHTML = e.detail.newScore
            this.scores[1].innerHTML = e.detail.newScore
        }
    }
    handleReset (e) {
        this.scores[0].innerHTML = 0
        this.scores[1].innerHTML = 0
        this.winHtml.style.display = "none";
    }
    startListening() {
        window.addEventListener("playerWon", this.handleWin, false)
        window.addEventListener("updateScore", this.handleScoreUpdate, false)
        window.addEventListener("reset", this.handleReset, false)
    }
    stopListening()
    {
        window.removeEventListener("playerWon", this.handleWin)
        window.removeEventListener("updateScore", this.handleScoreUpdate)
        window.removeEventListener("reset", this.handleReset)
    }
}