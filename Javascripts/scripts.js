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
  return gameboard;
}

TicTacToe.prototype.clearBoard = function clearBoard(){
  gameboard = [
    [null, null, null],   //gameboard[0]
    [null, null, null],   //gameboard[1]
    [null, null, null]    //gameboard[2]
  ];
  return gameboard;
};

//Is there a way to use map to bind a click to all pieces?
TicTacToe.prototype.bindBox = function bindBox(boxNode) {
  boxNode.on('click', function(){

    boxNode.text('X');
    //replace blue Color with a function that applies this.turn to the box and adjusts the logic of the game
  });
  return boxNode;
};

//renders board and binds a click
TicTacToe.prototype.renderBoard = function renderBoard() {

  //create board
  var board = $('<div>').addClass('board');

  //create top row and boxes
  //add a click event listener to each box
  //append boxes
  var topRow = $('<div>').addClass('row top-row');
  var columnOneTop = $('<div>').addClass('box column-one');
  this.bindBox(columnOneTop);
  var columnTwoTop = $('<div>').addClass('box column-two');
  this.bindBox(columnTwoTop);
  var columnThreeTop = $('<div>').addClass('box column-three');
  this.bindBox(columnThreeTop);
  topRow.append(columnOneTop, columnTwoTop, columnThreeTop);


  //create middle row and boxes
  //add a click event listener to each box
  //append boxes
  var middleRow = $('<div>').addClass('row middle-row');
  var columnOneMid = $('<div>').addClass('box column-one');
  this.bindBox(columnOneMid);
  var columnTwoMid = $('<div>').addClass('box column-two');
  this.bindBox(columnTwoMid);
  var columnThreeMid = $('<div>').addClass('box column-three');
  this.bindBox(columnThreeMid);
  middleRow.append(columnOneMid, columnTwoMid, columnThreeMid);


  //create bottom row and boxes
  //add a click event listener to each box
  //append boxes
  var bottomRow = $('<div>').addClass('row top-row');
  var columnOneBot = $('<div>').addClass('box column-one');
  this.bindBox(columnOneBot);
  var columnTwoBot = $('<div>').addClass('box column-two');
  this.bindBox(columnTwoBot);
  var columnThreeBot = $('<div>').addClass('box column-three');
  this.bindBox(columnThreeBot);
  bottomRow.append(columnOneBot, columnTwoBot, columnThreeBot);

  board.append(topRow, middleRow, bottomRow);


  return $('body').append(board);
}


//bind the whole board

/*
TicTacToe.prototype.bindBoard = function bindBoard() {
  var board = $('.board');
  var rows = ['.top-row', '.middle-row', '.bottom-row'];
  var columns = ['.column-one', '.column-two', '.column-three'];

  for (var row = 0; row < rows.length; row++) {
    for (var col = 0; col < columns.length; col++) {
      var currentNode = rows[row], columns[col];
      this.bindBox(rows[row], columns[col]);
    }
  }
  return board;
}
*/

//connect real board with gameboard


var game = new TicTacToe(gameboard);
game.placePiece(0,0);
game.placePiece(2,2);
console.log(gameboard[0]);
console.log(gameboard[1]);
console.log(gameboard[2]);
game.clearBoard();
console.log(gameboard[0]);
console.log(gameboard[1]);
console.log(gameboard[2]);



$(document).ready(function(){
  init();
});


function init(){
  game.renderBoard();
  //game.bindBox('.top-row', '.column-one');
  //game.bindBoard();
}
