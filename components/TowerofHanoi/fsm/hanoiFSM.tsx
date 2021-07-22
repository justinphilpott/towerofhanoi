import { createMachine, assign } from 'xstate';
import { createModel } from 'xstate/lib/model';
import { initialGameBoardState } from './hanoiFSMActions';
import { isSelected, emptyPegSelected, immoveableDiskSelected, inValidMoveSelection, gameCompleteCheck } from './hanoiFSMGuards';
import { HanoiContext, HanoiEvent, Move } from './types/hanoiFSMTypes';
import { assertEvent } from 'xstate-helpers';
import { timerFSM } from './timerFSM';

const HanoiFSMModel = createModel({
  numDisks: 0,
  numPegs: 0,
  gameBoard: Array(Array()),
  selectedPeg: 0,
  moves: Array({})
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
    initial: 'start',
    states: {

      // setup the timer machine and proceed to diskSelection.awaitingSelection
      // TIMER TODO!
      start: {
        invoke: {
          id: 'timerFSM',
          src: timerFSM,

          // here we can construct the initial state based on the values set in screenStart
          data: {
            elapsed: 0,
            duration: 10,
            interval: 1
          },
        },

        always: {
          target: 'diskSelection'
        }
      },

      // handle choosing which disk we will move
      diskSelection: {
        on: {
          SELECT: [
            { cond: emptyPegSelected, target: '.emptyPegSelected' },
            { cond: immoveableDiskSelected, target: '.immoveableDiskSelected' },
            { target: '.diskSelected' }
          ],
          RESET: 'reset',
          UNDO: 'undo'
        },
        initial: 'awaitSelection',
        states: {
          awaitSelection: {},
          emptyPegSelected: {},
          immoveableDiskSelected: {},
          diskSelected: {
            entry: ['setSelectedPeg'],
            always: '#hanoiFSM.moveSelection'
          }
        },
      },

      // handle choosing where to place that disk
      moveSelection: {
        on: {
          SELECT: [
            { cond: isSelected, target: '.alreadySelected' },
            { cond: inValidMoveSelection, target: '.invalidMoveAttempt' },
            {
              target: '.moveSelected',
              actions: ['saveMove']
            }
          ],
          RESET: 'reset',
          UNDO: 'undo'
        },
        initial: 'awaitSelection',
        states: {
          awaitSelection: {},
          invalidMoveAttempt: {},
          alreadySelected: {
            entry: ['deSelect'],
            always: { target: '#hanoiFSM.diskSelection.awaitSelection' } // this need to go back to the origin waiting for selection
          },
          moveSelected: {
            always: { target: '#hanoiFSM.moveSelected' }
          }
        },
      },

      // complete the move
      moveSelected: {
        always: [
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
          { target: 'diskSelection' }
        ],
      },
      reset: {
        entry: ['resetGameState'],
        always: ['diskSelection']
      },
      resetPlusOneDisk: {
        entry: ['resetGameStatePlusOne'],
        always: ['diskSelection']
      },

      undo: {
        entry: ['undoMove'],
        always: ['diskSelection']
      },
      gameComplete: {
        // stop timer

        on: {
          RESET: 'reset',
          RESETPLUSONE: 'resetPlusOneDisk',
        }
      }
    }
  },
  {
    actions: {

      /**
       * set up the default game position, all disks on the left hand peg
       */
       resetGameState: assign((context: HanoiContext, event) => {
        const gameBoard = initialGameBoardState(context.numPegs, context.numDisks);
        return {
          selectedPeg: null,
          moves: Array(),
          gameBoard: gameBoard
        }
      }),

      /**
       * set up the default game position, all disks on the left hand peg
       * 
       * plus one disk, if possible
       */
       resetGameStatePlusOne: assign((context: HanoiContext, event) => {
        const newDisks = context.numDisks < 8 ? context.numDisks + 1 : context.numDisks;
        const gameBoard = initialGameBoardState(context.numPegs, newDisks);
        return {
          selectedPeg: null,
          moves: Array(),
          gameBoard: gameBoard,
          numDisks: newDisks
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
       * undo the last move
       */
      undoMove: assign((context: HanoiContext, event) => {

        // clone array and get the last move
        let newMovesArray: Move[] = context.moves;
        const lastMove = newMovesArray.pop() as Move;
        // we known this can't be called with zero length moves so we assert type

        const srcPeg = lastMove.dest;
        const destPeg = lastMove.src;

        // work on a copy, then assign. At this point we've already verified move legality
        let newGameBoard: number[][] = context.gameBoard;

        let diskToMove = newGameBoard[srcPeg][0];
        newGameBoard[srcPeg].shift()
        newGameBoard[destPeg].unshift(diskToMove);

        return {
          gameBoard: newGameBoard,
          moves: newMovesArray,
          selectedPeg: null
        };
      }),

      /**
       * we need to save the move so that we can (in a later state) update the game state
       */
      saveMove: assign((context: HanoiContext, event) => {
        assertEvent(event, 'SELECT');
        const newMove: Move = {
          src: context.selectedPeg as number,
          dest: event.pegIndex
        }
        const moves = context.moves;
        moves.push(newMove);
        // not that we reset the selected peg here also
        return {
          selectedPeg: null,
          moves: moves
        }
      }),

      /**
       * updateGameState
       */
      updateGameState: assign((context: HanoiContext, event) => {

        // get the last move in the array as it is the one that has not yet been used to update the game state
        const move = context.moves[context.moves.length-1];

        // obtain these from the moves array
        const srcPeg = move.src;
        const destPeg = move.dest;

        // work on a copy, then assign. At this point we've already verified move legality
        let newGameBoard: number[][] = context.gameBoard;

        // considering if I should have ordered the disks the other way around, and use push pop and other manipulations would have been more simple
        let diskToMove = newGameBoard[srcPeg][0];
        newGameBoard[srcPeg].shift()
        newGameBoard[destPeg].unshift(diskToMove);

        return {
          gameBoard: newGameBoard
        };
      }),
    },
    guards: {
      isSelected,
      emptyPegSelected,
      immoveableDiskSelected,
      inValidMoveSelection,
      gameCompleteCheck
    },
  }
);


