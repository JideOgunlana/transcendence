import Globals from "./Globals"
import Player from "./Player"
import { Constants } from "./Constants";
import { GameModes } from "./Enums";
import { IN_GAME_OBJECTS } from "./InGameObjects";
import Events from "./Events";
import UITournament from "./UITournament";

export default class TournamentLogic {
    instantiated = false;
    constructor() {
        if (this.instantiated == false) {
            this.pendingPlayer = false
            this.numberOfTeams = undefined
            this.currentTeamIndex = 0
            this.currentRound = 1
            this.lastRoundPending = null
            this.currentTeams = [[], [], [], [], [], [], []]
            this.winningPlayers = null
            this.uiTournament = new UITournament()
        } else {
            throw Error('only one instance can exist');
        }
    }
    InitWinningPlayers(players)
    {
        this.winningPlayers = players
    }
    DisplayWin(winHtml, player)
    {
        if (this.numberOfTeams == 1 && this.pendingPlayer == false) {
            winHtml.innerHTML = `<p id='winning-text'>Player ${player.name} won the tournament!</p>`;
            winHtml.style.display = "block";
        } else {
            this.winningPlayers.push(player)
        }
    }
    CreateTeams()
    {
        this.numberOfTeams = this.DeterminNumberOfTeams()
        let numberOfWinningPlayers = this.pendingPlayer ? this.winningPlayers.length - 1 : this.winningPlayers.length
        if (this.lastRoundPending != null) {
            this.currentTeams[0].push(this.lastRoundPending)
            this.lastRoundPending = null
        }
        for (let i = 0; i < numberOfWinningPlayers; ++i) {
            let num = Math.floor(Math.random() * this.numberOfTeams)
            while (this.currentTeams[num].length == 2)
                num = Math.floor(Math.random() * this.numberOfTeams)
            this.currentTeams[num].push(this.winningPlayers[i])
        }
        if (this.pendingPlayer) {
            //this.currentTeams[this.numberOfTeams].push(this.winningPlayers[numberOfWinningPlayers])
            this.lastRoundPending = this.winningPlayers[numberOfWinningPlayers]
        }
        /* let e = Events["TournamentTeams"]
        e.detail = {
            teams : this.currentTeams,
            pending : this.lastRoundPending,
            round : this.currentRound,
            numberOfTeams :  this.numberOfTeams
        }
        dispatchEvent(e)
        console.log("event should be dispatched: ", e) */
        this.uiTournament.DisplayTeams(this.currentTeams, this.lastRoundPending, this.currentRound, this.numberOfTeams)
        this.currentTeams.forEach(team => {
            console.log(team)
            console.log("\n\n")
        });
        this.winningPlayers = []
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
        Globals.currentPlayerLeft = this.currentTeams[this.currentTeamIndex][0]
        Globals.currentPlayerRight = this.currentTeams[this.currentTeamIndex][1]
        Globals.currentPlayerLeft.SetPaddle(IN_GAME_OBJECTS.paddleLeft)
        Globals.currentPlayerRight.SetPaddle(IN_GAME_OBJECTS.paddleRight)
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
            this.currentTeams = [[], [], [], [], [], [], []]
            this.currentRound++
            this.pendingPlayer = false
            this.CreateTeams()
        } else {
            if (this.pendingPlayer) {
                //let pendingPlayer = this.currentTeams[1][0]
                this.currentTeams = [[this.winningPlayers[0], this.lastRoundPending], [], [], [], [], [], []]
                this.pendingPlayer = false
                this.lastRoundPending = null
            }
        }
    }
}