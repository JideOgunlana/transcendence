import { GameModes } from "./Enums"
import Events from "./Events"
import UIInputParser from "./UIInputParser"
import Globals from "./Globals"

export default class UIManager {
    constructor(tournamentLogic) {
        this.mode = GameModes.DoublePlayer
        this.winHtml = window.document.getElementById("winning-background")
        this.winText = window.document.getElementById("winning-text")
        this.currentPlayersNames = window.document.getElementsByClassName("player-name")
        this.scores = window.document.getElementsByClassName("score")
        this.submitBtn = window.document.getElementById("submit");

        this.inputModi = window.document.getElementById("input-modi")
        this.inputNumberPlayers = window.document.getElementById("input-number-players")
        this.inputPlayerNames = window.document.getElementById("input-player-names")
        this.overlay = window.document.getElementById("overlay");
        this.inputOverlay = window.document.getElementById("user-input-overlay");

        this.handleWin = this.handleWin.bind(this)
        this.handleScoreUpdate = this.handleScoreUpdate.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.tournamentLogic = tournamentLogic
        this.inputParser = new UIInputParser(tournamentLogic)

        this.setUp()
        
    }
    setUp()
    {
        window.addEventListener("stopGame", (e) => {
            this.stopListening()
        }, false)
        window.addEventListener("startGame", (e) => {
            this.startListening()
        }, false)
        this.submitBtn.onclick = this.handleSubmit

    }

    handleSubmit(e)
    {
        if (Globals.currentGameMode == undefined) {
            this.inputParser.ParseModi()
            this.inputModi.style.display = "none";
            switch (Globals.currentGameMode) {
                case GameModes.SinglePlayer:
                    this.inputNumberPlayers.style.display = "none"
                    this.inputPlayerNames.style.display = "block"
                    Globals.numberOfPlayers = 1
                    this.inputParser.CreateNameInputField(1)
                    break
                case GameModes.DoublePlayer:
                    this.inputNumberPlayers.style.display = "none"
                    this.inputPlayerNames.style.display = "block"
                    Globals.numberOfPlayers = 2
                    this.inputParser.CreateNameInputField(2)
                    break
                case GameModes.MultiPlayer:
                    this.inputNumberPlayers.style.display = "none"
                    this.inputPlayerNames.style.display = "block"
                    Globals.numberOfPlayers = 4
                    this.inputParser.CreateNameInputField(4)
                    break
                case GameModes.Tournament:
                    this.inputNumberPlayers.style.display = "block"
                    break
                default:
                    console.log("default")
                    break
            }
        } else if (this.inputParser.parsePlayers() == true) {
            this.currentPlayersNames[0].textContent = Globals.currentPlayerLeft.name
            this.currentPlayersNames[1].textContent = Globals.currentPlayerRight.name
            this.inputOverlay.style.display = "none";
            this.overlay.style.display = "block";
            dispatchEvent(Events["setPlayers"])
        }
        /* else if (this.inputParser.parsePlayers() == true) {
            this.currentPlayersNames[0].textContent = Globals.currentPlayerLeft.name
            this.currentPlayersNames[1].textContent = Globals.currentPlayerRight.name
            this.inputOverlay.style.display = "none";
            this.overlay.style.display = "block";
            dispatchEvent(Events["setPlayers"])
        } */
    }
    handleWin(e)
    {
        if (Globals.currentGameMode == GameModes.Tournament) {
            this.tournamentLogic.DisplayWin(this.winHtml, e.detail.playerName)
        } else {
            this.winHtml.innerHTML = `<p id='winning-text'>Player ${e.detail.playerName} won the game!</p>`;
            this.winHtml.style.display = "block";
        }
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
        this.currentPlayersNames[0].textContent = Globals.currentPlayerLeft.name
        this.currentPlayersNames[1].textContent = Globals.currentPlayerRight.name
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