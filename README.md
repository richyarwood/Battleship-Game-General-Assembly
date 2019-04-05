# GA-SEI-project-01

[battleship]: https://richyarwood.github.io/GA-SEI-project-01/
[githubrepo]: https://github.com/richyarwood/GA-SEI-project-01

## Timeframe
7 days

## Technologies used
* JavaScript (ES6)
* HTML5/HTML5 audio
* CSS/Flexbox
* GitHub

## [Battleship][battleship] - made using vanilla JavaScript

The game can be found on this [GitHub repo][githubrepo] and can be played by cloning the repo and opening the `index.html` file in a browser.

Alternatively, you can play the game using this [hosted version][battleship] on GitHub Pages.

### Game overview
This version is a single player game against the computer. The objective of the game is to find and destroy all of the computer ships before yours are found and destroyed.

The player and computer get seven ships to place on a 10 x 10 grid. Each side has the following ships (length of squares in brackets):

* 1 x Aircraft Carrier (5 squares)
* 1 x Battleship (4 squares)
* 1 x Cruiser (3 squares)
* 2 x Destroyer (2 squares)
* 2 x Submarine (1 square)

When the game starts, the computer grid is set up and the computer ships are placed randomly on the board and hidden from view.

#### Player grid set up
There are two important things to remember:
1. Ships **cannot run over the sides of the grid** and must be on one row or column
2. There needs to be **one square between each ship**. Ships cannot be placed immediately next to each other. This **exclusion zone** will be marked by light grey squares on the player grid.

![Placing ships on the grid](https://user-images.githubusercontent.com/40695746/55616078-f17a3e80-5788-11e9-9a75-2dedc1ebbe0c.png)

Remember these points when you are guessing where the computer ships are placed!

**Placing your ships**
1. Make a choice from horizontal or vertical.
2. Choose from the available ships.
3. Click on a square on the player grid.

The choice of ship button will be greyed out once you have placed it.

#### Playing the Game
Once all of you ships are placed, you can make a choice on the computer grid. The game will indicate whether this is a hit or a miss and then the computer will take it\'s turn.

When all squares for a ship are hit, the number of ships left will go down by one.

![Screenshot 2019-04-05 at 10 03 35](https://user-images.githubusercontent.com/40695746/55616613-18854000-578a-11e9-87ac-5b64ddc7b9f2.png)

The first player to get the opponents ships to zero is the winner.

### Development process
The greatest challenge in this game, is the random placement of the ships, ensuring that the ships remain on one row or column and do not overlap each other.

As such, my project plan to get to MVP started with setting up the grid and designing a way to place the ships.

#### Grid set up
There are two 10 x 10 grids. These are created in JavaScript on page load.
 ```
 function createGrid() {

   for (let i = 0; i < (width * width); i++) {
     const compGridSquare = document.createElement('div')
     document.querySelector('.grid').appendChild(compGridSquare)
     compGridSquare.classList.add('square')
     computerSquares.push(compGridSquare) //Array of computer grid
   }

   for (let i = 0; i < (width * width); i++) {
     const playerGridSquare = document.createElement('div')
     document.querySelector('.player-grid').appendChild(playerGridSquare)
     playerGridSquare.classList.add('player-square')
     playerSquares.push(playerGridSquare) // Array of player grid
   }

   shipsToPlace.innerText = playerShips

   computerPlaceShips()
   addEventListeners()
 }
 ```
The function ```computerPlaceShips()``` iterates over a ```shipType``` array attempting to place the ships on the computer grid. Horizontal or vertical orientations are selected randomly.

Computer ships are placed on the grid with a class of ```ship``` and a data parameter. For example:

```
<div class="square ship" data-computership="submarine2">
</div>
```

These values are used to mark the squares to indicate a hit and also to monitor whether a ship is destroyed.

A number of ```while``` loops run until the all ships are in place. The conditions in these loops check whether the ship will go off the board or overlap another ship. For example:

```
while ((width - columnIndex) < shipLength) {
  randomIndex = Math.floor(Math.random() * computerSquares.length)
  columnIndex = (randomIndex % width)
}
```

**Blockade set up**
Two functions ```blockAroundHorizontalShip()``` and ```blockAroundVerticalShip()``` generate an additional class of ```block``` around the ship which prevents overlap. These functions are repurposed when the player places ships.

The challenge within this process was to take in to consideration starting indices which where on the edges or corners of the grid. In these instances the blockade needed to be customised. This was achieved through a series of conditional statements. For example:

```
if (columnIndex === 0 && rowIndex !== 0 && rowIndex !== width - shipLength) {
  endOfBlockade = startOfBlockade

  // If vertical ship against right
} else if (columnIndex === 9 && rowIndex !== 0 && rowIndex !== (width - shipLength)) {
  startOfBlockade = endOfBlockade

  // If vertical ship on bottom row
} else if (columnIndex !== width - width && columnIndex !== width - 1 && rowIndex === (width - shipLength)) {
  bottomBlockade = topBlockade
  lengthOfBlockade--
  ```

### Player set up
The player placement of ships is achieved through taking the ids of the ship type buttons ```<div class="ship-button" id="carrier" data-shipsize='5'>
    Aircraft carrier
  </div>``` and using ```find()``` to select the ship size from the array of ship objects.

On click, the code checks whether the player could place the ship in that spot, checking for ```columnIndex``` and ```rowIndex``` and whether the ship would overlap another. If these tests are passed, the ship is placed on the player grid.

### Storing ship positions
On creation of the computer and player ships, each ship is pushed in to an object, creating a series of key value pairs where the key is the name of the ship and the values are the indices. For example:

```
computerShipsObject = {
cruiser: [12,13,14]
destroyer1: [55,65]
}
```

### Checking for hits and misses
When clicking a square on the computer grid, the code checks whether the square contains ```ship```. If it does, a class of ```hit``` is added. If not then ```miss``` is added. The front end reflects this and a sound is played.

A ```setTimeout()``` method is used to ensure that the audio did not cut out and after a period of time the function ```computerGuess``` is called for the computer to take a turn.

After each turn the function ```isShipDestroyed()``` is called to check whether all indices have a class of hit for that ship. If this is true then the number of ships left for that player is reduced.

## Wins
Placing the ships on the board and recording whether a ship is destroyed was a challenging process.

### Future enhancements
Developing a function which triggers a more educated guess by the computer if a hit is achieved.
