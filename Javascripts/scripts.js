console.log('...loaded');

//             <------ Player Constructor ------>

function Player(name, piece){
  this.name = name;
  this.piece = piece;
  this.canClick = true;
}





//       <----- Tic Tace Toe Game Constructor ------>

function TicTacToe(gameboard, numOfGames, playerOne, playerTwo){
  this.active = true;
  this.gameboard = gameboard;

  //change to the Player's Image
  this.turn = 'X'


  //Not Used Yet
  this.turnsleft = 9;
  this.bestOF = numOfGames;

}


//             <---- Tic Tac Toe Protytype Functions ----->


//    -------- Logic ---------

  //Nested Array used to test for winning

var gameboard = [
  [null, null, null],   //gameboard[0]
  [null, null, null],   //gameboard[1]
  [null, null, null]    //gameboard[2]
]

console.log(gameboard);

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


TicTacToe.prototype.checkWinner = function clearWinner(){

};






//----------------- Graphics & Rendering ----------------


// Render Board
  //Uses .bindBox()

TicTacToe.prototype.renderBoard = function renderBoard() {

  var board = $('<div>').addClass('board');

  //Top Row
  var topRow = $('<div>').addClass('row top-row');
  var columnOneTop = $('<div>').addClass('box column-one');
  this.bindBox(columnOneTop);
  var columnTwoTop = $('<div>').addClass('box column-two');
  this.bindBox(columnTwoTop);
  var columnThreeTop = $('<div>').addClass('box column-three');
  this.bindBox(columnThreeTop);
  topRow.append(columnOneTop, columnTwoTop, columnThreeTop);

  //Middle Row
  var middleRow = $('<div>').addClass('row middle-row');
  var columnOneMid = $('<div>').addClass('box column-one');
  this.bindBox(columnOneMid);
  var columnTwoMid = $('<div>').addClass('box column-two');
  this.bindBox(columnTwoMid);
  var columnThreeMid = $('<div>').addClass('box column-three');
  this.bindBox(columnThreeMid);
  middleRow.append(columnOneMid, columnTwoMid, columnThreeMid);

  //Bottom Row
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


// Binding Button
  // Used in the .renderBoard() function

TicTacToe.prototype.bindBox = function bindBox(boxNode) {
  boxNode.on('click', function(){

    boxNode.text('X');
    //replace blue Color with a function that applies this.turn to the box and adjusts the logic of the game
  });
  return boxNode;
};


//   -------   Interactions & Gameplay   --------


TicTacToe.prototype.makeMove = function makeMove(player){
  //Has to Use Place Piece to connect to logic


};


//TEST
TicTacToe.prototype.toggleClicking = function toggleClicking(player){


  if (player.canClick === true){
  player.canClick=false;
  }
  else if (player.canClick === false){
  player.canClick=true;
  }

  return player;

};





//   --- --- --- Menu --- --- ---


// Start Menu
  //signIn
    //radio button
  //logout


  // Choose Icon




//Game Over Menu

  //Restart - Enter Best Of





//                    <---   Testing & Launch   --->


//   -------  Testing  ---------


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






///  --- ---  INITIALIZE ON LOAD  --- ---


$(document).ready(function(){
  init();
});


function init(){
  game.renderBoard();
  //game.bindBox('.top-row', '.column-one');
  //game.bindBoard();
}
