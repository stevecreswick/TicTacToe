console.log('...loaded');


var gameboard = [
  [null, null, null],   //gameboard[0]
  [null, null, null],   //gameboard[1]
  [null, null, null]    //gameboard[2]
]

function TicTacToe(gameboard){
  this.active = true;
  this.turnsleft = 9;
  this.turn = 'X'

  this.gameboard = gameboard;


}

TicTacToe.prototype.placePiece = function placePiece(row, col){
  if (this.turn === 'X'){
    gameboard[row][col] = 'X';
    this.turn = 'O';
  } else if (this.turn === 'O'){
    gameboard[row][col] = 'O';
    this.turn = 'X';
  }

}

var game = new TicTacToe(gameboard);
game.placePiece(0,0);
