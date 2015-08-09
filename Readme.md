#Space Tic Tac Toe

## About

Tic Tac Toe by itself is a boring game.  I sought to make it more interesting by adding a story.  The game starts with the player in command of the navy's incapacitated flagship. They must compete in 27 concurrent games of Tic Tac Toe to save the galaxy from invasion.

http://stevecreswick.github.io/TicTacToe

### Screen Shots

##### Start Menu

![alt text](http://i.imgur.com/uwjUG8E.png)


##### Gameplay

![alt text](http://i.imgur.com/B9xcTCv.png)


## Implementation
The biggest challenge with this project was rendering 27 individual boards, each with its own array for game logic, and then mapping those boards to the universal gamestate.

To create the board a constructor function for the Universe was created and appended with 3 Galaxies created with their own Constructor function.  The Galaxies were then appended with 9 'Planets', created with their own Constrcutor function and each mapped to its own gameboard array for logic.


#### Technologies
- HTML
- CSS
- Javascript
- jQuery


### Unsolved Promblems
The computer player functionality was not working.  It generated a random move, but was mapping the logic to whatever board the player had just played on, rather than to the correct array.

Future versions will check the rows, columns, and diagonals in each of the 3 galaxies to see if they are conquered all by one player.  Players will get bonus points for this.

Future versions will include a 9 x 9 board with 4 players.

I abandoned the Player Constructor function I was going to use, opting to hardcode certain parameters to complete the project on time.  I am going to go back and incorporate a Player Constructor with more options.

The Restart Button needs to be reformatted.

### User Stories

- As a player I want a story to keep me invested in the game and raise the stakes of a win or loss

- As a user I want to see my score all the time so I can keep track of how close I am to winning

- As someone bored with typical Tic Tac Toe, I want more stategy involved to make the game harder

- As a user I want the ability to play against the  another player

- As a user I want to place a piece on the board so I can be one step closer to winning.

- As a user when I put three pieces in a row, I want the game to end and the world to celebrate my victory

- As a user I want a play again button so I do not have to reload the page




### Test Statements

- When I click on a box as player one, it will turn player one's color

- If player one/player two achieves a win by getting 3 across, 3 down, or 3 diagonal from the top-left or bottom-left, the gameboard will become innactive

-  When player one wins on a gameboard, their points should increase by 5

- When a player's points reaches higher than half the total available points, the game should end and that player should win
