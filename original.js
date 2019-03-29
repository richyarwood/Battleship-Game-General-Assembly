document.addEventListener('DOMContentLoaded', () => {



  let width = 10
  let shipLength = 4
  const numShips = 6
  const squares = document.querySelectorAll('.square')
  let randomIndex = Math.floor(Math.random() * squares.length)
  let columnIndex = (randomIndex % width)
  let rowIndex = Math.floor(randomIndex/width)

  function createGrid() {
    for (let i = 0; i < (width * width); i++) {
      const square = document.createElement('div')
      document.querySelector('.grid').appendChild(square)
      square.classList.add('square')
    }
  }

  function shipBlockade() {
    console.log(squares, 'squares')
    let noGoLength = shipLength + 2
    let noGoStart = squares[randomIndex - width - 1]
    console.log(noGoStart)

    noGoStart.classList.add('no-go')

  }

// When create ship need another FUNCTION which puts a blockade around the ship. But not if it is in column 0 as will go to previous row. So this is randomIndex
/*

lengthOfNoGo = length + 2

This checks if the randomIndex is in column 0

    startOfNoGo = randomIndex - width - 1

    if (startOfNoGo % width === width - 1)

    start = 0
    length--

*/


  function computerPlaceShips() {
    const randomDirection = Math.random() >= 0.5
    const squares = document.querySelectorAll('.square')
    let randomIndex = Math.floor(Math.random() * squares.length)
    let columnIndex = (randomIndex % width)
    let rowIndex = Math.floor(randomIndex/width)
    console.log(columnIndex, 'COL INDEX', randomIndex, 'RANDOM INDEX')

//HORIZONTAL SHIP=============================

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
      shipBlockade()
    } else {

  //VERTICAL SHIP=============================

      while ((rowIndex - 1 + shipLength) >= width) {
        randomIndex = Math.floor(Math.random() * squares.length)
        columnIndex = (randomIndex % width)
        rowIndex = Math.floor(randomIndex/width)
        console.log(columnIndex, 'NEW COL INDEX', randomIndex, 'NEW RANDOM INDEX')
      }

      for (let i = 0; i < shipLength; i++) {
        const nextVerticalIndex = randomIndex + i * 10
        const shipSquare = squares[nextVerticalIndex]
        shipSquare.classList.add('ship-square')
      }
      shipBlockade()
    }
  }

  createGrid()
  computerPlaceShips()

})
