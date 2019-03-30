document.addEventListener('DOMContentLoaded', () =>{


  const width = 10
  const shipLength = 3
  const numShips = 6
  let squares
  let randomIndex
  let leftOfShip, rightOfShip, startOfBlockade, endOfBlockade
  let orientation

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
    // Choose horizontal or vertical ship
    let randomDirection = Math.random() >= 0.5
    randomDirection = false
    console.log(randomDirection)

    randomIndex = Math.floor(Math.random() * squares.length)
    randomIndex = 60

    let columnIndex = (randomIndex % width)
    let rowIndex = Math.floor(randomIndex/width)
    console.log(randomIndex)

    //Make horizontal ship

    if (randomDirection === true) {
      orientation = 1
      while ((width - columnIndex) < shipLength) {
        console.log('Different random index')
        randomIndex = Math.floor(Math.random() * squares.length)
        columnIndex = (randomIndex % width)
      }
    } else {
      orientation = 10
      while ((rowIndex - 1 + shipLength) >= width) {
        randomIndex = Math.floor(Math.random() * squares.length)
        columnIndex = (randomIndex % width)
        rowIndex = Math.floor(randomIndex/width)
      }
    }
    for (let i = 0; i < shipLength; i++) {
      const nextVerticalIndex = randomIndex + i * orientation
      const shipSquare = squares[nextVerticalIndex]
      shipSquare.classList.add('ship')
    }

    // if (randomDirection === true){
      // blockAroundHorizontalShip()
    // } else
    blockAroundVerticalShip()
  }

  function blockAroundVerticalShip() {
    let lengthOfBlockade = shipLength + 2
    const rowIndex = Math.floor(randomIndex / width)
    const columnIndex = (randomIndex % width)
    console.log(columnIndex, 'Col i')
    let startOfBlockade = (randomIndex - width + 1)
    console.log(startOfBlockade ,'Initial start')
    let endOfBlockade = (randomIndex - width - 1)
    let topBlockade = (randomIndex - width)
    let bottomBlockade = (randomIndex + (shipLength * width))


    // If vertical ship against left
    if (columnIndex === 0 && rowIndex !== 0){
      console.log('vertical left hand side')
      endOfBlockade = startOfBlockade

      // If vertical ship against right
    }

      //Basic vertical blockade
      squares[topBlockade].classList.add('block') // vertical top middle
      console.log(topBlockade, 'vertical top')
      squares[bottomBlockade].classList.add('block') // vertical bottom middle
      console.log(bottomBlockade, 'vertical bottom')

      for (let i = 0; i < ((lengthOfBlockade) * width); i = i + 10) {
        squares[startOfBlockade + i].classList.add('block') // vertical right side
        console.log(startOfBlockade, 'vertical right side')
        squares[endOfBlockade + i].classList.add('block') // vertical left side
        console.log(endOfBlockade, 'vertical left side')
      }
    }



  function blockAroundHorizontalShip() {

    let lengthOfBlockade = shipLength + 2

    const rowIndex = Math.floor(randomIndex / width)
    const columnIndex = (randomIndex % width)

    let startOfBlockade = (randomIndex - width - 1)
    console.log(startOfBlockade ,'Initial start')

    let endOfBlockade = (randomIndex + width - 1)
    console.log(endOfBlockade, 'Initial end')

    let leftBlockade = randomIndex - 1
    console.log(leftBlockade, 'left')

    let rightBlockade = (randomIndex + shipLength)
    console.log(rightBlockade, 'right')

    // If ship is against left side
    if (randomIndex % width === 0 && columnIndex === 0 & rowIndex !== width - 1){
      console.log('left side')
      startOfBlockade++
      endOfBlockade++
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

      //Bottom row
    } else if (rowIndex === width - 1 && columnIndex !== 0 && columnIndex !== width - shipLength) {
      console.log('bottom row')
      endOfBlockade = startOfBlockade

      //If ship is bottom right corner
    } else if ((randomIndex + shipLength) % 10 === 0 && rowIndex === width - 1) {
      console.log('bottom right corner')
      endOfBlockade = startOfBlockade
      rightBlockade = leftBlockade
      lengthOfBlockade--
    }

    // Laying down the blockade
    if (randomIndex === 0) {
      for (let i = 0; i < lengthOfBlockade; i++){
        squares[rightBlockade].classList.add('block') //right
        squares[endOfBlockade + i].classList.add('block') // bottom
      }
    } else {
      squares[rightBlockade].classList.add('block') //right
      squares[leftBlockade].classList.add('block') //left

      for (let i = 0; i < lengthOfBlockade; i++){
        squares[startOfBlockade + i].classList.add('block') // top
        console.log(startOfBlockade + i , 'top')

        squares[endOfBlockade + i].classList.add('block') // bottom
        console.log(endOfBlockade, 'bottom')
      }
    }


  }


  createGrid()

})
