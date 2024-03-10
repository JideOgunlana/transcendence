import { inGameObjects } from "./InGameObjects"

export function handleKeyDown(event)
{
    let key = event.key
      if (key == "ArrowUp" ) {
        console.log("lol move up")
        inGameObjects.paddleRight.moveUp()
      } else if (key == "ArrowDown" ) {
        inGameObjects.paddleRight.moveDown()
      } 
      if (key == "w" ) {
        inGameObjects.paddleLeft.moveUp()
      } else if (key == "s" ) {
        inGameObjects.paddleLeft.moveDown()
      }
}

//export const handleKeyDown = (event) => {keyDown()}

export function handleKeyUp(event)
{
    let key = event.key
    if (key == "ArrowUp" || key == "ArrowDown") {
      inGameObjects.paddleRight.resetSpeed()
    } else if (key == "w" || key == "s") {
      inGameObjects.paddleLeft.resetSpeed()
    }
}