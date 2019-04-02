document.addEventListener('DOMContentLoaded', () => {


  const width = 10
  const shipLength = 3
  let numShips = 6
  let playerShips = 6
  let playerShipsLeft = 6
  let computerShipsLeft = 6

  let block

  let randomIndex
  let clickedIndex
  let orientation
  let placeShip
  const playerShipsObject = {}
  const computerShipsObject = {}

  let nextHitGuess
  let lastHit = null // Sets where next guess should be
  let nextHitMoves = [-1, -width, 1, width]

  const shipChoiceButtons = document.querySelectorAll('.player-choice-button')
  const horizontalBtn = document.getElementById('placeHorizontal')
  const verticalBtn = document.getElementById('placeVertical')

  let playerChoice = false
  let playerTurn = true
  let hitGuessExists = false

  const playerSquares = []
  const squares = []

  const resetBtn = document.querySelector('.reset-button')

  const shipsToPlace = document.getElementById('ships-to-place')
  const yourShipsDestroyed = document.getElementById('ships-destroyed')
  const computerShipsDestroyed = document.getElementById('comp-destroyed')
  const errorMessage = document.querySelector('.error-message')

  shipsToPlace.innerText = playerShips
  yourShipsDestroyed.innerText = 6
  computerShipsDestroyed.innerText = 6


  //CREATES THE GRIDS AND CALLS THE FUNCTION TO CREATE COMPUTER SHIPS====
  function createGrid() {

    //Computer grid
    for (let i = 0; i < (width * width); i++) {
      const square = document.createElement('div')
      document.querySelector('.grid').appendChild(square)
      square.classList.add('square')
      squares.push(square)
    }

    for (let i = 0; i < (width * width); i++) {
      const square = document.createElement('div')
      document.querySelector('.player-grid').appendChild(square)
      square.classList.add('player-square')
      playerSquares.push(square)
    }

    computerPlaceShips()
    addEventListeners()
  }


  function resetGame() {
    playerTurn = true
    placeShip = false
    playerShips = 6
    numShips = 6
    shipsToPlace.innerText = playerShips
    yourShipsDestroyed.innerText = 0
    computerShipsDestroyed.innerText = 0

    const playerSquares = document.querySelectorAll('.player-square')
    const computerSquares = document.querySelectorAll('.square')

    playerSquares.forEach(element => {
      element.className = 'player-square'
    })

    computerSquares.forEach(element => {
      element.className = 'square'
    })

    computerPlaceShips()
  }

// FUNCTION DISCUSSED WITH DEX USING FILTER NOT SPLICE
  // function educatedGuessFilterVersion(index) {
  //   let nextHitMoves = [-1, -10, 10, 1]
  //
  //   guess = nextHitMoves.filter(guess => !playerSquares[index + guess].classList.contains('hit') etc)
  //
  //   nextSquare = playerSquares[index + guess[Math.floor(Math.random() * nextHitMoves.length)]]
  //
  //   randomIndex = nextSquare
  //
  //   markAsHitOrMiss()
  // }


  //FUNCTION FOR COMPUTER TO MAKE AN EDUCATED GUESS
  // This function is called if hitGuessExists is true

  // If nextMoveRandom array.length > 0

  function computerEducatedGuess() {
    console.log(nextHitMoves, 'start')
    console.log('Educated guess is happening')

    let nextMoveRandom = Math.floor(Math.random() * nextHitMoves.length)
    console.log(nextMoveRandom, 'next move random')

    let nextSquare = playerSquares[lastHit + nextHitMoves[nextMoveRandom]]

    do {
      nextHitMoves.splice(nextHitMoves.indexOf(nextMoveRandom), 1)
      console.log(nextHitMoves, 'spliced')

      nextMoveRandom = Math.floor(Math.random() * nextHitMoves.length)
      console.log(nextMoveRandom, 'random after spliced')
      if (nextHitMoves.length === 0) {
        lastHit = false
        nextSquare = false
        nextHitMoves = [-1, -width, 1, width]
        console.log('nextMoves empty')
      } else {
        nextSquare = playerSquares[lastHit + nextHitMoves[nextMoveRandom]]
        console.log(nextSquare, 'Next sq post splice')
        console.log(nextHitMoves, 'post random')
      }
    } while (nextSquare && nextSquare.classList.contains('hit') || nextSquare.classList.contains('miss'))

    // Reset hitGuessExists to false once all squares used up
    randomIndex = lastHit + nextHitMoves[nextMoveRandom]
    markAsHitOrMiss()

  }


  // THIS CHECKS WHETHER THE COMPUTER'S GUESS IS A HIT OR A MISS ==========
  function markAsHitOrMiss(){

    if (playerSquares[randomIndex].classList.contains('ship')) {
      playerSquares[randomIndex].classList.add('hit')
      playerSquares[randomIndex].classList.remove('ship')

      isShipDestroyed()

      hitGuessExists = true
      lastHit = randomIndex
      console.log(randomIndex, 'hit')

      playerTurn = true

    } else { // Guess has missed
      playerSquares[randomIndex].classList.add('miss')
      playerSquares[randomIndex].classList.remove('block')

      console.log(randomIndex, 'miss')
      playerTurn = true
    }
  }


  function isShipDestroyed(){


    if (playerTurn) {
      //Checks if player has destroyed a ship
      const hitArray = computerShipsObject[squares[clickedIndex].dataset.computership]
      console.log(computerShipsObject)

      let count = 0

      for (let i = 0; i < hitArray.length; i++){
        const hitCheck = squares[hitArray[i]]
        console.log(hitCheck, 'Player Checked Array')
        if (hitCheck.classList.contains('hit')) {
          count++
          console.log(count, 'Player Count')
        }
        if (count === hitArray.length){
          computerShipsLeft--
          console.log(computerShipsLeft, 'Computer ships left')
          computerShipsDestroyed.innerText = computerShipsLeft
        }
      }
      playerTurn = false
      
    } else {
      //Checks if computer has destroyed a ship
      const hitArray = playerShipsObject[playerSquares[randomIndex].dataset.playership]
      console.log(playerShipsObject)

      let count = 0

      for (let i = 0; i < hitArray.length; i++){
        const hitCheck = playerSquares[hitArray[i]]
        console.log(hitCheck, 'Checked Array')
        if (hitCheck.classList.contains('hit')) {
          count++
          console.log(count, 'Count')
        }
        if (count === hitArray.length){
          playerShipsLeft--
          console.log(playerShipsLeft, 'Player ships left')
          yourShipsDestroyed.innerText = playerShipsLeft
        }
      }

    }
  }


  //FUNCTION FOR THE COMPUTER TO GUESS A RANDOM SQUARE==============
  function computerGuess() {

    randomIndex = Math.floor(Math.random() * playerSquares.length)

    while (playerSquares[randomIndex].classList.contains('hit') || playerSquares[randomIndex].classList.contains('miss')) {
      randomIndex = Math.floor(Math.random() * playerSquares.length)
    }
    markAsHitOrMiss()
  }


  //FUNCTION TO CHECK PLAYER HIT OR A MISS=================
  function checkIfHit() {
    if (playerShips === 0 && playerTurn) {

      if (this.classList.contains('ship')) {
        this.classList.add('hit')
        this.removeEventListener('click', checkIfHit)
        clickedIndex = squares.indexOf(this)
        console.log(squares.indexOf(this), 'Player click')
        isShipDestroyed()
      } else {
        this.classList.add('miss')
        this.removeEventListener('click', checkIfHit)
        playerTurn = false
      }
    } else {
      errorMessage.innerText = 'You need to place your ships first'
    }
    computerGuess()
  }

  // SETS AND SWITCHES THE PLAYER CHOICE BUTTONS=============
  function playerShipChoice() {
    if (this.id === 'placeHorizontal' && playerShips) {
      this.classList.add('selected')
      verticalBtn.classList.remove('selected')
      playerChoice = true
      orientation = 1

    } else if (playerShips) {
      this.classList.add('selected')
      horizontalBtn.classList.remove('selected')
      playerChoice = true
      orientation = 10
    }
    playerAddShips()
  }

  function playerAddShips() {
    playerSquares.forEach((element, index) => {
      element.addEventListener('click', () => {

        let playerCanPlaceShip = true

        if (playerChoice && playerShips) {
          const playerShipStart = index
          randomIndex = playerShipStart //Sets index for blockade

          const playerColumnIndex = (index % width)
          const playerRowIndex = Math.floor(index / width)

          if ((width - playerColumnIndex) < shipLength && orientation === 1) {
            playerCanPlaceShip = false
            errorMessage.innerText = 'Try again. Ship will go off board'
          } else if ((playerRowIndex - 1 + shipLength) >= width && orientation === 10) {
            playerCanPlaceShip = false
            errorMessage.innerText = 'Try again. Ship will go off board'
          }
          playerPlaceShips()
        }
      })
    })
  }

  function playerPlaceShips(){
    placeShip = true

    for (let i = 0; i < shipLength; i++) {
      const playerNextIndex = randomIndex + i * orientation
      if (playerSquares[playerNextIndex].classList.contains('ship') || playerSquares[playerNextIndex].classList.contains('block')) placeShip = false
      errorMessage.innerText = 'You can\'t overlap ships'
    }

    // Passes tests and can place the ship
    const playerShip = []
    let playerShipSquare
    if (placeShip) {
      for (let i = 0; i < shipLength; i++) {
        errorMessage.innerText = 'Place your ships'
        const playerNextIndex = randomIndex + i * orientation
        playerShipSquare = playerSquares[playerNextIndex]
        playerShipSquare.classList.add('ship')
        playerShipSquare.setAttribute('data-playership', playerShips)
        playerShip.push(playerNextIndex)
      }

      playerShipsObject[playerShipSquare.dataset.playership] = playerShip
      console.log(playerShipsObject)

      if (orientation === 1){
        blockAroundHorizontalShip()
      } else if (orientation === 10){
        blockAroundVerticalShip()
      }
      playerShips--
      if (playerShips === 0){
        errorMessage.innerText = 'Start playing'
      }
    }
    playerChoice = false
    horizontalBtn.classList.remove('selected')
    verticalBtn.classList.remove('selected')
    shipsToPlace.innerText = playerShips
  }

  //GENERATES THE COMPUTER SHIPS ====================
  function computerPlaceShips() {

    while (numShips > 0) {

      let canPlaceShip = true

      // Choose horizontal or vertical ship
      const randomDirection = Math.random() >= 0.5
      randomIndex = Math.floor(Math.random() * squares.length)

      let columnIndex = (randomIndex % width)
      let rowIndex = Math.floor(randomIndex / width)

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
          rowIndex = Math.floor(randomIndex / width)
        }
      }

      // creates ships

      for (let i = 0; i < shipLength; i++) {
        const nextIndex = randomIndex + i * orientation
        if (squares[nextIndex].classList.contains('ship') || squares[nextIndex].classList.contains('block')) canPlaceShip = false
      }

      const computerShip = []
      let shipSquare
      if (canPlaceShip) {
        for (let i = 0; i < shipLength; i++) {
          const nextIndex = randomIndex + i * orientation
          shipSquare = squares[nextIndex]
          shipSquare.classList.add('ship')
          shipSquare.setAttribute('data-computership', numShips)
          computerShip.push(nextIndex)
        }

        computerShipsObject[shipSquare.dataset.computership] = computerShip

        if (randomDirection === true) {
          blockAroundHorizontalShip()
        } else
          blockAroundVerticalShip()
        numShips--
      }
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
    if (columnIndex === 0 && rowIndex !== 0 && rowIndex !== width - shipLength) {
      endOfBlockade = startOfBlockade

      // If vertical ship against right
    } else if (columnIndex === 9 && rowIndex !== 0 && rowIndex !== (width - shipLength)) {
      startOfBlockade = endOfBlockade

      // If vertical ship on bottom row
    } else if (columnIndex !== width - width && columnIndex !== width - 1 && rowIndex === (width - shipLength)) {
      bottomBlockade = topBlockade
      lengthOfBlockade--

      // If vertical ship in top left corner
    } else if (randomIndex === 0) {
      startOfBlockade = randomIndex + 1
      endOfBlockade = startOfBlockade
      topBlockade = bottomBlockade
      lengthOfBlockade--

      // If vertical ship in the top right corner
    } else if (randomIndex === 9) {
      topBlockade = randomIndex + (shipLength * width)
      endOfBlockade = endOfBlockade + width
      startOfBlockade = endOfBlockade
      lengthOfBlockade--

      //Vertical ship ends bottom right corner
    } else if (columnIndex === width - 1 && rowIndex === width - shipLength) {
      startOfBlockade = startOfBlockade - 2
      bottomBlockade = topBlockade
      lengthOfBlockade--

      //Vertical ship ends bottom left corner
    } else if (columnIndex === 0 && rowIndex === width - shipLength) {
      endOfBlockade = startOfBlockade
      bottomBlockade = topBlockade
      lengthOfBlockade--

      //Vertical ship top row
    } else if (rowIndex === 0 && columnIndex !== 0 && columnIndex !== width - 1) {
      startOfBlockade = startOfBlockade + width
      endOfBlockade = endOfBlockade + width
      topBlockade = bottomBlockade
      lengthOfBlockade--
    }

    //Default vertical blockade and sets whether player board or computer
    block = squares
    if (placeShip) {
      block = playerSquares
    }

    block[topBlockade].classList.add('block') // vertical top middle
    block[bottomBlockade].classList.add('block') // vertical bottom middle

    for (let i = 0; i < ((lengthOfBlockade) * width); i = i + 10) {
      block[startOfBlockade + i].classList.add('block') // vertical right side
      block[endOfBlockade + i].classList.add('block') // vertical left side
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
    if (randomIndex === 0) {
      endOfBlockade++
      startOfBlockade = endOfBlockade
      leftBlockade = rightBlockade
      lengthOfBlockade--

      // If ship is against left side
    } else if (randomIndex % width === 0 && columnIndex === 0 & rowIndex !== width - 1) {
      startOfBlockade++
      endOfBlockade++
      leftBlockade = rightBlockade
      lengthOfBlockade--

      //If the ship is against right side
    } else if ((randomIndex + shipLength) % width === 0 && rowIndex !== 0 && rowIndex !== width - 1) {
      rightBlockade = leftBlockade
      lengthOfBlockade--

      // If ship is against the top
    } else if (rowIndex === 0 && columnIndex !== 0 && ((randomIndex + shipLength) % width > 0)) {
      startOfBlockade = endOfBlockade

      //If ship is in top left corner
    } else if (randomIndex === 0) {
      lengthOfBlockade--

      //If ship is in top right corner
    } else if (rowIndex === 0) {
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

    block = squares
    if (placeShip) {
      block = playerSquares
    }

    // Default blockade
    if (randomIndex === 0) {
      for (let i = 0; i < lengthOfBlockade; i++) {
        block[rightBlockade].classList.add('block') //right
        block[endOfBlockade + i].classList.add('block') // bottom
      }
    } else {
      block[rightBlockade].classList.add('block') //right
      block[leftBlockade].classList.add('block') //left

      for (let i = 0; i < lengthOfBlockade; i++) {
        block[startOfBlockade + i].classList.add('block') // top
        block[endOfBlockade + i].classList.add('block') // bottom
      }
    }
  }

  function addEventListeners() {
    // HIT DETECTION
    squares.forEach(element => {
      element.addEventListener('click', checkIfHit)
    })

    //WHERE A PLAYER PLACES A SHIP
    shipChoiceButtons.forEach(element => {
      element.addEventListener('click', playerShipChoice)
    })
  }

  resetBtn.addEventListener('click', resetGame)

  createGrid()

})
