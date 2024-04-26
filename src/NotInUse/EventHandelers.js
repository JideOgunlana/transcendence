/* import { IN_GAME_OBJECTS } from "./IN_GAME_OBJECTS"
import Globals from "./Globals"

export function handleKeyDown(event)
{
    let key = event.key
      if (key == "ArrowUp" && Globals.AIPlayerActive == false) {
        console.log("lol move up")
        IN_GAME_OBJECTS.paddleRight.moveUp()
      } else if (key == "ArrowDown" && Globals.AIPlayerActive == false ) {
        IN_GAME_OBJECTS.paddleRight.moveDown()
      } 
      if (key == "w" ) {
        IN_GAME_OBJECTS.paddleLeft.moveUp()
      } else if (key == "s" ) {
        IN_GAME_OBJECTS.paddleLeft.moveDown()
      }
}


export function handleKeyUp(event)
{
    let key = event.key
    if ((key == "ArrowUp" || key == "ArrowDown") && AIPlayerActive == false) {
      IN_GAME_OBJECTS.paddleRight.resetSpeed()
    } else if (key == "w" || key == "s") {
      IN_GAME_OBJECTS.paddleLeft.resetSpeed()
    }
} */