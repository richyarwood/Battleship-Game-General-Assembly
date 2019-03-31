document.addEventListener('DOMContentLoaded', () => {


  const width = 10
  const shipLength = 3
  let numShips = 6
  let playerShips = 6

  let squares
  let playerSquares

  let randomIndex
  let leftOfShip, rightOfShip, startOfBlockade, endOfBlockade
  let orientation

  const shipChoiceButtons = document.querySelectorAll('.player-choice-button')
  const horizontalBtn = document.getElementById('placeHorizontal')
  const verticalBtn = document.getElementById('placeVertical')

  let playerChoice = false
  let playerTurn = true

  const resetBtn = document.querySelector('.reset-button')

  const shipsToPlace = document.getElementById('ships-to-place')
  const yourShipsDestroyed = document.getElementById('ships-destroyed')
  const computerShipsDestroyed = document.getElementById('comp-destroyed')
  const errorMessage = document.querySelector('.error-message')

  shipsToPlace.innerText = playerShips
  yourShipsDestroyed.innerText = 0
  computerShipsDestroyed.innerText = 0


  //CREATES THE GRIDS AND CALLS THE FUNCTION TO CREATE COMPUTER SHIPS====
  function createGrid() {

    //Computer grid
    for (let i = 0; i < (width * width); i++) {
      const square = document.createElement('div')
      document.querySelector('.grid').appendChild(square)
      square.classList.add('square')
      square.setAttribute('data-computership', '0')
    }
    squares = document.querySelectorAll('.square')

    for (let i = 0; i < (width * width); i++) {
      const square = document.createElement('div')
      document.querySelector('.player-grid').appendChild(square)
      square.classList.add('player-square')
      square.setAttribute('data-playership', '0')
    }
    playerSquares = document.querySelectorAll('.player-square')

    computerPlaceShips()
    addEventListeners()
  }


  function resetGame() {
    playerTurn = true
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

  //FUNCTION FOR THE COMPUTER TO GUESS A SQUARE================
  function computerGuess() {
    if (!playerTurn) {


      randomIndex = Math.floor(Math.random() * playerSquares.length)

      while (playerSquares[randomIndex].classList.contains('hit') || playerSquares[randomIndex].classList.contains('miss')) {
        randomIndex = Math.floor(Math.random() * playerSquares.length)
      }

      if (playerSquares[randomIndex].classList.contains('ship')) {
        playerSquares[randomIndex].classList.add('hit')
      } else {
        playerSquares[randomIndex].classList.add('miss')
      }

      // Need to search the grid for squares with hit
      playerSquares.forEach((element, index) => {
        element.filter(element.classList.contains('.player-square.ship.hit'))
        console.log(element[index])
      })

      // If find a square with hit, get the index
      // Make the randomindex this index and then choose a square near it
      // But do not choose a square near it if it is a hit or a miss

      playerTurn = true
    }
  }

  function checkIfDestroyed() {
    playerSquares.forEach(element => {
      const playerSquareValue = [element.dataset.playership]
    })

    // look for all of the values
    // if all of a value also has class of hit, add a class of destroyed
    //
  }


  //FUNCTION TO CHECK IF IS A HIT OR A MISS=================
  function checkIfHit() {
    if (playerShips === 0 && playerTurn) {

      if (this.classList.contains('ship')) {
        this.classList.add('hit')
        playerTurn = false
        this.removeEventListener('click', checkIfHit)
      } else {
        this.classList.add('miss')
        this.removeEventListener('click', checkIfHit)
        playerTurn = false
      }
    } else {
      alert('You need to place your ships first')
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

      if (canPlaceShip) {
        for (let i = 0; i < shipLength; i++) {

          const nextIndex = randomIndex + i * orientation
          const shipSquare = squares[nextIndex]

          shipSquare.classList.add('ship')
          shipSquare.setAttribute('data-computership', numShips)
        }
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

    // Default blockade
    if (randomIndex === 0) {
      for (let i = 0; i < lengthOfBlockade; i++) {
        squares[rightBlockade].classList.add('block') //right
        squares[endOfBlockade + i].classList.add('block') // bottom
      }
    } else {
      squares[rightBlockade].classList.add('block') //right
      squares[leftBlockade].classList.add('block') //left

      for (let i = 0; i < lengthOfBlockade; i++) {
        squares[startOfBlockade + i].classList.add('block') // top
        squares[endOfBlockade + i].classList.add('block') // bottom
      }
    }


  }


  function playerAddShips() {
    playerSquares.forEach((element, index) => {
      element.addEventListener('click', () => {

        let playerCanPlaceShip = true

        if (playerChoice && playerShips) {
          const playerShipStart = index

          const playerColumnIndex = (index % width)
          const playerRowIndex = Math.floor(index / width)


          if ((width - playerColumnIndex) < shipLength && orientation === 1) {
            playerCanPlaceShip = false
            errorMessage.innerText = 'Try again.\n Ship will go off board'
          } else if ((playerRowIndex - 1 + shipLength) >= width && orientation === 10) {
            playerCanPlaceShip = false
            errorMessage.innerText = 'Try again.\n Ship will go off board'
          } else if (playerCanPlaceShip) {

            let placeShip = true

            for (let i = 0; i < shipLength; i++) {
              const playerNextIndex = playerShipStart + i * orientation
              const playerShipSquare = playerSquares[playerNextIndex]
              if (playerSquares[playerNextIndex].classList.contains('ship') || playerSquares[playerNextIndex].classList.contains('block')) placeShip = false
              errorMessage.innerText = 'You can\'t overlap ships'
            }


            if (placeShip) {
              for (let i = 0; i < shipLength; i++) {
                errorMessage.innerText = ''
                const playerNextIndex = playerShipStart + i * orientation
                const playerShipSquare = playerSquares[playerNextIndex]
                playerShipSquare.classList.add('ship')
                playerShipSquare.setAttribute('data-playership', playerShips)
              }
              playerShips--
            }
            playerChoice = false
            horizontalBtn.classList.remove('selected')
            verticalBtn.classList.remove('selected')
            shipsToPlace.innerText = playerShips
          }
        }
      })
    })
  }

  function addEventListeners() {
    playerSquares = document.querySelectorAll('div.player-square')

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