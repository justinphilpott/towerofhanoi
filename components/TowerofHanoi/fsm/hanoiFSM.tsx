import { Machine, assign } from 'xstate';
import { initialGameState, processSelect } from './actions/hanoiFSMActions';

/**
 * hanoiFSM
 * 
 * select needs to determine if this is the first selection
 * or the move selection, if the selection is legal or not etc....
 *
 * 
 */
 export const hanoiFSM = Machine(
  {
    id: 'hanoiFSM',
    initial: 'playing',
    context: {
      numDisks: 0,
      numPegs: 0,
      gameBoard: Array(Array()),
      activePeg: 0,
      moves: Array(Array()),
      errorMessage: '',
    },
    states: {
      playing: {
        initial: 'awaitingSelection',
        states: {
          awaitingSelection: {
            initial: 'start',
            states: {
              start: {
                entry: ['initializeGameState']
              },
              midGame: {
                on: {
                  SELECT: {

                  }
                }
              }
            }
          },
          diskSelected: {

          },
          invalidDiskSelection: {

          },
          moveSelected: {

          },
          invalidMoveSelected: {

          },
          movingDisk: {

          },
        },
      },
      gameComplete: {
        on: {
          RESET: 'playing',
          NEWGAME: 'newGame'
        }
      },
      newGame: {
        type: 'final'
      }
    }
  },
  {
    actions: {
      /**
       * set up the default game position, all disks on the left hand peg
       */
      initializeGameState: assign({
        gameBoard: (context) => initialGameState(context.numPegs, context.numDisks)
      }),

      /**
       * 
       */
      updateGameState: assign((context, event) => {

        // obtain these from the event
        const srcPeg = 0;
        const destPeg = 2;

        // work on a copy, then assign. At this point we've already verified move legality
        let newGameBoard = context.gameBoard;
        newGameBoard[destPeg].push(newGameBoard[srcPeg].pop());

        return {
          gameBoard: newGameBoard
        };
      }),

      /**
       * 
       */

    },
    guards: {

    },
    services: {

    }
  }
);




/*
      awaitingInput: {
        states: {
          invalidSelection: {
            on: {
              SELECT: 'srcSelected',
              RESET: 'initial',
              NEWGAME: 'newGame'
            }
          },
          srcSelected: {
            on: {
              
               * analyse gameBoard to see if this peg can be a dest peg, i.e.
               * - is empty
               * - or, has disk that is larger than the top disk on src peg (activePeg)
               *
               * if (legal dest selection) {
               *    target: 'moveSelected'
               * } else {
               *    target: 'invalidMove'
               * }
               
               SELECT: 'moveSelected',
    
               RESET: 'initial',
               NEWGAME: 'newGame'
             }
           },
           invalidMove: {
             on: {
               SELECT: 'moveSelected',
               RESET: 'initial',
               NEWGAME: 'newGame'
             }
           },
             
         }
       }

       moveSelected: {
         on: {
           MOVE: 'moveInProgress',
           REJECTMOVE: 'invalidMove',
           RESET: 'initial',
           NEWGAME: 'newGame'
         }
       },
     
       moveInProgress: {
         on: {
 
           MOVECOMPLETE: 'moveComplete',
         }
       },
       
       moveComplete: {
         // on entry, check if game is complete...
         // GAMECOMPLETE: 'gameComplete'
         on: {
           SELECT: 'srcSelected',
           RESET: 'initial',
           NEWGAME: 'newGame'
         }
       },


       */