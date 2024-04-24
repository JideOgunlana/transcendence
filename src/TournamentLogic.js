import Globals from "./Globals"
import Player from "./Player"
import Constants from "./Constants";
import { GameModes } from "./Enums";
import { inGameObjects } from "./InGameObjects";

export default class TournamentLogic {
    constructor() {
        this.pendingPlayer = false
        this.numberOfTeams = undefined
        this.currentTeamIndex = 0
        this.currentRound = 1
        this.lastRoundPending = null
    }
    
    DisplayWin(winHtml, playerName)
    {
        if (this.numberOfTeams == 1 && this.pendingPlayer == false) {
            winHtml.innerHTML = `<p id='winning-text'>Player ${playerName} won the tournament!</p>`;
            winHtml.style.display = "block";
        }
    }
    CreateTeams()
    {
        this.numberOfTeams = this.DeterminNumberOfTeams()
        let numberOfWinningPlayers = this.pendingPlayer ? Globals.winningPlayers.length - 1 : Globals.winningPlayers.length
        if (this.lastRoundPending != null) {
            Globals.currentTeams[0].push(this.lastRoundPending)
            this.lastRoundPending = null
        }
        for (let i = 0; i < numberOfWinningPlayers; ++i) {
            let num = Math.floor(Math.random() * this.numberOfTeams)
            while (Globals.currentTeams[num].length == 2)
                num = Math.floor(Math.random() * this.numberOfTeams)
            Globals.currentTeams[num].push(Globals.winningPlayers[i])
        }
        if (this.pendingPlayer) {
            //Globals.currentTeams[this.numberOfTeams].push(Globals.winningPlayers[numberOfWinningPlayers])
            this.lastRoundPending = Globals.winningPlayers[numberOfWinningPlayers]
        }
        Globals.currentTeams.forEach(team => {
            console.log(team)
            console.log("\n\n")
        });
        Globals.winningPlayers = []
    }
    DeterminNumberOfTeams()
    {
        let n = Globals.numberOfPlayers / 2
        let r = this.currentRound
        let numberOfTeams = Math.floor(n / r)
        console.log("number of teans: " + numberOfTeams)
        if (n % r != 0)
            this.pendingPlayer = true
        return numberOfTeams
    }

    SetCurrentPlayers()
    {
        Globals.currentPlayerLeft = Globals.currentTeams[this.currentTeamIndex][0]
        Globals.currentPlayerRight = Globals.currentTeams[this.currentTeamIndex][1]
        Globals.currentPlayerLeft.SetPaddle(inGameObjects.paddleLeft)
        Globals.currentPlayerRight.SetPaddle(inGameObjects.paddleRight)
    }
    NextTeam()
    {
        //let n = this.pendingPlayer ? this.numberOfTeams - 1 : this.numberOfTeams
        if (this.currentTeamIndex < this.numberOfTeams - 1) {
            this.currentTeamIndex++
            this.SetCurrentPlayers()
            console.log("set current player")
        } else {
            this.NextRound()
            this.SetCurrentPlayers()
        }
    }
    NextRound()
    {
        if (this.numberOfTeams > 1) {
            this.currentTeamIndex = 0
            Globals.currentTeams = [[], [], [], [], [], [], []]
            this.currentRound++
            this.pendingPlayer = false
            this.CreateTeams()
            console.log("greater 1")
        } else {
            if (this.pendingPlayer) {
                //let pendingPlayer = Globals.currentTeams[1][0]
                Globals.currentTeams = [[Globals.winningPlayers[0], this.lastRoundPending], [], [], [], [], [], []]
                this.pendingPlayer = false
                this.lastRoundPending = null
            }
        }
    }
}