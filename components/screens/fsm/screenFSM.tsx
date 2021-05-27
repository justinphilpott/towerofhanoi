import { Machine, assign } from 'xstate'
import { hanoiFSM } from '../../TowerofHanoi/fsm/hanoiFSM'

/**
 * controls the screen logic, transitions between screens
 * and receives high level info on the game state from the hanoi
 * fsm.
 *
 * States are keys of states, CAPS keys are events.
 */
export const screenFSM = Machine(
  {
    id: 'screenFSM',
    initial: 'start',
    // set a simple default
    context: {
      numPegs: 3,
      numDisks: 5
    },
    states: {
      start: {
        on: {
          PLAY: {
            target: 'game',
          },
          SETTINGS: {
            target: 'settings',
          }
        }
      },
      settings: {
        on: {
          PLAY: {
            target: 'game',
            actions: [
              assign({ numPegs: (context, event) => event.numPegs }),
              assign({ numDisks: (context, event) => event.numDisks }),
            ]
          }
        }
      },
      game: {

        // now we invoke the hanoiFSM setting the initial state
        invoke: {
          id: 'hanoiFSM',
          src: hanoiFSM,

          // here we can construct the initial state based on the values set in screenStart
          data: {
            numDisks: (context) => context.numDisks,
            numPegs: (context) => context.numPegs,
            activePeg: null
          },

          // onDone will be set when the hanoiFSM reaches its final state
          onDone: {
            target: 'start',
          }
        },
      }
    }
  },
  {
    actions: {
      setGameParams: (context, event) => {
        console.log('set params...');
      }
    },
    guards: {
      // this will need to go direct to the hanoi fsm to determine as that is the source of truth for game status
      // true === is not initial and is not complete
    }
  }
);




