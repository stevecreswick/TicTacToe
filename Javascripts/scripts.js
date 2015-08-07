console.log('...loaded');


function Universe(options) {
    this.name = 'Test';
    this.planets = options.planets || [];
};

Universe.prototype.buildUniverse = function buildUniverse(){
  var container = $('<div>').attr('id', 'universe');
  var planet;
  for (var i = 0; i < this.planets.length; i++) {
      planet = this.planets[i];
      container.append(planet.renderBoard());
  }
  return $('body').append(container);
};


function Planet(name) {
  var gameboard = [
    [0, 0, 0],   //gameboard[0]
    [0, 0, 0],   //gameboard[1]
    [0, 0, 0]    //gameboard[2]
  ];

  this.name = name;
  this.gameboard = gameboard;
  this.winner = null;
  this.winType = null;
}




// Render Board
  //Uses .bindBox()

Planet.prototype.renderBoard = function renderBoard() {

  var board = $('<div>').addClass('board');

  //Top Row
  var topRow = $('<div>').addClass('row top-row');
  var columnOneTop = $('<div>').addClass('box top-row column-one').attr('row', 0).attr('col', 0);
  this.bindBox(columnOneTop);
  var columnTwoTop = $('<div>').addClass('box top-row column-two').attr('row', 0).attr('col', 1);
  this.bindBox(columnTwoTop);
  var columnThreeTop = $('<div>').addClass('box top-row column-three').attr('row', 0).attr('col', 2);
  this.bindBox(columnThreeTop);
  topRow.append(columnOneTop, columnTwoTop, columnThreeTop);

  //Middle Row
  var middleRow = $('<div>').addClass('row middle-row');
  var columnOneMid = $('<div>').addClass('box middle-row column-one').attr('row', 1).attr('col', 0);
  this.bindBox(columnOneMid);
  var columnTwoMid = $('<div>').addClass('box middle-row column-two').attr('row', 1).attr('col', 1);
  this.bindBox(columnTwoMid);
  var columnThreeMid = $('<div>').addClass('box middle-row column-three').attr('row', 1).attr('col', 2);
  this.bindBox(columnThreeMid);
  middleRow.append(columnOneMid, columnTwoMid, columnThreeMid);

  //Bottom Row
  var bottomRow = $('<div>').addClass('row bottom-row');
  var columnOneBot = $('<div>').addClass('box bottom-row column-one').attr('row', 2).attr('col', 0);
  this.bindBox(columnOneBot);
  var columnTwoBot = $('<div>').addClass('box bottom-row column-two').attr('row', 2).attr('col', 1);
  this.bindBox(columnTwoBot);
  var columnThreeBot = $('<div>').addClass('box bottom-row column-three').attr('row', 2).attr('col', 2);
  this.bindBox(columnThreeBot);
  bottomRow.append(columnOneBot, columnTwoBot, columnThreeBot);

  board.append(topRow, middleRow, bottomRow);

  return board;
}


// Binding Button
  // Used in the .renderBoard() function

Planet.prototype.bindBox = function bindBox(boxNode) {
  var scope = this;

  boxNode.on('click', function(e){

      var square = $(e.target);
      var index = [
        parseInt(square.attr('row')),
        parseInt(square.attr('col'))
      ];

      if (scope.gameboard[index[0]][index[1]] === 0){
        scope.mapToArray(index[0],index[1]);
        //scope.playerTurn(boxNode);
      } else {
        console.log('You cannot make this move.');
      }
  });
  return boxNode;
};


Planet.prototype.mapToArray = function mapToArray(row, col){
  this.gameboard[row][col] = 1; //this.turn.piece;
  console.log(this.gameboard[row]);
};



//   -------   Interactions & Gameplay   --------

TicTacToe.prototype.playerTurn = function playerTurn(boxNode){


  this.colorBoxOnClick(boxNode);
  this.togglePlayerTurn();

  this.checkWinner();

};


TicTacToe.prototype.colorBoxOnClick = function colorBoxOnClick(boxNode){

  boxNode.css({'backgroundColor': this.turn.color});

};
//----------------------------END TESTING







// Move Rendering to the Universe


//             <------ Player Constructor ------>

function Player(name, piece, color){
  this.name = name || 'Unnamed Player';
  this.piece = piece;
  this.color = color;
  //this.winner = false;
  this.canClick = true;
}





//       <----- Tic Tace Toe Game Constructor ------>

function TicTacToe(playerOne, playerTwo, universe){
  this.active = true;
  this.universe = universe;
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.turn = this.playerOne;

  this.winner = null;

  //this.piece =


  //Not Used Yet
  this.turnsleft = 9;
  //this.bestOF = numOfGames;

}


//             <---- Tic Tac Toe Protytype Functions ----->


//    -------- Logic ---------

  //Nested Array used to test for winning



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
    //this.tieCheck();

    if (this.winner !== null) {
    console.log('The winner is ' + this.winner.name);
    console.log('insert end game funciton')
    }
}

TicTacToe.prototype.tieCheck = function tieCheck(){

}

TicTacToe.prototype.rowChecker = function rowChecker(){
  var rowSum = 0;

  //update array length to something scaleable
  for (var r = 0; r < 3; r++) {
      rowSum = 0;
      for (var c = 0; c < 3; c++) {
        rowSum += this.universe[r][c];

        if  (rowSum === 3) {
          this.winner = this.playerOne;
        }
        else if (rowSum === -3) {
          this.winner = this.playerTwo;
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
        if  (colSum === 3) {
          this.winner = this.playerOne;
        }
        else if (colSum === -3) {
          this.winner = this.playerTwo;
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
        this.winner = this.playerOne;
      }
      else if (diagonalSum === -3) {
        this.winner = this.playerTwo;
      }
    }
};

TicTacToe.prototype.diagonalTopChecker = function diagonalTopChecker(){

  var diagonalSum = 0;
    for (var i = 0; i < 3; i++) {
      diagonalSum += this.gameboard[i][i];
      if  (diagonalSum === 3) {
        this.winner = this.playerOne;
      }
      else if (diagonalSum === -3) {
        this.winner = this.playerTwo;
      }
}
};
  //update array length to something scaleable





//----------------- Graphics & Rendering ----------------


// Render Board
  //Uses .bindBox()
/*
TicTacToe.prototype.renderBoard = function renderBoard() {

  var board = $('<div>').addClass('board');

  //Top Row
  var topRow = $('<div>').addClass('row top-row');
  var columnOneTop = $('<div>').addClass('box top-row column-one').attr('row', 0).attr('col', 0);
  this.bindBox(columnOneTop);
  var columnTwoTop = $('<div>').addClass('box top-row column-two').attr('row', 0).attr('col', 1);
  this.bindBox(columnTwoTop);
  var columnThreeTop = $('<div>').addClass('box top-row column-three').attr('row', 0).attr('col', 2);
  this.bindBox(columnThreeTop);
  topRow.append(columnOneTop, columnTwoTop, columnThreeTop);

  //Middle Row
  var middleRow = $('<div>').addClass('row middle-row');
  var columnOneMid = $('<div>').addClass('box middle-row column-one').attr('row', 1).attr('col', 0);
  this.bindBox(columnOneMid);
  var columnTwoMid = $('<div>').addClass('box middle-row column-two').attr('row', 1).attr('col', 1);
  this.bindBox(columnTwoMid);
  var columnThreeMid = $('<div>').addClass('box middle-row column-three').attr('row', 1).attr('col', 2);
  this.bindBox(columnThreeMid);
  middleRow.append(columnOneMid, columnTwoMid, columnThreeMid);

  //Bottom Row
  var bottomRow = $('<div>').addClass('row bottom-row');
  var columnOneBot = $('<div>').addClass('box bottom-row column-one').attr('row', 2).attr('col', 0);
  this.bindBox(columnOneBot);
  var columnTwoBot = $('<div>').addClass('box bottom-row column-two').attr('row', 2).attr('col', 1);
  this.bindBox(columnTwoBot);
  var columnThreeBot = $('<div>').addClass('box bottom-row column-three').attr('row', 2).attr('col', 2);
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

      var square = $(e.target);
      var index = [
        parseInt(square.attr('row')),
        parseInt(square.attr('col'))
      ];

      if (scope.gameboard[index[0]][index[1]] === 0){
        scope.mapToArray(index[0],index[1]);
        scope.playerTurn(boxNode);
      } else {
        console.log('You cannot make this move.');
      }
  });
  return boxNode;
};


TicTacToe.prototype.mapToArray = function mapToArray(row, col){
  this.gameboard[row][col] = this.turn.piece;
  console.log(this.gameboard[row]);
};

*/

//   -------   Interactions & Gameplay   --------

TicTacToe.prototype.playerTurn = function playerTurn(boxNode){


  this.colorBoxOnClick(boxNode);
  this.togglePlayerTurn();

  this.checkWinner();

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


var universe = new Universe({planets: [new Planet('Tatooine'),
new Planet('Endor')]});


var game = new TicTacToe(testPlayer1, testPlayer2, universe);





//  --- ---  INITIALIZE ON LOAD  --- ---


$(document).ready(function(){
  init();
});


function init(){

  game.universe.buildUniverse();
  //game.gameboard[0].buildUniverse();
  //game.gameboard[1].buildUniverse();
  //game.renderBoard();
  //game.bindBox('.top-row', '.column-one');
  //game.bindBoard();
}
