import { createMachine, assign } from 'xstate';
import { createModel } from 'xstate/lib/model';
import { initialGameBoardState, processSelect } from './hanoiFSMActions';
import { validDiskSelection, validMoveSelection } from './hanoiFSMGuards';
import { HanoiContext, HanoiEvent } from './types/hanoiFSMTypes';


const HanoiFSMModel = createModel({
  numDisks: 0,
  numPegs: 0,
  gameBoard: Array(Array()),
  activePeg: 0,
  moves: Array(Array()),
  errorMessage: '',
})


/**
 * hanoiFSM
 *
 * select needs to determine if this is the first selection
 * or the move selection, if the selection is legal or not etc....
 */
 export const hanoiFSM = createMachine<typeof HanoiFSMModel, HanoiContext, HanoiEvent>(
  {
    id: 'hanoiFSM',
    initial: 'playing',
    states: {
      playing: {
        initial: 'awaitingDiskSelection',
        states: {





          // 
          awaitingDiskSelection: {
            initial: 'start',
            states: {
              start: {
                entry: ['initializeGameState']
              },
              midGame: {}
            },
            on: {
              SELECT: [
                {
                  target: 'diskSelected',
                  cond: validDiskSelection
                },
                {
                  target: 'invalidDiskSelection'
                }
              ]
            }
          },






          invalidDiskSelection: {
            on: {
              SELECT: [
                {
                  target: 'moveSelected',
                  cond: validMoveSelection
                },
                {
                  target: 'invalidMoveSelected'
                }
              ]
            }
          },
          diskSelected: {
            on: {
              SELECT: [
                {
                  target: 'moveSelected',
                  cond: validMoveSelection
                },
                {
                  target: 'invalidMoveSelected'
                }
              ]
            }
          },
          invalidMoveSelected: {
            on: {
              SELECT: [
                {
                  target: 'moveSelected',
                  cond: validMoveSelection
                },
                {
                  target: 'invalidMoveSelected'
                }
              ]
            }
          },
          moveSelected: {
            // do the actual move...
            
          },
          movingDisk: {

            // this will be
          },
          moveComplete: {

            // this will be transitioned too when
          }
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
        gameBoard: (context) => initialGameBoardState(context.numPegs, context.numDisks)
      }),

      /**
       *
       */
      updateGameState: assign((context: HanoiContext, event) => {

        // obtain these from the event
        const srcPeg = 0;
        const destPeg = 2;

        // work on a copy, then assign. At this point we've already verified move legality
        let newGameBoard: any[][] = context.gameBoard;
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
      validDiskSelection,
      validMoveSelection
    },
    services: {

    }
  }
);
