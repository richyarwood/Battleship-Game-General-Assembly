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
    createShips()
  }

  function computerPlaceShips() {

      // Choose horizontal or vertical ship
      let randomDirection = Math.random() >= 0.5
      randomIndex = Math.floor(Math.random() * squares.length)

      let columnIndex = (randomIndex % width)
      let rowIndex = Math.floor(randomIndex/width)

      //Make horizontal ship
      if (randomDirection === true) {
        orientation = 1
        while ((width - columnIndex) < shipLength) {
          randomIndex = Math.floor(Math.random() * squares.length)
          columnIndex = (randomIndex % width)
        }
        // Make vertical ship
      } else {
        orientation = 10
        while ((rowIndex - 1 + shipLength) >= width) {
          randomIndex = Math.floor(Math.random() * squares.length)
          columnIndex = (randomIndex % width)
          rowIndex = Math.floor(randomIndex/width)
        }
      }
      // creates ships
      for (let i = 0; i < shipLength; i++) {

        const nextIndex = randomIndex + i * orientation
        const shipSquare = squares[nextIndex]
        shipSquare.classList.add('ship')
      }
      if (randomDirection === true){
        blockAroundHorizontalShip()
      } else
      blockAroundVerticalShip()

  }

  function createShips(){
    for (let i = 0; i < numShips; i++){
      computerPlaceShips()
    }
  }

//CREATES THE BLOCKADE AROUND THE VERTICAL SHIP==============
  function blockAroundVerticalShip() {
    let lengthOfBlockade = shipLength + 2
    const rowIndex = Math.floor(randomIndex / width)
    const columnIndex = (randomIndex % width)
    let startOfBlockade = (randomIndex - width + 1)
    let endOfBlockade = (randomIndex - width - 1)
    let topBlockade = (randomIndex - width)
    let bottomBlockade = (randomIndex + (shipLength * width))


    // If vertical ship against left
    if (columnIndex === 0 && rowIndex !== 0 && rowIndex !== width - shipLength){
      endOfBlockade = startOfBlockade

      // If vertical ship against right
    } else if (columnIndex === 9 && rowIndex !== 0 && rowIndex !== (width - shipLength)){
      startOfBlockade = endOfBlockade

      // If vertical ship on bottom row
    } else if (columnIndex !== width - width && rowIndex === (width - shipLength)) {
      bottomBlockade = topBlockade
      lengthOfBlockade--

      // If vertical ship in top left corner
    } else if (randomIndex === 0){
      startOfBlockade = randomIndex + 1
      endOfBlockade = startOfBlockade
      topBlockade = bottomBlockade
      lengthOfBlockade--

      // If vertical ship in the top right corner
    } else if (randomIndex === 9){
      topBlockade = randomIndex + (shipLength * width)
      endOfBlockade = endOfBlockade + width
      startOfBlockade = endOfBlockade
      lengthOfBlockade--


      //Vertical ship ends bottom right corner
    } else if (columnIndex === width - 1 && rowIndex === width - shipLength) {
      startOfBlockade = endOfBlockade
      bottomBlockade = topBlockade
      lengthOfBlockade--

      //Vertical ship ends bottom left corner
    } else if (columnIndex === 0 && rowIndex === width - shipLength){
      endOfBlockade = startOfBlockade
      bottomBlockade = topBlockade
      lengthOfBlockade--

      //Vertical ship top row
    } else if (rowIndex === 0 && columnIndex !== 0 && columnIndex !== width - 1){
      startOfBlockade = startOfBlockade + width
      endOfBlockade = endOfBlockade + width
      topBlockade = bottomBlockade
      lengthOfBlockade--
    }

      //Default vertical blockade
      squares[topBlockade].classList.add('block') // vertical top middle
      squares[bottomBlockade].classList.add('block') // vertical bottom middle

      for (let i = 0; i < ((lengthOfBlockade) * width); i = i + 10) {
        squares[startOfBlockade + i].classList.add('block') // vertical right side
        squares[endOfBlockade + i].classList.add('block') // vertical left side
      }
    }


//CREATES THE BLOCKADE AROUND THE HORIZONTAL SHIP==============
  function blockAroundHorizontalShip() {
    let lengthOfBlockade = shipLength + 2
    const rowIndex = Math.floor(randomIndex / width)
    const columnIndex = (randomIndex % width)
    let startOfBlockade = (randomIndex - width - 1)
    let endOfBlockade = (randomIndex + width - 1)
    let leftBlockade = randomIndex - 1
    let rightBlockade = (randomIndex + shipLength)

    // If ship in top left corner
    if (randomIndex === 0){
      endOfBlockade++
      startOfBlockade = endOfBlockade
      leftBlockade = rightBlockade
      lengthOfBlockade--

    // If ship is against left side
    }else if (randomIndex % width === 0 && columnIndex === 0 & rowIndex !== width - 1){
      startOfBlockade++
      endOfBlockade++
      leftBlockade = rightBlockade
      lengthOfBlockade--

      //If the ship is against right side
    } else if ((randomIndex + shipLength) % width === 0 && rowIndex !== 0 && rowIndex !== width - 1){
      rightBlockade = leftBlockade
      lengthOfBlockade--

      // If ship is against the top
    } else if (rowIndex === 0 && columnIndex !== 0 && ((randomIndex + shipLength) % width > 0)){
      startOfBlockade = endOfBlockade

      //If ship is in top left corner
    } else if (randomIndex === 0) {
      lengthOfBlockade--

      //If ship is in top right corner
    } else if (rowIndex === 0){
      rightBlockade = leftBlockade
      startOfBlockade = endOfBlockade
      lengthOfBlockade--

      //If ship is bottom left corner
    } else if (columnIndex === 0 && rowIndex === width - 1) {
      startOfBlockade++
      endOfBlockade = startOfBlockade
      leftBlockade = rightBlockade
      lengthOfBlockade--

      //Bottom row
    } else if (rowIndex === width - 1 && columnIndex !== 0 && columnIndex !== width - shipLength) {
      endOfBlockade = startOfBlockade

      //If ship is bottom right corner
    } else if ((randomIndex + shipLength) % 10 === 0 && rowIndex === width - 1) {
      endOfBlockade = startOfBlockade
      rightBlockade = leftBlockade
      lengthOfBlockade--
    }

    // Default blockade
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
        squares[endOfBlockade + i].classList.add('block') // bottom
      }
    }


  }


  createGrid()

})
