export default class UITournament {
    constructor() {
        this.matchMaker = window.document.getElementById("matchmaker");
    }
    /* DisplayWin(winHtml, player)
    {
        if (this.numberOfTeams == 1 && this.pendingPlayer == false) {
            winHtml.innerHTML = `<p id='winning-text'>Player ${player.name} won the tournament!</p>`;
            winHtml.style.display = "block";
        } else {
            this.winningPlayers.push(player)
        }
    } */
    DisplayTeams(teams, pending, round, numberOfTeams) {
        /* let teams = e.detail.teams
        let pending = e.detail.pending
        let round = e.detail.round */
        console.log("handleDisplayTeams")
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `Round: ${round}<br><br>`
        this.matchMaker.appendChild(newDiv)
        for (let i = 0; i < numberOfTeams; ++i) {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = `${teams[i][0].name} X ${teams[i][1].name}<br><br>`
            this.matchMaker.appendChild(newDiv)
        }
        /* teams.forEach(team => {
            
        }); */
        if (pending != null) {
            const newDiv2 = document.createElement('div');
            newDiv.innerHTML = `Pending till next round- ${pending.name}<br><br>`
            this.matchMaker.appendChild(newDiv2)
        }
    }
}