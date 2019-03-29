document.addEventListener('DOMContentLoaded', () =>{


  const width = 10
  const shipLength = 1
  const numShips = 6
  let squares
  let randomIndex

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
    console.log(randomIndex)
    squares[randomIndex].classList.add('ship')
    blockAroundPlacedShip()
  }

  function blockAroundPlacedShip() {

    let leftOfShip = squares[randomIndex - 1].classList.add('block')

    let rightOfShip = squares[randomIndex + 1].classList.add('block')

    let lengthOfBlockade = shipLength + 2

    for (let i = 0; i < lengthOfBlockade; i++){
      let startOfBlockade = squares[randomIndex - width - 1 + i].classList.add('block')

      let endOfBlockade = squares[randomIndex + width - 1 + i].classList.add('block')
    }

  }



    // return addBlock.repeat(startOfBlockade + lengthOfBlockade)


    //'*'.repeat(string.length + 4)


  createGrid()




})
