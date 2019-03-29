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
  let shipLength = 4
  const numShips = 6

  function createGrid() {
    for (let i = 0; i < (width * width); i++) {
      const square = document.createElement('div')
      document.querySelector('.grid').appendChild(square)
      square.classList.add('square')
    }
    for (let i = 0; i < numShips; i++){
      computerPlaceShips()
    }
  }

  function computerPlaceShips() {

    const squares = document.querySelectorAll('.square')
    let randomIndex = Math.floor(Math.random() * squares.length)
    let columnIndex = (randomIndex % width)
    let rowIndex = Math.floor(randomIndex/width)
    console.log(randomIndex, 'Index', columnIndex, 'COL', rowIndex, 'ROW')

    let randomDirection = Math.random() >= 0.5
    console.log(randomDirection)

    if (randomDirection === true) {
      //Checking if horizontal ship fits row
      while ((width - columnIndex) < shipLength) {
        randomIndex = Math.floor(Math.random() * squares.length)
        columnIndex = (randomIndex % width)
        console.log(columnIndex, 'NEW COL INDEX', randomIndex, 'NEW RANDOM INDEX')
      }

       // Creating a horizontal ship
      for (let i = 0; i < shipLength; i++) {
        const nextHorizontalIndex = randomIndex + i
        const shipSquare = squares[nextHorizontalIndex]
        shipSquare.classList.add('ship-square')
      }
    } else {
      while ((rowIndex - 1 + shipLength) >= width) {
        randomIndex = Math.floor(Math.random() * squares.length)
        columnIndex = (randomIndex % width)
        rowIndex = Math.floor(randomIndex/width)
      }

      for (let i = 0; i < shipLength; i++) {
        const nextVerticalIndex = randomIndex + i * 10
        const shipSquare = squares[nextVerticalIndex]
        shipSquare.classList.add('ship-square')
      }
    }


    // Creating a vertical ship
  }


  createGrid()








})
