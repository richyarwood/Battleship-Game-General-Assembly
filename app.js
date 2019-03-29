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

  function createGrid() {
    for (let i = 0; i < (width * width); i++) {
      const square = document.createElement('div')
      document.querySelector('.grid').appendChild(square)
      square.classList.add('square')
    }
  }


  function computerPlaceShips() {

    const squares = document.querySelectorAll('.square')

    let randomIndex = Math.floor(Math.random() * squares.length)
    console.log(randomIndex, 'Index')

    let columnIndex = (randomIndex % width)
    console.log(columnIndex, 'COL')

    let rowIndex = Math.floor(randomIndex/width)
    console.log(rowIndex, 'ROW')

    //Checking if horizontal ship fits row
    while ((width - columnIndex) < shipLength) {
      randomIndex = Math.floor(Math.random() * squares.length)
      columnIndex = (randomIndex % width)    //
      console.log(columnIndex, 'NEW COL INDEX')
      console.log(randomIndex, 'In while')
    }

    // Then need to check to see if randomIndex++ === squares.className('ship-square')

     // Creating a horizontal ship
    for (let i = 0; i < shipLength; i++) {
      const nextHorizontalIndex = randomIndex + i
      const shipSquare = squares[nextHorizontalIndex]
      shipSquare.classList.add('ship-square')
    }

    // Creating a vertical ship


    while ((rowIndex + shipLength) >= width) {
      randomIndex = Math.floor(Math.random() * squares.length)
      console.log(randomIndex, 'In while')

      columnIndex = (randomIndex % width)
      console.log(columnIndex, 'NEW COL INDEX')

      rowIndex = Math.floor(randomIndex/width)
      console.log(rowIndex, 'NEW ROW INDEX')


    }

    for (let i = 0; i < shipLength; i++) {
        const nextVerticalIndex = randomIndex + i * 10
        const shipSquare = squares[nextVerticalIndex]
        shipSquare.classList.add('ship-square')
      }
  }


  createGrid()
  computerPlaceShips()


// for (let i = 1;i<shipLength;i++){
//   if (randomIndex + i % width === 0) validPlacement = false
// }









})
