import { createMachine, assign } from 'xstate'
import { createModel } from 'xstate/lib/model';
import { hanoiFSM } from '../../TowerofHanoi/fsm/hanoiFSM'
import { PlayEvent } from './types/screenFSMTypes';
import { HanoiContext } from '../../TowerofHanoi/fsm/types/hanoiFSMTypes'

/**
 * controls the screen logic, transitions between screens
 * and receives high level info on the game state from the hanoi
 * fsm.
 *
 * States are keys of states, CAPS keys are events.
 */
const hanoiDefault = createModel({
  numPegs: 3,
  numDisks: 5
})

export const screenFSM = createMachine<typeof hanoiDefault>(
  {
    id: 'screenFSM',
    initial: 'start',
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
              hanoiDefault.assign({ numPegs: (context, event: PlayEvent) => event.numPegs }),

            ]
          },
          START: {
            target: 'start'
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
            numDisks: (context: HanoiContext) => context.numDisks,
            numPegs: (context: HanoiContext) => context.numPegs,
            activePeg: null
          },

          // onDone will be set when the hanoiFSM reaches its final state
          onDone: {
            target: 'start',
          }
        },

        on: {
          SETTINGS: {
            target: "settings"
          }
        }
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
