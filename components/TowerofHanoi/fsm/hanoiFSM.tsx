import { createMachine, assign } from 'xstate';
import { createModel } from 'xstate/lib/model';
import { initialGameBoardState } from './hanoiFSMActions';
import { validDiskSelection, validMoveSelection, gameCompleteCheck } from './hanoiFSMGuards';
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
 export const hanoiFSM = createMachine<HanoiContext, HanoiEvent>(
  {
    id: 'hanoiFSM',
    initial: 'init',
    states: {
      init: {
        entry: ['initializeGameState'],
        always: { target: 'diskSelection' }
      },
      // handle choosing which disk we will move
      diskSelection: {
        on: {
          SELECT: [
            {
              target: 'moveSelection',
              cond: validDiskSelection
            },
            {
              target: '.invalidDiskAttempt'
            }
          ],
          RESET: 'init'
        },
        initial: 'awaitSelection',
        states: {
          awaitSelection: {},
          invalidDiskAttempt: {},
        }
      },

      // handle choosing where to place that disk
      moveSelection: {
        on: {
          SELECT: [
            {
              target: 'moveSelected',
              cond: validMoveSelection
            },
            {
              target: '.invalidMoveAttempt'
            }
          ],
          RESET: 'init'
        },
        initial: 'awaitSelection',
        states: {
          awaitSelection: {},
          invalidMoveAttempt: {},
        }
      },

      // complete the move
      moveSelected: {
        always: [
          { target: 'gameComplete', cond: 'gameCompleteCheck' },
          { target: 'movingDisk' }
        ],

        // do the actual move...
        // trigger animation
      },
      movingDisk: {
        // animating state
        always: { target: 'moveComplete' }
      },
      moveComplete: {
        // this will be transitioned too when the animation is complete
        entry: ['updateGameState'],

        always: [
          { target: 'gameComplete', cond: 'gameCompleteCheck' },
          { target: 'movingDisk' }
        ],
      },
      gameComplete: {
        on: {
          RESET: 'init',
        }
      }
    }
  },
  {
    actions: {
      /**
       * set up the default game position, all disks on the left hand peg
       */
      initializeGameState: assign((context: HanoiContext, event) => {
        return {
          gameBoard: initialGameBoardState(context.numPegs, context.numDisks)
        }
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
    },
    guards: {
      validDiskSelection,
      validMoveSelection,
      gameCompleteCheck
    },
    services: {

    }
  }
);
