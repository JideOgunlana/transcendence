import GameManager from "./GameManager"

function keyDown(event, paddleRight, paddleLeft)
{
    let key = event.key
      if (key == "ArrowUp" ) {
        paddleRight.moveUp()
      } else if (key == "ArrowDown" ) {
        paddleRight.moveDown()
      } 
      if (key == "w" ) {
        paddleLeft.moveUp()
      } else if (key == "s" ) {
        paddleLeft.moveDown()
      }
}

//export const handleKeyDown = (event) => {keyDown(GameManager.paddleLeft, GameManager.paddleRight)}