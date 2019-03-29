document.addEventListener('DOMContentLoaded', () => {

// Create the computer grid 10 x 10 squares
//Create ship. Just get the same size ship to appear. So 4 x destroyers of three squares
// Place ships on board randomly. Ships can be vertical or horizontal. Place going right or down.
  // Get one ship on the board first. Need to say 'index + 1 \\ index + 10' If next one is index + 10 then make the next one index + 10
// Ships cannot overlap
// Ships cannot go over the edge


/*

1. Make two functions - createHorizontalShip, createVerticalShip.
Withing these functions are the formulae for placement:

Horizontal: ((index + ship.size)) / width <= 1


*/

  let width = 10

  function createGrid() {
    for (let i = 0; i < (width * width); i++) {
      const square = document.createElement('div')
      document.querySelector('.grid').appendChild(square)
      square.classList.add('square')
    }
  }

  function computerPlaceShips() {

    const squares = document.querySelectorAll('.square')
    console.log(squares)

    const randomIndex = Math.floor(Math.random() * squares.length)

    for (let i = 0; i < 4; i++){
      const nextIndex = randomIndex + i
      const shipSquare = squares[nextIndex]
      shipSquare.classList.add('ship-square')
    }

  }

  createGrid()
  computerPlaceShips()












})
