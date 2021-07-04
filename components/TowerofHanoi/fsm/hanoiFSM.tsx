import { createMachine, assign } from 'xstate';
import { createModel } from 'xstate/lib/model';
import { initialGameBoardState } from './hanoiFSMActions';
import { isSelected, emptyPegSelected, immoveableDiskSelected, validMoveSelection, gameCompleteCheck } from './hanoiFSMGuards';
import { HanoiContext, HanoiEvent } from './types/hanoiFSMTypes';
import { assertEvent } from 'xstate-helpers';

const HanoiFSMModel = createModel({
  numDisks: 0,
  numPegs: 0,
  gameBoard: Array(Array()),
  selectedPeg: 0,
  moves: Array(Array())
});

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
            { cond: emptyPegSelected, target: '.emptyPegSelected' },
            { cond: immoveableDiskSelected, target: '.immoveableDiskSelected' },
            { target: '.diskSelected' }
          ],
          RESET: 'init'
        },
        initial: 'awaitSelection',
        states: {
          awaitSelection: {},
          emptyPegSelected: {},
          immoveableDiskSelected: {},
          diskSelected: {
            entry: ['setSelectedPeg'],
            type: 'final'
          }
        },
        onDone: 'moveSelection'
      },

      // handle choosing where to place that disk
      moveSelection: {
        on: {
          SELECT: [
            { cond: isSelected, target: '.alreadySelected' },
            { cond: validMoveSelection, target: '.moveSelected' },
            { target: '.moveSelected' }
          ],
          RESET: 'init'
        },
        initial: 'awaitSelection',
        states: {
          awaitSelection: {},
          invalidMoveAttempt: {},
          alreadySelected: {
            entry: ['deSelect'],
            always: { target: 'awaitSelection' } // this need to go back to the origin waiting for selection
          },
          moveSelected: {
//            entry: ['setSelectedPeg'],
            type: 'final'
          }
        },
        onDone: 'moveSelected'
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
        console.log('initializeGameState');
        const gameBoard = initialGameBoardState(context.numPegs, context.numDisks);
        return {
          selectedPeg: null,
          // moves: number[][],
          gameBoard: gameBoard
        }
      }),

      /**
       * setSelectedPeg
       */
      setSelectedPeg: assign((context: HanoiContext, event: HanoiEvent) => {
        assertEvent(event, 'SELECT');
        return {
          selectedPeg: event.pegIndex
        }
      }),

      /**
       * deSelect
       */
      deSelect: assign((context: HanoiContext, event) => {
        return {
          selectedPeg: null
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
      isSelected,
      emptyPegSelected,
      immoveableDiskSelected,

      validMoveSelection,
      gameCompleteCheck
    },
  }
);


