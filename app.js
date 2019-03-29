document.addEventListener('DOMContentLoaded', () =>{


  const width = 10
  const shipLength = 3
  const numShips = 6
  let squares
  let randomIndex
  let leftOfShip, rightOfShip, startOfBlockade, endOfBlockade

  function createGrid() {
    for (let i = 0; i < (width * width); i++) {
      const square = document.createElement('div')
      document.querySelector('.grid').appendChild(square)
      square.classList.add('square')
    }
    squares = document.querySelectorAll('.square')
    computerPlaceShips()
  }

  function computerPlaceShips() {
    randomIndex = Math.floor(Math.random() * squares.length)
    randomIndex = 97
    console.log(randomIndex)
    for (let i = 0; i < shipLength; i++){
      const nextIndex = randomIndex + i
      const shipSquares = squares[nextIndex]
      shipSquares.classList.add('ship')

    }
    blockAroundPlacedShip()
  }

  function blockAroundPlacedShip() {

    let lengthOfBlockade = shipLength + 2

    let rowIndex = Math.floor(randomIndex / width)
    let columnIndex = (randomIndex % width)

    let startOfBlockade = (randomIndex - width - 1)
    console.log(startOfBlockade ,'Initial start')

    let endOfBlockade = (randomIndex + width - 1)
    console.log(endOfBlockade, 'Initial end')

    let leftBlockade = randomIndex - 1
    console.log(leftBlockade, 'left')

    let rightBlockade = (randomIndex + shipLength)
    console.log(rightBlockade, 'right')

    // If ship is against left side
    if (startOfBlockade % width === width - 1 && columnIndex === 0 & rowIndex !== width - 1){
      console.log('left side')
      startOfBlockade = (randomIndex - width)
      endOfBlockade = (randomIndex + width)
      leftBlockade = rightBlockade
      console.log(leftBlockade, 'left-hidden')
      lengthOfBlockade--

      //If the ship is against right side
    } else if ((randomIndex + shipLength) % width === 0 && rowIndex !== 0 && rowIndex !== width - 1){
      rightBlockade = leftBlockade
      console.log(rightBlockade, 'right-hidden')
      lengthOfBlockade--

      // If ship is against the top
    } else if (rowIndex === 0 && columnIndex !== 0 && ((randomIndex + shipLength) % width > 0)){
      console.log('top row not corners')
      startOfBlockade = endOfBlockade

      //If ship is in top left corner
    } else if (randomIndex === 0) {
      console.log('top left corner')
      endOfBlockade++
      startOfBlockade = endOfBlockade
      console.log(startOfBlockade, 'start top corner')
      leftBlockade = rightBlockade
      lengthOfBlockade--

      //If ship is in top right corner
    } else if (rowIndex === 0){
      console.log('top right corner end')
      rightBlockade = leftBlockade
      startOfBlockade = endOfBlockade
      lengthOfBlockade--

      //If ship is bottom left corner
    } else if (columnIndex === 0 && rowIndex === width - 1) {
      console.log('bottom left corner')
      startOfBlockade++
      endOfBlockade = startOfBlockade
      leftBlockade = rightBlockade
      lengthOfBlockade--

      //If ship is bottom right corner
    } else if ((randomIndex + shipLength) % 10 === 0 && rowIndex === width - 1) {
      console.log('bottom right corner')
      endOfBlockade = startOfBlockade
      rightBlockade = leftBlockade
      lengthOfBlockade--
    }

    // Laying down the blockade
    squares[leftBlockade].classList.add('block') //left
    squares[rightBlockade].classList.add('block') //right

    for (let i = 0; i < lengthOfBlockade; i++){
      squares[startOfBlockade + i].classList.add('block') // top
      console.log(startOfBlockade + i , 'top')

      squares[endOfBlockade + i].classList.add('block') // bottom
      console.log(endOfBlockade, 'bottom')
    }

  }


  createGrid()




})
