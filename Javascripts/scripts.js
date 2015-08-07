console.log('...loaded');

//             <------ Player Constructor ------>

function Player(name, piece, color){
  this.name = name || 'Unnamed Player';
  this.piece = piece;
  this.color = color;
  this.winner = false;
  this.canClick = true;
}





//       <----- Tic Tace Toe Game Constructor ------>

function TicTacToe(gameboard, playerOne, playerTwo){
  this.active = true;
  this.gameboard = gameboard;
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.turn = this.playerOne;
  //this.piece =


  //Not Used Yet
  this.turnsleft = 9;
  //this.bestOF = numOfGames;

}


//             <---- Tic Tac Toe Protytype Functions ----->


//    -------- Logic ---------

  //Nested Array used to test for winning

var gameboard = [
  [0, 0, 0],   //gameboard[0]
  [0, 0, 0],   //gameboard[1]
  [0, 0, 0]    //gameboard[2]
]

/*
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
*/

TicTacToe.prototype.clearBoard = function clearBoard(){
  gameboard = [
    [0, 0, 0],   //gameboard[0]
    [0, 0, 0],   //gameboard[1]
    [0, 0, 0]    //gameboard[2]
  ];
  return gameboard;
};


TicTacToe.prototype.checkWinner = function checkWinner(){

    this.rowChecker();
    this.columnChecker();
    this.diagonalBottomChecker();
    this.diagonalTopChecker();

    console.log('Is player one a winner? ' + this.playerOne.winner);
    console.log('Is player two a winner? ' + this.playerTwo.winner);
}


TicTacToe.prototype.rowChecker = function rowChecker(){
  var rowSum = 0;

  //update array length to something scaleable
  for (var r = 0; r < 3; r++) {
      rowSum = 0;
      for (var c = 0; c < 3; c++) {
        rowSum += this.gameboard[r][c];

        if  (rowSum === 3) {
          this.playerOne.winner = true;
        }
        else if (rowSum === -3) {
          this.playerTwo.winner = true;
        }
      }

  }
};

TicTacToe.prototype.columnChecker = function columnChecker(){
  var colSum = 0;

  for (var c = 0; c < 3; c++) {
    colSum = 0;
      for (var r = 0; r < 3; r++) {
        colSum += this.gameboard[r][c];
        console.log(colSum);
        if  (colSum === 3) {
          this.playerOne.winner = true;
        }
        else if (colSum === -3) {
          this.playerTwo.winner = true;
        }
      }
}
};

TicTacToe.prototype.diagonalBottomChecker = function diagonalBottomChecker(){

  var diagonalSum = 0;
    for (var r = 2; r >= 0; r--) {
      for (var c = 0; c < 3; c++) {
        diagonalSum += this.gameboard[r][c];
      }

      if  (diagonalSum === 3) {
        this.playerOne.winner = true;
      }
      else if (diagonalSum === -3) {
        this.playerTwo.winner = true;
      }
    }
};

TicTacToe.prototype.diagonalTopChecker = function diagonalTopChecker(){

  var diagonalSum = 0;
    for (var i = 0; i < 3; i++) {
      diagonalSum += this.gameboard[i][i];
      if  (diagonalSum === 3) {
        this.playerOne.winner = true;
      }
      else if (diagonalSum === -3) {
        this.playerTwo.winner = true;
      }
}
};
  //update array length to something scaleable





//----------------- Graphics & Rendering ----------------


// Render Board
  //Uses .bindBox()

TicTacToe.prototype.renderBoard = function renderBoard() {

  var board = $('<div>').addClass('board');

  //Top Row
  var topRow = $('<div>').addClass('row top-row');
  var columnOneTop = $('<div>').addClass('box top-row column-one');
  this.bindBox(columnOneTop);
  var columnTwoTop = $('<div>').addClass('box top-row column-two');
  this.bindBox(columnTwoTop);
  var columnThreeTop = $('<div>').addClass('box top-row column-three');
  this.bindBox(columnThreeTop);
  topRow.append(columnOneTop, columnTwoTop, columnThreeTop);

  //Middle Row
  var middleRow = $('<div>').addClass('row middle-row');
  var columnOneMid = $('<div>').addClass('box middle-row column-one');
  this.bindBox(columnOneMid);
  var columnTwoMid = $('<div>').addClass('box middle-row column-two');
  this.bindBox(columnTwoMid);
  var columnThreeMid = $('<div>').addClass('box middle-row column-three');
  this.bindBox(columnThreeMid);
  middleRow.append(columnOneMid, columnTwoMid, columnThreeMid);

  //Bottom Row
  var bottomRow = $('<div>').addClass('row bottom-row');
  var columnOneBot = $('<div>').addClass('box bottom-row column-one');
  this.bindBox(columnOneBot);
  var columnTwoBot = $('<div>').addClass('box bottom-row column-two');
  this.bindBox(columnTwoBot);
  var columnThreeBot = $('<div>').addClass('box bottom-row column-three');
  this.bindBox(columnThreeBot);
  bottomRow.append(columnOneBot, columnTwoBot, columnThreeBot);

  board.append(topRow, middleRow, bottomRow);

  return $('body').append(board);
}


// Binding Button
  // Used in the .renderBoard() function

TicTacToe.prototype.bindBox = function bindBox(boxNode) {
  var scope = this;

  boxNode.on('click', function(e){
      /*
      var square = $(e.target);
      var index = [
        square.attr('row'),
        square.attr('col')
      ];
      */
      scope.playerTurn(boxNode);

  });
  return boxNode;
};



//   -------   Interactions & Gameplay   --------

TicTacToe.prototype.playerTurn = function playerTurn(boxNode){

  
  this.colorBoxOnClick(boxNode);
  this.togglePlayerTurn();

  var boxId = this.getClass(boxNode);
  this.mapMoveToBoard(boxId);

};


TicTacToe.prototype.colorBoxOnClick = function colorBoxOnClick(boxNode){

  boxNode.css({'backgroundColor': this.turn.color});


};

TicTacToe.prototype.togglePlayerTurn = function togglePlayerTurn() {
  if (this.turn.name == this.playerOne.name) {
      this.turn = this.playerTwo;
      console.log(this.turn.name);
  } else if (this.turn.name == this.playerTwo.name) {
      this.turn = this.playerOne;
      console.log(this.turn.name);
  }
  return this;

};

TicTacToe.prototype.getClass = function getClass(clickedNode) {
  var coordinates = [
    ['.top-row', '.middle-row', '.bottom-row'],
    ['.column-one', '.column-two', '.column-three']
  ];
  var row = coordinates[0];
  var col = coordinates[1];
  var testRow;
  var testCol;
  var boxId;

  //Loop through rows
    for (var i = 0; i < row.length; i++) {

      //Loop through columns
      for (var x = 0; x < col.length; x++) {
          testRow = row[i];
          testCol = col[x];

          boxId = (testRow + " " + testCol);

          //if the boxId is equal to that of the clickedNode, return that Node
          if ( clickedNode.is(boxId) ) {

            return boxId;
          }
      }
    }
};

TicTacToe.prototype.mapMoveToBoard = function mapMoveToBoard(boxId){

switch (boxId) {
  case ('.top-row .column-one'):
  this.gameboard[0][0] = this.turn.piece;
  break;
  case ('.top-row .column-two'):
  this.gameboard[0][1] = this.turn.piece;
  break;
  case ('.top-row .column-three'):
  this.gameboard[0][2] = this.turn.piece;
  break;
  case ('.middle-row .column-one'):
  this.gameboard[1][0] = this.turn.piece;
  break;
  case ('.middle-row .column-two'):
  this.gameboard[1][1] = this.turn.piece;
  break;
  case ('.middle-row .column-three'):
  this.gameboard[1][2] = this.turn.piece;
  break;
  case ('.bottom-row .column-one'):
  this.gameboard[2][0] = this.turn.piece;
  break;
  case ('.bottom-row .column-two'):
  this.gameboard[2][1] = this.turn.piece;
  break;
  case ('.bottom-row .column-three'):
  this.gameboard[2][2] = this.turn.piece;
  break;
  default:
  console.log('Keep Trying...');
}

};

TicTacToe.prototype.convertClassToIndex = function convertClassToIndex(boxId) {

  console.log(boxId.split(""));
  //I can split the string ("")
      //switch ( boxId.indexOf(.top-row) >= 0 & (boxId.indexOf(.column-one) >= 0)

  //this should return a [row][col]
  //this should feed the row and column into a new bind logic function

  //TEST Statement
    //if the top-left box is clicked this should return this.gameboard[0][0]
    //if the bottom-right box is clicked, this should return this.gameboard[2][2];
}


//  bind to logic
//Has to use .placePiece() to connect to logic

//make clicked boxes innactive (accepts CLICKED NODE)
  // .toggleClass(.clicked);




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

var testPlayer1 = new Player('Steve', 1, 'blue');
var testPlayer2 = new Player('Kathew', -1, 'red');

console.log(testPlayer1);
console.log(testPlayer2);


var game = new TicTacToe(gameboard, testPlayer1, testPlayer2);
//game.placePiece(0,0);
//game.placePiece(2,2);







//  --- ---  INITIALIZE ON LOAD  --- ---


$(document).ready(function(){
  init();
});


function init(){
  game.renderBoard();
  //game.bindBox('.top-row', '.column-one');
  //game.bindBoard();
}
