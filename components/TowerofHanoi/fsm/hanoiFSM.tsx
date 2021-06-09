import { Machine, assign } from 'xstate';
import { initialGameState } from './actions/hanoiFSMActions';

/**
 * hanoiFSM
 */
 export const hanoiFSM = Machine(
  {
    id: 'hanoiFSM',
    initial: 'initial',
    context: {
      numDisks: 0,
      numPegs: 0,
      gameState: Array(Array()),
      activePeg: 0
    },
    states: {
      initial: {
        entry: ['initializeGameState'],
        on: {
          SELECTSRC: 'srcSelected',
          NEWGAME: 'newGame'
        }
      },
      srcSelected: {
        on: {
          REJECTSELECTION: 'invalidSelection',
          SELECTDEST: 'moveSelected',
          RESET: 'initial',
          NEWGAME: 'newGame'
        }
      },
      moveSelected: {
        on: {
          MOVE: 'moveInProgress',
          REJECTMOVE: 'invalidMove',
          RESET: 'initial',
          NEWGAME: 'newGame'
        }
      },
      invalidMove: {
        on: {
          SELECTDEST: 'moveSelected',
          RESET: 'initial',
          NEWGAME: 'newGame'
        }
      },
      invalidSelection: {
        on: {
          SELECTSRC: 'srcSelected',
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
        on: {
          GAMECOMPLETE: 'gameComplete',
          SELECTSRC: 'srcSelected',
          RESET: 'initial',
          NEWGAME: 'newGame'
        }
      },
      gameComplete: {
        on: {
          RESET: 'initial',
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
      initializeGameState: assign({
        gameState: (context, event) => initialGameState(context.numPegs, context.numDisks)
      })
    }
  }
);
