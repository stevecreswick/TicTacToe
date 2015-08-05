console.log('...loaded');


var gameboard = [
  [null, null, null],   //gameboard[0]
  [null, null, null],   //gameboard[1]
  [null, null, null]    //gameboard[2]
]

console.log(gameboard);

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

TicTacToe.prototype.clearBoard = function clearBoard(){
  gameboard = [
    [null, null, null],   //gameboard[0]
    [null, null, null],   //gameboard[1]
    [null, null, null]    //gameboard[2]
  ]
};

//Is there a way to use map to bind a click to all pieces?
TicTacToe.prototype.bindBox = function bindClick(row, col) {
  currentNode = $(row + " " + col);
  playerPiece = this.turn;
  currentNode.on('click', function(){
    currentNode.text(playerPiece);
  });
}





var game = new TicTacToe(gameboard);
game.bindClick('.top-row', '.column-one');
game.placePiece(0,0);
game.placePiece(2,2);
console.log(gameboard[0]);
console.log(gameboard[1]);
console.log(gameboard[2]);
game.clearBoard();
console.log(gameboard[0]);
console.log(gameboard[1]);
console.log(gameboard[2]);
