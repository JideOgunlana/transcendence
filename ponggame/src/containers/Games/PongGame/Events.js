const Events = {
    "stopGame": new Event("stopGame"),
    "startGame": new Event("startGame"),
    "movePaddle": new Event("movePaddle"),
    "hitLeftWall" :  new Event("hitLeftWall"),
    "hitRightWall" :  new Event("hitRightWall"),
    "playerWon" :  new Event("playerWon"),
    "updateScore": new Event("updateScore"),
    "reset" : new Event("reset"),
    "setPlayers": new Event("setPlayers"),
    "AIPrediction": new Event("AIPrediction"),
    "TournamentTeams" : new Event("TournamentTeams")
}

export default Events;