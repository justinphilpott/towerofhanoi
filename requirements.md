I wish to be able to 
- play the tower of hanoi game
- choose the number of towers
- choose the number of disks
- start a game with chosen numbers of disks and towers
- reset a game to the start position
- show the minimum number of moves for the chosen game
- show the actual number of moves made so far
- quit and start a new game


Start screen:
- info, 
- "Choose your puzzle setup":
-- "Number of disks"
-- "Number of towers"
-- "Play" button




Game screen:
- Game board containing the chosen number of towers and disks 
- Info showing:
-- min number of moves for this configuration
-- actual moves so far
- "Reset" button which reset the game board to the start position
- "New game" button which returns the game to the start screen


State control:

Screen fsm
Hanoi fsm

Screen scope
- Start
-- Choose options. Options are the game start info.
they could well be on the same page, they are not internal to the game but they define the type of game
and must be supplied to the game component and the game fsm

-> play can be selected at any time as one cannot select an invalid game setup or no game.

- Play
-- The game start data set above must be supplied to the game fsm which in turn will supply updated state to the component via

-> reset game -> send an event to the hanoi fsm... resets params to the initial state that we started with
-> new game -> send an event to the screen fsm to show confirm screen






