console.log('...loaded');

//             <------ Player Constructor ------>

function Player(name, piece, color){
  this.name = name || 'Unnamed Player';
  this.piece = piece;
  this.color = color;

  this.canClick = true;
}





//       <----- Tic Tace Toe Game Constructor ------>

function TicTacToe(gameboard, playerOne, playerTwo){
  this.active = true;
  this.gameboard = gameboard;
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.turn = this.playerOne;
  this.piece =


  //Not Used Yet
  this.turnsleft = 9;
  //this.bestOF = numOfGames;

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
  var scope = this;

  boxNode.on('click', function(){

    //console.log(this.turn);
    scope.colorBoxOnClick(boxNode);
    scope.togglePlayerTurn();
    //boxNode.css({'backgroundColor': this.turn.color});

    //replace blue Color with a function that applies this.turn to the box and adjusts the logic of the game
  });
  return boxNode;
};


//   -------   Interactions & Gameplay   --------


TicTacToe.prototype.colorBoxOnClick = function colorBoxOnClick(boxNode){

  //Has to use .placePiece() to connect to logic
  boxNode.css({'backgroundColor': this.turn.color});


};

TicTacToe.prototype.togglePlayerTurn = function togglePlayerTurn() {
  if (this.turn.name == this.playerOne.name) {
      this.turn = this.playerTwo;
      console.log(this.turn);
  } else if (this.turn.name == this.playerTwo.name) {
      this.turn = this.playerOne;
      console.log(this.turn);
  }

};


//  bind to logic 

//TEST

/*
TicTacToe.prototype.toggleClicking = function toggleClicking(player){


  if (player.canClick === true){
  player.canClick=false;
  console.log(player.canClick);
  }
  else if (player.canClick === false){
    console.log(player.canClick);

  player.canClick=true;
  }

  return player;

};
*/



//   --- --- --- Menu --- --- ---


// Start Menu
  //Funcion: signIn
    //radio button for piece/icon
  //Function: logout


//Game Over Menu

  //Restart - Enter Best Of





//                    <---   Testing & Launch   --->


//   -------  Testing  ---------

var testPlayer1 = new Player('Steve', 'X', 'blue');
var testPlayer2 = new Player('Kathew', 'O', 'red');

console.log(testPlayer1);
console.log(testPlayer2);


var game = new TicTacToe(gameboard, testPlayer1, testPlayer2);
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
