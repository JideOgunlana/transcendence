//import { Constants } from "three/examples/jsm/libs/motion-controllers.module.js";
import Globals from "./Globals"
import Player from "./Player"
import { Constants } from "./Constants";
import { GameModes } from "./Enums";
import TournamentLogic from "./TournamentLogic";

export default class UIInputParser {
    constructor(tournamentLogic) {
        this.inputNumberPlayers = window.document.getElementById("input-number-players")
        this.inputPlayerNames = window.document.getElementById("input-player-names")
        this.modiSelections = window.document.getElementById("modi");
        //this.pendingPlayer = false
        this.tournamentLogic = tournamentLogic
    }
    ParseModi()
    {
        let selectedValue = this.modiSelections.options[this.modiSelections.selectedIndex].value
        Globals.currentGameMode = selectedValue
        console.log(selectedValue)
    }
    CreateNameInputField(amount)
    {
        for (let i = 0; i < amount; i++)
        {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = `Player ${i}: <input type='text' placeholder='Name'><br><br>`
            this.inputPlayerNames.appendChild(newDiv)
        }
    }
    ParseDoublePlayer()
    {
        Globals.numberOfPlayers = 2

    }

    parsePlayers()
    {
        if (Globals.numberOfPlayers === undefined)
        {
            Globals.numberOfPlayers = this.inputNumberPlayers.getElementsByTagName("input")[0].value;
            if (Globals.numberOfPlayers > Constants.maxNumberOfPlayers)
                throw Error('Too many player. Max 12');
            //this.inputNumberPlayers.style.display = "none"
            /* for (let i = 0; i < Globals.numberOfPlayers; i++)
            {
                const newDiv = document.createElement('div');
                newDiv.innerHTML = `Player ${i}: <input type='text' placeholder='Name'><br><br>`
                this.inputPlayerNames.appendChild(newDiv)
            } */
            this.CreateNameInputField(Globals.numberOfPlayers)
            this.inputPlayerNames.style.display = "block"
            this.inputNumberPlayers.style.display = "none"
            return false
        } else {

            const inputPlayerNames = [...this.inputPlayerNames.getElementsByTagName("div")];
            inputPlayerNames.forEach(name => {
                const playerName = name.getElementsByTagName("input")[0].value;
                let player = new Player(undefined, playerName)
                Globals.players.push(player)
                if (Globals.currentGameMode === GameModes.Tournament)
                    Globals.winningPlayers.push(player)
            });
            if (Globals.currentGameMode === GameModes.Tournament) {
                this.tournamentLogic.CreateTeams()
                this.tournamentLogic.SetCurrentPlayers()
            }
                //this.determinCurrentPlayer()
            else if (Globals.currentGameMode === GameModes.SinglePlayer)
                Globals.currentPlayerLeft = Globals.players[0]
                //Globals.currentPlayerRight = AIPlayer => AIPlayer doesnt exist yet
            else {
                Globals.currentPlayerLeft = Globals.players[0]
                Globals.currentPlayerRight = Globals.players[1]
            }
            return true
        }
    }

    /* determinCurrentPlayer()
    {
        let numberOfTeams = this.determinNumberOfTeams()
        let numberOfWinningPlayers = this.pendingPlayer ? Globals.winningPlayers.length - 1 : Globals.winningPlayers.length
        for (let i = 0; i < numberOfWinningPlayers; ++i) {
            console.log(numberOfTeams)
            let num = Math.floor(Math.random() * numberOfTeams)
            console.log("index: ", num)
            console.log(Math.floor(Math.random() * numberOfTeams))
            while (Globals.currentTeams[num].length == 2)
                num = Math.floor(Math.random() * numberOfTeams)
            Globals.currentTeams[num].push(Globals.winningPlayers[i])
        }
        if (this.pendingPlayer)
            Globals.currentTeams[numberOfTeams].push(Globals.winningPlayers[numberOfWinningPlayers])
        Globals.currentTeams.forEach(team => {
            console.log(team)
            console.log("\n\n")
        });
        Globals.currentPlayerLeft = Globals.currentTeams[0][0]
        Globals.currentPlayerRight = Globals.currentTeams[0][1]
    }
    determinNumberOfTeams()
    {
        let n = Globals.numberOfPlayers / 2
        let r = Globals.currentRound
        let numberOfTeams = Math.floor(n / r)
        if (n % r != 0)
            this.pendingPlayer = true
        return numberOfTeams
    } */
}