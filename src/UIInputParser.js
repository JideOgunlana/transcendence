import Globals from "./Globals"
import Player from "./Player"
import { GameModes } from "./Enums";
import AIPlayer from "./AIPlayer";
import { IN_GAME_OBJECTS } from "./InGameObjects";

export default class UIInputParser {
    instantiated = false;
    constructor(tournamentLogic) {
        if (this.instantiated == false) {
            this.inputNumberPlayers = window.document.getElementById("input-number-players")
            this.inputPlayerNames = window.document.getElementById("input-player-names")
            this.modiSelections = window.document.getElementById("modi");
            this.tournamentLogic = tournamentLogic
            this.maxNumberOfPlayers = 1
            this.minNumberOfPlayers = 1
        } else {
            throw Error('only one instance can exist');
        }
    }
    SetMinMaxNumPlayers(min, max)
    {
        this.minNumberOfPlayers = min
        this.maxNumberOfPlayers = max
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

    ParsePlayers()
    {
        if (Globals.numberOfPlayers === undefined)
        {
            Globals.numberOfPlayers = this.inputNumberPlayers.getElementsByTagName("input")[0].value;
            if (Globals.numberOfPlayers > this.maxNumberOfPlayers || Globals.numberOfPlayers < this.minNumberOfPlayers) {
                Globals.numberOfPlayers = undefined
                alert("You can only enter a number of players between " + this.minNumberOfPlayers + " and " + this.maxNumberOfPlayers)
                return false
            }
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
                /* if (Globals.currentGameMode === GameModes.Tournament)
                    Globals.winningPlayers.push(player) */
            });

            if (Globals.currentGameMode === GameModes.Tournament) {
                this.tournamentLogic.InitWinningPlayers(Globals.players)
                this.tournamentLogic.CreateTeams()
                this.tournamentLogic.SetCurrentPlayers()
            }
            else if (Globals.currentGameMode === GameModes.SinglePlayer) {
                Globals.currentPlayerLeft = Globals.players[0]
                Globals.currentPlayerRight = new AIPlayer(IN_GAME_OBJECTS.paddleRight, "AI", IN_GAME_OBJECTS.ball)
                Globals.currentPlayerLeft.SetPaddle(IN_GAME_OBJECTS.paddleLeft)
            }
                //Globals.currentPlayerRight = AIPlayer => AIPlayer doesnt exist yet
            else {
                Globals.currentPlayerLeft = Globals.players[0]
                Globals.currentPlayerRight = Globals.players[1]
                Globals.currentPlayerLeft.SetPaddle(IN_GAME_OBJECTS.paddleLeft)
                Globals.currentPlayerRight.SetPaddle(IN_GAME_OBJECTS.paddleRight)
            }
            return true
        }
    }
}