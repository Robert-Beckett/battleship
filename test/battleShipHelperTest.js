const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const main = require('../src/battleship');
const {
  SHIPS,
  resetSHIPS,
  createBoard,
  placeShip,
  isPlayerValid,
  isShipPlaced,
  isPointValid,
  isShipTailValid,
  isOrientationValid,
  doesShipOverlap,
  setShipCoords,
  clearShipCoords,
} = main;

let board;

describe('Helper Functions', () => {
  describe('isPlayerValid', () => {
    it('should return true if the player is "player"', () =>{
      assert.isTrue(isPlayerValid("player"));
    });
  });

  describe('isShipPlaced', () => {
    beforeEach(() => board = createBoard());
    afterEach(() => resetSHIPS());

    it('should return true if the ship has been placed', () => {
      placeShip(2, 3, 'cruiser', 'horizontal', board, 'player');
      assert.isTrue(isShipPlaced('cruiser', 'player'));
    });

    it('should return false if the ship has not been placed', () => {
      assert.isFalse(isShipPlaced('cruiser', 'player'));
    });
  });

  describe('isPointValid', () => {
    beforeEach(() => board = createBoard());

    it('should return true if the point is within bounds of board', () => {
      assert.isTrue(isPointValid(4, 9, board));
    });

    it('should return false if the point is not within bounds of board', () => {
      assert.isFalse(isPointValid(0, 10, board));
    });
  });

  describe('isShipTailValid', () => {
    before(() => board = createBoard());

    it('should return true if the ships tail is within bounds', () => {
      assert.isTrue(isShipTailValid(7, 0, 'submarine', 'horizontal', board));
    });

    it('should return false if the ships tail is out of bounds', () => {
      assert.isFalse(isShipTailValid(8, 0, 'submarine', 'horizontal', board));
    });
  });

  describe('isOrientationValid', () => {
    it('should return true if the orientation is horizontal', () => {
      assert.isTrue(isOrientationValid('horizontal'));
    });

    it('should return true if the orientation is vertical', () => {
      assert.isTrue(isOrientationValid('vertical'));
    });

    it('should return false if the orientation is not horizontal or vertical', () => {
      assert.isFalse(isOrientationValid('Horizontal'));
    });
  });

  describe('doesShipOverlap', () => {
    before(() => {
      board = createBoard();
      placeShip(1, 1, 'carrier', 'vertical', board, 'player');
    });

    it('should return true if the ships do not overlap', () => {
      assert.isTrue(doesShipOverlap(0, 0, 'destroyer', 'horizontal', board));
    });

    it('should return false if the ships do overlap', () => {

    });
  });

  describe('setShipCoords', () => {

  });

  describe('clearShipCoords', () => {

  });
});