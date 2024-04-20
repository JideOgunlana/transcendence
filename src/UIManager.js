import { GameModes } from "./Enums"
import Globals from "./Globals"
import Events from "./Events"
import Player from "./Player"

export default class UIManager {
    constructor() {
        this.mode = GameModes.DoublePlayer
        this.winHtml = window.document.getElementById("winning-background")
        this.winText = window.document.getElementById("winning-text")
        this.playerNames = window.document.getElementsByClassName("player-name")
        this.scores = window.document.getElementsByClassName("score")
        this.submitBtn = window.document.getElementById("submit");
        this.numberPlayers = window.document.getElementById("input-number-players")
        this.playerNames = window.document.getElementById("input-player-names")
        this.overlay = window.document.getElementById("overlay");
        this.inputOverlay = window.document.getElementById("user-input-overlay");

        this.handleWin = this.handleWin.bind(this)
        this.handleScoreUpdate = this.handleScoreUpdate.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.setUp()
        
    }
    setUp()
    {
        window.addEventListener("stopGame", (e) => {
            this.stopListening()
        }, false)
        window.addEventListener("startGame", (e) => {
            console.log("in here howhwoqhqwow")
            this.startListening()
        }, false)
        this.submitBtn.onclick = this.handleSubmit

    }
    handleSubmit(e)
    {
        console.log("submit")
        if (Globals.numberOfPlayers === undefined)
        {
            Globals.numberOfPlayers = this.numberPlayers.getElementsByTagName("input")[0].value;
            this.numberPlayers.style.display = "none"
            for (let i = 0; i < Globals.numberOfPlayers; i++)
            {
                const newDiv = document.createElement('div');
                newDiv.innerHTML = `Player ${i}: <input type='text' placeholder='Name'><br><br>`
                this.playerNames.appendChild(newDiv)
            }
            this.playerNames.style.display = "block"
        } else {
            const playerNames = [...this.playerNames.getElementsByTagName("div")];
            playerNames.forEach(name => {
                const playerName = name.getElementsByTagName("input")[0].value;
                Globals.players.push(new Player(undefined, playerName))
            });
            //playerLeft = players[0]
            //playerRight = players[1]
            this.inputOverlay.style.display = "none";
            this.overlay.style.display = "block";
            dispatchEvent(Events["playersSet"])
            
        }
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
        //window.removeEventListener("reset", this.handleReset)
    }

    /* userInput()
    {
        Constants.submitBtn.onclick = () => {
            
          }
    } */
}