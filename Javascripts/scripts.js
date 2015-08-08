console.log('...loaded');

var gamestate = {
  active: true,
  playerOne: 'Steve',
  playerTwo: 'Kathew',
  playerOneColor: 'red',
  playerTwoColor: 'blue',
  playerOneMarker: 1,
  playerTwoMarker: -1,
  playerOneTurn: true,
  playerOnePoints: 0,
  playerTwoPoints: 0
}


function gameOver() {

}


// -- Create the Universe

function Universe(options) {
  this.galaxies = options.galaxies || [];
  console.log(this.galaxies.length);
}

Universe.prototype.buildUniverse = function buildUniverse() {
  var universe = $('<div>').attr('id', 'universe');
  var galaxy;
  for (var i = 0; i < this.galaxies.length; i++) {
      galaxy = this.galaxies[i];
      console.log(galaxy);
      universe.append(galaxy.buildGalaxy());
  }
  return $('body').append(universe);
};

// --- end of the Universe

// Create the Galaxies
function Galaxy(options) {
    this.name = name || 'Unnamed';
    this.planets = options.planets || [];
};

Galaxy.prototype.buildGalaxy = function buildGalaxy(){
  var container = $('<div>').addClass('galaxy');
  var planet;
  for (var i = 0; i < this.planets.length; i++) {
      planet = this.planets[i];
      container.append(planet.renderBoard(gamestate));
  }
  return container;
};

// --- end of the Galaxy

// --- Planet

  // Create Planets
  // Control Clicking
  // Control Game Logic

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


Planet.prototype.renderBoard = function renderBoard(gamestate) {

  var board = $('<div>').addClass('board');

  //Top Row
  var topRow = $('<div>').addClass('row top-row');
  var columnOneTop = $('<div>').addClass('box column-one').attr('row', 0).attr('col', 0);
  this.bindBox(columnOneTop, gamestate);
  var columnTwoTop = $('<div>').addClass('box column-two').attr('row', 0).attr('col', 1);
  this.bindBox(columnTwoTop, gamestate);
  var columnThreeTop = $('<div>').addClass('box column-three').attr('row', 0).attr('col', 2);
  this.bindBox(columnThreeTop, gamestate);
  topRow.append(columnOneTop, columnTwoTop, columnThreeTop);

  //Middle Row
  var middleRow = $('<div>').addClass('row middle-row');
  var columnOneMid = $('<div>').addClass('box column-one').attr('row', 1).attr('col', 0);
  this.bindBox(columnOneMid, gamestate);
  var columnTwoMid = $('<div>').addClass('box column-two').attr('row', 1).attr('col', 1);
  this.bindBox(columnTwoMid, gamestate);
  var columnThreeMid = $('<div>').addClass('box column-three').attr('row', 1).attr('col', 2);
  this.bindBox(columnThreeMid, gamestate);
  middleRow.append(columnOneMid, columnTwoMid, columnThreeMid);

  //Bottom Row
  var bottomRow = $('<div>').addClass('row bottom-row');
  var columnOneBot = $('<div>').addClass('box column-one').attr('row', 2).attr('col', 0);
  this.bindBox(columnOneBot, gamestate);
  var columnTwoBot = $('<div>').addClass('box column-two').attr('row', 2).attr('col', 1);
  this.bindBox(columnTwoBot, gamestate);
  var columnThreeBot = $('<div>').addClass('box column-three').attr('row', 2).attr('col', 2);
  this.bindBox(columnThreeBot, gamestate);
  bottomRow.append(columnOneBot, columnTwoBot, columnThreeBot);

  board.append(topRow, middleRow, bottomRow);

  return board;
}


Planet.prototype.bindBox = function bindBox(boxNode, gamestate) {
  var scope = this;

  boxNode.on('click', function(e){

      var square = $(e.target);
      var index = [
        parseInt(square.attr('row')),
        parseInt(square.attr('col'))
      ];

      if (scope.gameboard[index[0]][index[1]] === 0){
        scope.mapToArray(index[0],index[1], gamestate);
        scope.playerTurn(boxNode, gamestate);
        console.log(scope.winner);
        console.log(scope);
        console.log('points 1:' + gamestate.playerOnePoints);
        console.log('points 2:' + gamestate.playerTwoPoints);
      } else {
        console.log('You cannot make this move.');
      }
  });
  return boxNode, gamestate;
};

Planet.prototype.mapToArray = function mapToArray(row, col, gamestate){
  if (gamestate.playerOneTurn === true) {
    this.gameboard[row][col] = 1;  //this.turn.piece;
} else if (gamestate.playerOneTurn === false) {
    this.gameboard[row][col] = -1;  //this.turn.piece;
}
  console.log(this.gameboard[row]);
};


Planet.prototype.colorBoxOnClick = function colorBoxOnClick(boxNode, gamestate){

  if (this.winner === null) {

    if (gamestate.playerOneTurn === true){
      boxNode.css({'backgroundColor': gamestate.playerOneColor});
      gamestate.playerOneTurn = false;
    } else {
      boxNode.css({'backgroundColor': gamestate.playerTwoColor});
      gamestate.playerOneTurn = true;
      }
  } else {
    console.log('This planet has been captured');
  }
};

Planet.prototype.checkGameWinner = function checkGameWinner(gamestate){
  if (gamestate.playerOnePoints > 67){
    console.log('Player One Won: ' + gamestate.playerOnePoints);
  } else if (gamestate.playerTwoPoints > 67){
    console.log('Player Two Won: ' + gamestate.playerTwoPoints);
  }

  //update with gameover() function
};

Planet.prototype.playerTurn = function playerTurn(boxNode, gamestate){

  console.log('player turn function ' + gamestate.playerOnePoints);
  this.colorBoxOnClick(boxNode, gamestate);
  //this.togglePlayerTurn(); //move into TicTacToe Function

  this.checkPlanetWinner(gamestate);
  this.checkGameWinner(gamestate);


};



//  Win Logic Start ---

Planet.prototype.checkPlanetWinner = function checkPlanetWinner(gamestate){

    this.rowChecker(gamestate);
    this.columnChecker(gamestate);
    this.diagonalBottomChecker(gamestate);
    this.diagonalTopChecker(gamestate);
    //this.tieCheck();

    if (this.winner !== null) {
    console.log('The winner is ' + this.winner);
    console.log('insert end game funciton');
    removeMenuBar();
    renderMenuBar(gamestate);
    //alter gamestate
    }
}

Planet.prototype.tieCheck = function tieCheck(){

}

Planet.prototype.rowChecker = function rowChecker(gamestate){
  var rowSum = 0;

  //update array length to something scaleable
  for (var r = 0; r < 3; r++) {
      rowSum = 0;
      for (var c = 0; c < 3; c++) {
        rowSum += this.gameboard[r][c];

        if  (rowSum === 3) {
          this.winner = gamestate.playerOne;
          gamestate.playerOnePoints += 5;
          return gamestate;
        }
        else if (rowSum === -3) {
          this.winner = gamestate.playerTwo;
          gamestate.playerTwoPoints += 5;
          return gamestate;
        }
      }

  }
};

Planet.prototype.columnChecker = function columnChecker(gamestate){
  var colSum = 0;

  for (var c = 0; c < 3; c++) {
    colSum = 0;
      for (var r = 0; r < 3; r++) {
        colSum += this.gameboard[r][c];
        if  (colSum === 3) {
          this.winner = gamestate.playerOne;
          gamestate.playerOnePoints += 5;
          return gamestate;        }
        else if (colSum === -3) {
          this.winner = gamestate.playerTwo;
          gamestate.playerTwoPoints += 5;
          return gamestate;        }
      }
}
};

Planet.prototype.diagonalBottomChecker = function diagonalBottomChecker(gamestate){

  var diagonalSum = 0;

  diagonalSum = this.gameboard[2][0] + this.gameboard[1][1] + this.gameboard[0][2];

  if  (diagonalSum === 3) {
    this.winner = gamestate.playerOne;
    gamestate.playerOnePoints += 5;
    return gamestate;
  }
  else if (diagonalSum === -3) {
    this.winner = gamestate.playerTwo;
    gamestate.playerTwoPoints += 5;
    return gamestate;
  }

};

Planet.prototype.diagonalTopChecker = function diagonalTopChecker(gamestate){

  var diagonalSum = 0;
    for (var i = 0; i < 3; i++) {
      diagonalSum += this.gameboard[i][i];
      if  (diagonalSum === 3) {
        this.winner = gamestate.playerOne;
        gamestate.playerOnePoints += 5;
        return gamestate;      }
      else if (diagonalSum === -3) {
        this.winner = gamestate.playerTwo;
        gamestate.playerTwoPoints += 5;
        return gamestate;      }
}
};

// --- Win Logic End


// --- end of the Planet


// --- Player ---

function Player(name, piece, color){
  this.name = name || 'Unnamed Player';
  this.piece = piece;
  this.color = color;
  //this.winner = false;
  this.canClick = true;
}





//  --- Tic Tac Toe Game ---

function TicTacToe(universe){
  this.active = true;
  this.universe = universe;
  //this.playerOne = universe.playerOne;
  //this.playerTwo = universe.playerTwo;
  //this.turn = this.playerOne;

  this.winner = null;


}


//   START GAME FUNCTION ---


  TicTacToe.prototype.startGame = function startGame(){
    this.renderStartMenu(gamestate);
    //this.universe.buildUniverse();
    //this.renderNameForm();
    //When I start the game, a form will appear at the bottom of the screen
  }


//   ---   START GAME FUNCTION



// Start Menu Start ---


TicTacToe.prototype.renderStartMenu = function renderStartMenu(gamestate) {
  var container = $('<div>').attr('id', "start-menu-container");

  container.append(this.renderWelcomeMenu(gamestate));

  return $('body').append(container);
};

// --- Start Menu Parts

  TicTacToe.prototype.renderWelcomeMenu = function renderWelcomeMenu(gamestate) {

    var menu = $('<div>').addClass('welcome-menu');

    var welcomeBox = this.renderWelcomeBox();
    var nameForm = this.renderNameForm(gamestate);
    menu.append(welcomeBox, nameForm);

    return menu;
  };

  TicTacToe.prototype.renderWelcomeBox = function renderWelcomeBox() {

    var welcomeBox = $('<div>').addClass('welcome-box');
    var welcomeMessage = $('<h4>').addClass('welcome-message').html('Incoming Message: <br><br> The ship is in critical condition.  You are the only surviving commander.  The interplanetary forces are awaiting orders. <br><br>You must take charge of the navy or we will all perish. <br><br>Launch Tactical Display:');

    welcomeBox.append(welcomeMessage);
    return welcomeBox;
  };


  // Name Form Start ---

    TicTacToe.prototype.renderNameForm = function renderNameForm(gamestate) {
      var form = $('<form>');
        form.attr('id', 'player-name-entry');
      var input = $('<input>');
        input.attr('type', 'text');
        input.attr('name', 'playerName[name]');
        input.attr('placeholder', 'enter your name')
        input.attr('id', 'name-entry');
      var submitButton = $('<input>').attr('type', 'submit').addClass('enter-name-button').text('Launch Tactical Display');
      form.append(input, submitButton);
      this.bindNameForm(form, gamestate);
      return form;
    }

    TicTacToe.prototype.bindNameForm = function bindNameForm(form, gamestate){
      var scope = this;
      console.log(scope);
        form.on('submit', function(e){
          e.preventDefault();
          var nameField = $(this).find('input[name="playerName[name]"]');
          var nameText = nameField.val();
          console.log(nameText);


          scope.appendGameName();
          //scope.appendName(nameText);
          scope.applyNameToGameLogic(nameText);
          scope.universe.buildUniverse();
          renderMenuBar(gamestate);
          scope.removeStartMenu();
          return scope;
        });
    };

    TicTacToe.prototype.appendGameName = function appendGameName(){
      var gameName = $('<h1>').text('Space Tic Tac Toe');
      return $('body').append(gameName);
    };

    TicTacToe.prototype.appendName = function appendName(nameText){
      var nameNode = $('<h3>');
      nameNode.html(nameText);
      return $('body').append(nameNode);
    };

  // --- Name Form End

  TicTacToe.prototype.applyNameToGameLogic = function applyNameToGameLogic(nameText) {
    gamestate.playerOne = nameText;
    console.log('Player Name: ' + gamestate.playerOne);
  };

  TicTacToe.prototype.removeStartMenu = function removeStartMenu(){
    var startContainer = $('#start-menu-container');
    startContainer.remove();
  };

  // --- START MENU End



  //  MENU BAR Start ---

function renderMenuBar(gamestate) {
  var menuBar = $('<div>');
  menuBar.attr('id', 'gamestate-bar');
  var playerOneInfo = this.renderPlayerOneInfo(gamestate);
  var playerTwoInfo = this.renderPlayerTwoInfo(gamestate);
  menuBar.append(playerOneInfo, playerTwoInfo);

  return $('body').append(menuBar);
};

function removeMenuBar() {
  var menuBar = $('#gamestate-bar');
  menuBar.remove();
}

//Have a box below the game

  //Player One Info

function renderPlayerOneInfo(gamestate) {
  var playerOneInfoDiv = $('<div>');
  playerOneInfoDiv.addClass('playerOne info');
  var playerOneName = renderPlayerOneName(gamestate);
  var playerOneScore = renderPlayerOneScore(gamestate);
  playerOneInfoDiv.append(playerOneName, playerOneScore);
  return playerOneInfoDiv;

};

function renderPlayerOneName(gamestate) {
  var playerOneNameDiv = $('<div>');
  playerOneNameDiv.addClass('playerOne name');
  var playerOneName = $('<h5>');
  playerOneName.html('High Commander ' + gamestate.playerOne);
  playerOneNameDiv.append(playerOneName);

return playerOneNameDiv;
};

function renderPlayerOneScore(gamestate) {
  var playerOneScoreDiv = $('<div>')
  playerOneScoreDiv.addClass('playerOne score');
  var playerOne = $('<h5>');
  console.log('renderPlayerOnePoint: ' + gamestate.playerOnePoints);
  playerOne.html('Score: ' + gamestate.playerOnePoints);
  playerOneScoreDiv.append(playerOne);

return playerOneScoreDiv;
};

  //  Player Two Info

function renderPlayerTwoInfo(gamestate) {
  var playerTwoInfoDiv = $('<div>')
  playerTwoInfoDiv.addClass('playerTwo info');
  var playerTwoName = renderPlayerTwoName(gamestate);
  var playerTwoScore = renderPlayerTwoScore(gamestate);
  playerTwoInfoDiv.append(playerTwoName, playerTwoScore);
  return playerTwoInfoDiv;

};

function renderPlayerTwoName(gamestate) {
  var playerTwoNameDiv = $('<div>')
  playerTwoNameDiv.addClass('playerOne name');
  var playerTwoName = $('<h5>');
  playerTwoName.text('Attacker: ' + gamestate.playerTwo);
  playerTwoNameDiv.append(playerTwoName);

  return playerTwoNameDiv;
};

function renderPlayerTwoScore(gamestate) {
  var playerTwoScoreDiv = $('<div>')
  playerTwoScoreDiv.addClass('playerOne score');
  var playerTwo = $('<h5>');
  playerTwo.html('Score :' + gamestate.playerTwoPoints);
  playerTwoScoreDiv.append(playerTwo);

return playerTwoScoreDiv;
};




  // --- MENU BAR End

//  Game State Menu:




//TEST


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


var galaxyOne = new Galaxy({name: 'Steve', planets: [
  new Planet('Tatooine'),
  new Planet('Endor'),
  new Planet('Coruscant'),
  new Planet('Bespin'),
  new Planet('Hoth'),
  new Planet('Dagobah'),
  new Planet('Alderaan'),
  new Planet('Kashyyyk'),
  new Planet('Corellia')
]});

var galaxyTwo = new Galaxy({name: 'steve2', planets: [
  new Planet('Tatooine2'),
  new Planet('Endor2'),
  new Planet('Coruscant2'),
  new Planet('Bespin2'),
  new Planet('Hoth2'),
  new Planet('Dagobah2'),
  new Planet('Alderaan2'),
  new Planet('Kashyyyk2'),
  new Planet('Corellia2')
]});

var galaxyThree = new Galaxy({name: 'steve3', planets: [
  new Planet('Tatooine3'),
  new Planet('Endor3'),
  new Planet('Coruscant3'),
  new Planet('Bespin3'),
  new Planet('Hoth3'),
  new Planet('Dagobah3'),
  new Planet('Alderaan3'),
  new Planet('Kashyyyk3'),
  new Planet('Corellia3')
]});



var universe = new Universe({galaxies: [galaxyOne, galaxyTwo, galaxyThree]});



var game = new TicTacToe(universe);





//  --- ---  INITIALIZE ON LOAD  --- ---


$(document).ready(function(){
  init();
});


function init(){

  game.startGame();

}
