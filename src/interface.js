/*  Will be brought back if this is ever moved to a proper backend for multiplayer.
const {
  createBoard,
  placeShip,
  fire
} = require('./battleship');
*/
let playerBoard;
let opponentBoard;
let currentTurn;
let gameStage = 'over';
let winLoss = [0, 0];
let playerShips;
let opponentShips;

const startGame = function(goesFirst) {
  if (gameStage === 'over' ||
      gameStage === undefined) {
    gameStage = 'placement';

    playerBoard = createBoard();
    opponentBoard = createBoard();
  }
  if (gameStage === 'placement') {
    // Check if all ships are placed.
    // If they are not, tell the player to place them.
    // If they are, start the match.
    if (areAllShipsPlaced()) {
      dumbPlacement(opponentBoard, 'computer');
      playerShips = 5;
      opponentShips = 5;
      gameStage = 'playing';
      if (goesFirst === 'player') {
        currentTurn = 'player';
      } else {
        currentTurn = 'opponent';
      }
    }
  }
  if (gameStage === 'playing') {
    // Ask the player if they would like to restart.
    // If they would, clear the boards and set to placement.
  }
};

const requestPlaceShip = function(x, y, ship, orientation) {
  // Will return true if placed, and false if not.
  if (gameStage === 'placement') {
    return placeShip(x, y, ship, orientation, playerBoard, 'player');
  }
};

const requestRemoveShip = function(ship) {
  // Will return true if removed, and false if not.
  if (gameStage === 'placement') {
    return removeShip(ship, playerBoard, 'player');
  }
};

const areAllShipsPlaced = function() {
  // Will return true if every ship has been placed.
  if (isShipPlaced('carrier', 'player') &&
      isShipPlaced('battleship', 'player') &&
      isShipPlaced('cruiser', 'player') &&
      isShipPlaced('submarine', 'player') &&
      isShipPlaced('destroyer', 'player')) {
        return true;
      } else {
        alert('Please place all of your ships.');
        return false;
      }
};

const requestFire = function(x, y) {
  if (currentTurn !== 'player') return;
  

  if (fire(x, y, opponentBoard, 'computer')) {
    logShot(x, y, true, 'player');
    if (didSink(x, y, opponentBoard[x][y].shipType, opponentBoard, 'computer')) {
      logSink(opponentBoard[x][y].shipType, 'player');  
      opponentShips--;
      // If opponentShips hits 0, win.
    }
    endTurn();
    return true;
  }
  logShot(x,y, false, 'player');
  endTurn();
  return false;
};

const endTurn = function() {
  currentTurn = 'opponent';
  opponentTurn();
};

const opponentTurn = function() {
  const [x, y, hitStatus] = dumbShot(playerBoard, 'player');
  const cell = convertCoordsToCell(x, y, boardIds[0]);

  logShot(x, y, hitStatus, 'computer');
  if (hitStatus) {
    if (didSink(x, y, playerBoard[x][y].shipType, playerBoard, 'player')) {
      logSink(playerBoard[x][y].shipType, 'opponent');
      playerShips--;
    }
    drawHit(cell);
  } else {
    drawMiss(cell);
  }
  currentTurn = 'player';
};

const didSink = function(x, y, ship, targetBoard, targetPlayer) {

  if (SHIPS[targetBoard[x][y].shipType][targetPlayer].hp === 0) return true;
  return false;
};

const getScore = function() {
  return winLoss;
};

const requests = {
  'startGame': startGame,
  'fire': requestFire,
  'placeShip': requestPlaceShip,
  'requestRemoveShip': requestRemoveShip,
  'endTurn': endTurn,
  'getScore': getScore,
};

const directions = {
  'opponentsShot': 0
};

const gameOver(winner) {

};

// DEPRECATED FOR LOCAL GAME TYPE.
// These functions will likely be used if I overhaul the code to allow for multiplayer
// As it stands, they can be ignored.

// Include for main.js, will handle communication back and forth
// between it and the battleship file.
// Effectively exists to help control what functions main can access,
// in addition to filtering input.

const request = function(command, args) {
  if (command in requests) {
    command(args);
  } else throw Error("Invalid request: " + command);
};

// Will need to request to place a ship.
// Will need to request to remove a ship.
// Will need to request to fire a shot.

const receive = function() {

};

// Will need to send opponents shots to the players board.
