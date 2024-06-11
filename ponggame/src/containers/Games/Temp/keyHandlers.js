function keyDownHandler(e) {
    if (e.key === 'w' || e.key === 'W') {
      moveLeft = true;
    } else if (e.key === 's' || e.key === 'S') {
      moveRight = true;
    }
    if (!gameToStart) {
      if (e.key === 'Enter') {
        setGameToStart(true)
      }
    }
  }

  function keyUpHandler(e) {
    if (e.key === 'w' || e.key === 'W') {
      moveLeft = false;
    } else if (e.key === 's' || e.key === 'S') {
      moveRight = false;
    }
  }

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);