console.log('...loaded');

// Global Game State Key Value Pair Used to Keep Track of Game Options...most of this will eventually live in Player Constructor Functions

var gamestate = {
  active: true,
  playerOne: 'Default',
  playerTwo: 'Emperor Zorgg',
  playerOneColor: 'red',
  playerTwoColor: 'blue',
  playerOneMarker: 1,
  playerTwoMarker: -1,
  playerOneTurn: true,
  playerOnePoints: 0,
  playerTwoPoints: 0,
  winner: null,
  computerOpponent: false
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
  this.background = null;

}

// render a planet BOARD

Planet.prototype.renderBoard = function renderBoard(gamestate) {

  var board = $('<div>').addClass('board');

  //Top Row
  var topRow = $('<div>').addClass('row top-row');
  var columnOneTop = $('<div>').addClass('box column-one').addClass(this.name).attr('row', 0).attr('col', 0).data('clicked', false);
  this.bindBox(columnOneTop, gamestate);
  var columnTwoTop = $('<div>').addClass('box column-two').addClass(this.name).attr('row', 0).attr('col', 1).data('clicked', false);
  this.bindBox(columnTwoTop, gamestate);
  var columnThreeTop = $('<div>').addClass('box column-three').addClass(this.name).attr('row', 0).attr('col', 2).data('clicked', false);
  this.bindBox(columnThreeTop, gamestate);
  topRow.append(columnOneTop, columnTwoTop, columnThreeTop);

  //Middle Row
  var middleRow = $('<div>').addClass('row middle-row');
  var columnOneMid = $('<div>').addClass('box column-one').addClass(this.name).attr('row', 1).attr('col', 0).data('clicked', false);
  this.bindBox(columnOneMid, gamestate);
  var columnTwoMid = $('<div>').addClass('box column-two').addClass(this.name).attr('row', 1).attr('col', 1).data('clicked', false);
  this.bindBox(columnTwoMid, gamestate);
  var columnThreeMid = $('<div>').addClass('box column-three').addClass(this.name).attr('row', 1).attr('col', 2).data('clicked', false);
  this.bindBox(columnThreeMid, gamestate);
  middleRow.append(columnOneMid, columnTwoMid, columnThreeMid);

  //Bottom Row
  var bottomRow = $('<div>').addClass('row bottom-row');
  var columnOneBot = $('<div>').addClass('box column-one').addClass(this.name).attr('row', 2).attr('col', 0).data('clicked', false);
  this.bindBox(columnOneBot, gamestate);
  var columnTwoBot = $('<div>').addClass('box column-two').addClass(this.name).attr('row', 2).attr('col', 1).data('clicked', false);
  this.bindBox(columnTwoBot, gamestate);
  var columnThreeBot = $('<div>').addClass('box column-three').addClass(this.name).attr('row', 2).attr('col', 2).data('clicked', false);
  this.bindBox(columnThreeBot, gamestate);
  bottomRow.append(columnOneBot, columnTwoBot, columnThreeBot);

  board.append(topRow, middleRow, bottomRow);

  return board;
}


// bind a click to each box
Planet.prototype.bindBox = function bindBox(boxNode, gamestate) {
  var scope = this;

  boxNode.on('click', function(e){

      var square = $(e.target);
      var index = [
        parseInt(square.attr('row')),
        parseInt(square.attr('col'))
      ];


      if (scope.winner !== null){
        var gameAlert = renderGameAlert('That planet is already claimed.');
      }
      else if (square.data('clicked') === false){
        square.data('clicked', true);
        scope.mapToArray(index[0],index[1], gamestate);
        scope.playerTurn(boxNode, gamestate);
      }
      else {
        console.log('You cannot make this move.');
      }
  });
  return boxNode, gamestate;
};

// map player click to the gameboard array
Planet.prototype.mapToArray = function mapToArray(row, col, gamestate){
  if (gamestate.playerOneTurn === true) {
    this.gameboard[row][col] = 1;  //this.turn.piece;
} else if (gamestate.playerOneTurn === false) {
    this.gameboard[row][col] = -1;  //this.turn.piece;
}
  console.log(this.gameboard[row]);
};

//color the box depending on whose turn it is
Planet.prototype.colorBoxOnClick = function colorBoxOnClick(boxNode, gamestate){

  if (this.winner === null) {

    if (gamestate.playerOneTurn === true){
      boxNode.css({'backgroundColor': gamestate.playerOneColor});
    } else {
      boxNode.css({'backgroundColor': gamestate.playerTwoColor});
      }
  } else {
    console.log('This planet has been captured');
  }
};

// toggles player turn
Planet.prototype.toggleTurn = function toggleTurn(gamestate){

  if (this.winner === null) {

    if (gamestate.playerOneTurn === true){
      console.log('toggling turn')
      gamestate.playerOneTurn = false;
    } else {
      gamestate.playerOneTurn = true;
      }
  }
};


// colors all boxes if a planet is Won
Planet.prototype.colorAllBoxes = function colorAllBoxes(gamestate){

  var planetClass = ('.' + this.name);
  var planetBoxes = $(planetClass);

    if (this.winner === 'playerOne'){
      for (var i = 0; i < planetBoxes.length; i++) {
        planetBoxes.eq(i).css({
          'backgroundColor': gamestate.playerOneColor,
          'opacity': '0.6',
        });
        planetBoxes.eq(i).data('clicked', true);
      }
    } else if (this.winner = 'playerTwo'){
      for (var x = 0; x < planetBoxes.length; x++) {
        planetBoxes.eq(x).css({'backgroundColor': gamestate.playerTwoColor});
        planetBoxes.eq(i).data('clicked', true);
      }
    }

      return $('body');
};

//check if the GAME is won
Planet.prototype.checkGameWinner = function checkGameWinner(gamestate){
  var gameOverMessage;

  if (gamestate.playerOnePoints > 67){
    gamestate.winner = 'playerOne';
    gameOverMessage = this.appendGameOverMessage(gamestate);
    gameOver(gamestate);
    return gameOverMessage;
    console.log(game)
    console.log('Player One Won: ' + gamestate.playerOnePoints);
  } else if (gamestate.playerTwoPoints > 67){
    console.log('Player Two Won: ' + gamestate.playerTwoPoints);
  }

  //update with gameover() function
};

// apends a game over message to the alert box
Planet.prototype.appendGameOverMessage = function appendGameOverMessage(gamestate) {
  var gameOverMessage = this.generateGameOverMessage(gamestate);
  console.log('game over message: ' + gameOverMessage);
  var messageTag =  $('<h5>');
  messageTag.html(gameOverMessage);
  var alertBox = $('.gameAlert');
  alertBox.html(messageTag);
  return alertBox;
}

// what happens during a player turn
Planet.prototype.playerTurn = function playerTurn(boxNode, gamestate){

  if (gamestate.computerOpponent === false) {
    this.colorBoxOnClick(boxNode, gamestate);
    this.toggleTurn(gamestate);
    console.log('player 2 turn');
  } else if (gamestate.computerOpponent === true) {
    this.colorBoxOnClick(boxNode, gamestate);
    this.findUnclickedBox();
    }
    //else if contains unusued logic for computer opponent
    this.checkPlanetWinner(gamestate);
    this.checkGameWinner(gamestate);

  };


// Computer AI ---  TAKEN OUT
/*

Planet.prototype.generateRandomIndex = function generateRandomIndex() {
  var maxBoxes = $('.box').length;
  var randomNumber = Math.floor(Math.random()*maxBoxes);

  return randomNumber;

}

Planet.prototype.generateRandomBox = function generateRandomBox() {
  var randomIndex = this.generateRandomIndex();
  var box = $('.box').eq(randomIndex);
  console.log(box);
  return box;
}

Planet.prototype.checkIfClicked = function checkIfClicked(boxNode) {
  console.log(boxNode);
  if (boxNode.data('clicked') === true){
    return true;
  } else {
    return false;
  }
}

Planet.prototype.findUnclickedBox = function findUnclickedBox() {
  var randomBox = this.generateRandomBox();
  var clickTest = this.checkIfClicked(randomBox);

  while (clickTest !== false) {
    randomBox = this.generateRandomBox();
    clickTest = this.checkIfClicked(randomBox);
  }

    randomBox.css({'backgroundColor': gamestate.playerTwoColor});
    this.mapComputerMoveToArray(randomBox);
};


Planet.prototype.mapComputerMoveToArray = function mapComputerMoveToArray(randomBox) {

//IS CURRENTLY MAPPING TO WHATEVER BOARD THE PLAYER JUST MADE A PLAY IN
  var index = [
    parseInt(randomBox.attr('row')),
    parseInt(randomBox.attr('col'))
  ];
  console.log(index);
  console.log(this.gameboard);
    this.gameboard[index[0]][index[1]] = -1;
    return this.gameboard;
};


function generateRandomGalaxy() {
  var randomNumber = Math.floor(Math.random()*3);
  return randomNumber;
}

function generateRandomPlanet() {
  var randomNumber = Math.floor(Math.random()*3);
  return randomNumber;
}

*/



//  Win Logic Start ---

Planet.prototype.checkPlanetWinner = function checkPlanetWinner(gamestate){

    this.rowChecker(gamestate);
    this.columnChecker(gamestate);
    this.diagonalBottomChecker(gamestate);
    this.diagonalTopChecker(gamestate);
    //this.tieCheck();

    if (this.winner !== null) {
    this.colorAllBoxes(gamestate);

    removeMenuBar();
    renderMenuBar(gamestate);
    this.alertWin(gamestate);
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
          this.winner = 'playerOne';
          gamestate.playerOnePoints += 5;
          return gamestate;
        }
        else if (rowSum === -3) {
          this.winner = 'playerTwo';
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
          this.winner = 'playerOne';
          gamestate.playerOnePoints += 5;
          return gamestate;        }
        else if (colSum === -3) {
          this.winner = 'playerTwo';
          gamestate.playerTwoPoints += 5;
          return gamestate;        }
      }
}
};

Planet.prototype.diagonalBottomChecker = function diagonalBottomChecker(gamestate){

  var diagonalSum = 0;

  diagonalSum = this.gameboard[2][0] + this.gameboard[1][1] + this.gameboard[0][2];

  if  (diagonalSum === 3) {
    this.winner = 'playerOne';
    gamestate.playerOnePoints += 5;
    return gamestate;
  }
  else if (diagonalSum === -3) {
    this.winner = 'playerTwo';
    gamestate.playerTwoPoints += 5;
    return gamestate;
  }

};

Planet.prototype.diagonalTopChecker = function diagonalTopChecker(gamestate){

  var diagonalSum = 0;
    for (var i = 0; i < 3; i++) {
      diagonalSum += this.gameboard[i][i];
      if  (diagonalSum === 3) {
        this.winner = 'playerOne';
        gamestate.playerOnePoints += 5;
        return gamestate;      }
      else if (diagonalSum === -3) {
        this.winner = 'playerTwo';
        gamestate.playerTwoPoints += 5;
        return gamestate;      }
}
};

Planet.prototype.generateWinMessage = function generateWinMessage(gamestate){
  var winMessage;
  var playerOneName = gamestate.playerOne;
  var playerTwoName = gamestate.playerTwo;
  console.log(gamestate);
  if (this.winner === 'playerOne'){
    winMessage = this.name + ' has been claimed by <br> Commander ' + playerOneName;
  } else if (this.winner === 'playerTwo') {
    winMessage = this.name + ' has been claimed by <br>' + playerTwoName;
  }

  return winMessage;
};


//   GAME OVER Start ---

Planet.prototype.generateGameOverMessage = function generateGameOverMessage(gamestate){
  var gameOverMessage;
  var playerOneName = gamestate.playerOne;
  var playerTwoName = gamestate.playerTwo;

  if (gamestate.winner === 'playerOne'){
    gameOverMessage = 'Commander' + playerOneName + ' wins';
  } else if (gamestate.winner === 'playerTwo') {
    gameOverMessage = playerOneName +' wins';
  }

  return gameOverMessage;
};

function gameOver(gamestate){
  var universe = $('#universe');
  var headerTag = $('h1');
  var menuBar = $('#gamestate-bar');
  headerTag.remove();
  universe.remove();
  menuBar.remove();
  renderGameOverContainer(gamestate)
  return $('body');
};



// ---  Game Over Rendering


function renderGameOverContainer(gamestate) {
  var container = $('<div>').attr('id', "game-over-menu-container");

  container.append(renderGameOverMenu(gamestate));

  return $('body').append(container);
};

function renderGameOverMenu(gamestate) {

    var menu = $('<div>').addClass('game-over-menu');
    var gameOverBox = renderGameOverBox(gamestate);
    var button = renderRestartButton();
    menu.append(gameOverBox, button);

    return menu;
  };

function renderGameOverBox(gamestate) {

    var gameOverBox = $('<div>').addClass('game-over-box');
    var gameOverMessage;

    if (gamestate.winner === 'playerOne'){
      gameOverMessage = $('<h4>').addClass('game-over-message').html('Game Over. <br><br> Commander ' + gamestate.playerOne + ' wins!');
      gameOverBox.append(gameOverMessage);
    }
    else if (gamestate.winner === 'playerTwo') {
      gameOverMessage = $('<h4>').addClass('game-over-message').html('Game Over. <br><br>' + gamestate.playerOne);
      gameOverBox.append(gameOverMessage);
    }
    return gameOverBox;
  };


function renderRestartButton() {
  var button = $('<button>');
    button.attr('name', 'restartButton');
    button.addClass('restart')
    button.text('Restart');
    bindRestartButton(button);
    return button;
}

function bindRestartButton(button){
  button.on('click', function(e) {
    console.log('click');
    var restart = $(e.target);
      removeRestartMenu();
      gamestate = {
        active: true,
        playerOne: 'Default',
        playerTwo: 'Emperor Zorgg',
        playerOneColor: 'red',
        playerTwoColor: 'blue',
        playerOneMarker: 1,
        playerTwoMarker: -1,
        playerOneTurn: true,
        playerOnePoints: 0,
        playerTwoPoints: 0,
        winner: null,
        computerOpponent: true
      };

      init();

  });
}

function removeRestartMenu() {
  var restartMenu = $('#game-over-menu-container');

  restartMenu.remove();
}


Planet.prototype.alertWin = function alertWin(gamestate){
  var winMessage = this.generateWinMessage(gamestate);
  var messageTag =  $('<h5>');
  messageTag.html(winMessage);
  var alertBox = $('.gameAlert');
  alertBox.html(messageTag);
  return alertBox;
};

Planet.prototype.alertGameWin = function alertGameWin(gamestate){
  var winMessage = this.generateWinMessage(gamestate);
  var messageTag =  $('<h5>');
  messageTag.html(winMessage);
  var alertBox = $('.gameAlert');
  alertBox.html(messageTag);
  console.log('wm ' + winMessage);
  //appendGameMessage(winMessage);
  return alertBox;
};

// --- end of the Planet



// --- Player -- CURRENTLY UNUSED

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

  this.winner = null;
}


//   START GAME FUNCTION ---


  TicTacToe.prototype.startGame = function startGame(){
    this.renderStartMenu(gamestate);
  }


//   ---   START GAME FUNCTION



// Start Menu
TicTacToe.prototype.renderStartMenu = function renderStartMenu(gamestate) {
  var container = $('<div>').attr('id', "start-menu-container");

  container.append(this.renderWelcomeMenu(gamestate));
  this.startBackground();
  this.startGameName();

  return $('body').append(container);
};

// --- Start Menu Parts
  TicTacToe.prototype.startBackground = function startBackground(){

    $('body').css({'background': 'url(\'http://img2.wikia.nocookie.net/__cb20130118053308/starwars/images/9/9c/DCS_Destruction.png\')'});
    return $('body');
  };

  TicTacToe.prototype.gameBackground = function gameBackground(){
    $('body').css({'background': 'url(\'http://apod.nasa.gov/apod/image/1004/m66_hst_big.jpg\')'});
    $('body').css({'backgroundSize': 'cover'});
    return $('body');
  };

  TicTacToe.prototype.startGameName = function startGameName(){
    var gameName = $('<h2>').html('Space <br> Tic Tac Toe');
    return $('body').append(gameName);
  };

  TicTacToe.prototype.removeStartGameName = function removeStartGameName(){
    var gameName = $('h2');
    gameName.remove();
    return $('body');
  };

  TicTacToe.prototype.renderWelcomeMenu = function renderWelcomeMenu(gamestate) {

    var menu = $('<div>').addClass('welcome-menu');

    var welcomeBox = this.renderWelcomeBox();
    menu.append(welcomeBox);

    return menu;
  };

  TicTacToe.prototype.renderWelcomeBox = function renderWelcomeBox() {

    var welcomeBox = $('<div>').addClass('welcome-box');
    var welcomeMessage = $('<h4>').addClass('welcome-message').html('Incoming Message: <br><br> Officer, your SOS was received. <br><br>The flagship is in critical condition.  You are the sole survivor. Only you can communicate with our forces.  You must stay on board and take charge of the navy or we will all perish. <br><br>Please send me your name to include on the memorial should you succed before your ship runs out of oxygen or the invaders enslave us all. <br><br>The universe thanks you for your sacrifice,<br>Supreme Chancellor Kathew');
    //var playerOptions = this.renderOpponentOptions();
    var nameForm = this.renderNameForm(gamestate);
    welcomeBox.append(welcomeMessage, nameForm);
    return welcomeBox;
  };


  // Name Form Start ---

    TicTacToe.prototype.renderNameForm = function renderNameForm(gamestate) {
      var form = $('<form>');
        form.attr('id', 'player-name-entry');
      var input = $('<input>');
        input.attr('type', 'text');
        input.attr('name', 'playerName[name]');
        input.attr('placeholder', 'enter name')
        input.attr('id', 'name-entry');
      var submitButton = $('<input>').attr('type', 'submit').addClass('enter-name-button').text('Launch Tactical Display');
      //var playerOption = this.renderPlayerOption()
      //var computerOption = this.renderComputerOption();

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
          //var opponentField = $('input:checked').val();


          //scope.applyOpponentToGameState(opponentField, gamestate);
          scope.appendGameName();
          //scope.appendName(nameText);
          scope.applyNameToGameLogic(nameText);
          scope.universe.buildUniverse();
          renderMenuBar(gamestate);
          scope.gameBackground();
          scope.removeStartMenu();
          scope.removeStartGameName();
          return scope;
        });
    };


/* Choose opponent Radio options

    TicTacToe.prototype.applyOpponentToGameState = function applyOpponentToGameState(opponent, gamestate){
      if (opponent === 'player'){
        gamestate.computerOpponent = false;
      } else if (opponent === 'computer') {
        gamestate.computerOpponent = true;
      }

    };

    TicTacToe.prototype.renderPlayerOption = function renderPlayerOption(){

      var playerOpponent = $("<input>");
      playerOpponent.attr('type', "radio").attr('id', 'opponent-radio').attr('value', 'player').attr('label', 'Player').attr('name', 'opponent-choice[choice]');
      playerOpponent.css({'display': 'inline-block'});

      playerOpponent.text('Player');

      return playerOpponent;

    };

    TicTacToe.prototype.renderComputerOption = function renderComputerOption(){

      var computerOpponent = $("<input>");
      computerOpponent.attr('type', "radio").attr('id', 'opponent-radio').attr('value', 'computer').attr('label', 'Computer').attr('name', 'opponent-choice[choice]').attr('checked', 'true');
      computerOpponent.css({'display': 'inline-block'});
      computerOpponent.text('Computer');

      return computerOpponent;

    };

*/

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
  var gameMessage = this.renderGameAlert('First Player to break 67 points wins.');
  menuBar.append(playerOneInfo, gameMessage, playerTwoInfo);

  return $('body').append(menuBar);
};

function removeMenuBar() {
  var menuBar = $('#gamestate-bar');
  menuBar.remove();
}


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
  playerOneName.html('Commander <br>' + gamestate.playerOne);
  playerOneNameDiv.append(playerOneName);

return playerOneNameDiv;
};

function renderPlayerOneScore(gamestate) {
  var playerOneScoreDiv = $('<div>')
  playerOneScoreDiv.addClass('playerOne score');
  var playerOne = $('<h5>');
  console.log('renderPlayerOnePoint: ' + gamestate.playerOnePoints);
  playerOne.html('Player Score <br>' + gamestate.playerOnePoints);
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
  playerTwoNameDiv.addClass('playerTwo name');
  var playerTwoName = $('<h5>');
  playerTwoName.html(gamestate.playerTwo);
  playerTwoNameDiv.append(playerTwoName);

  return playerTwoNameDiv;
};

function renderPlayerTwoScore(gamestate) {
  var playerTwoScoreDiv = $('<div>')
  playerTwoScoreDiv.addClass('playerTwo score');
  var playerTwo = $('<h5>');
  playerTwo.html('Opponent <br>' + gamestate.playerTwoPoints);
  playerTwoScoreDiv.append(playerTwo);

return playerTwoScoreDiv;
};


function renderGameAlert(message){
  var gameAlert = $('<div>');
  gameAlert.addClass('info gameAlert')
  var gameAlertHeader = $('<h5>');
  gameAlertHeader.html(message);
  gameAlert.append(gameAlertHeader);
  return gameAlert;
};

function appendGameMessage(message){
  var gameAlert = $('.gameAlert');
  console.log(message);
  console.log(gameAlert);
  gameAlert.html(message);
  return $('body').append(gameAlert);
};

function removeGameAlert(){
  var gameAlert = $('gameAlert');
  gameAlert.remove();
  return $('body');
}



//  --- Game Setup and Initilization

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
