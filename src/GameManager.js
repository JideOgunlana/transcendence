import Constants from "./Constants";
import Events from "./Events";

export default class GameManager {
    
    constructor() {
        if (this instanceof GameManager) {
          throw Error('A static class cannot be instantiated.');
        } 
      }

    static StopGame(animationId)
    {
        Constants.buttonStart.style.display = "block";
        dispatchEvent(Events["stopGame"]);
        cancelAnimationFrame(animationId);
    }

    static StartGame(gameLoop)
    {
        Constants.buttonStart.style.display = "none";
        //this.buttonStart.removeAttribute("onclick")
        dispatchEvent(Events["startGame"]);
        gameLoop();
    }
}