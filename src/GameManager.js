import Events from "./Events";

export default class GameManager {
    static buttonStart = window.document.getElementById("btn-start")
    constructor() {
        if (this instanceof GameManager) {
          throw Error('A static class cannot be instantiated.');
        } 
      }

    static StopGame(animationId)
    {
        this.buttonStart.style.display = "block";
        dispatchEvent(Events["stopGame"]);
        cancelAnimationFrame(animationId);
    }

    static StartGame(gameLoop)
    {
        this.buttonStart.style.display = "none";
        dispatchEvent(Events["startGame"]);
        gameLoop();
    }
}