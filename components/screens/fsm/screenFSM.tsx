import { createMachine, assign } from 'xstate'
import { createModel } from 'xstate/lib/model';
import { hanoiFSM } from '../../TowerofHanoi/fsm/hanoiFSM'
import { PlayEvent, ScreenContext } from './types/screenFSMTypes';
import { HanoiContext } from '../../TowerofHanoi/fsm/types/hanoiFSMTypes'
import { start } from 'xstate/lib/actions';

/**
 * controls the screen logic, transitions between screens
 * and receives high level info on the game state from the hanoi
 * fsm.
 *
 * States are keys of states, CAPS keys are events.
 */
const screenFSMModel = createModel({
  numPegs: 3,
  numDisks: 5
})

export const screenFSM = createMachine<typeof screenFSMModel>(
  {
    id: 'screenFSM',
    initial: 'start',
    context: screenFSMModel.initialContext,
    states: {
      start: {
        on: {
          PLAY: {
            target: 'game',
          },
          SETTINGS: {
            target: 'settings',
          },
          TUTORIAL: {
            target: 'tutorial',
          }
        }
      },
      settings: {
        on: {
          SAVE: {
            target: 'start',
            actions: [
              screenFSMModel.assign({ numPegs: (context, event: PlayEvent) => { console.log("pegs ", event.numPegs); return event.numPegs} }),
              screenFSMModel.assign({ numDisks: (context, event: PlayEvent) => { console.log("disks ", event.numDisks); return event.numDisks} }),
            ]
          }
        }
      },
      tutorial: {
        initial: 'pageOne',
        states: {
          pageOne: {
            on: {
              NEXT: { target: 'pageTwo' },
              CLOSE: { target: 'finish' }
            }
          },
          pageTwo: {
            on: {
              NEXT: { target: 'pageThree' },
              CLOSE: { target: 'finish' }
            }
          },
          pageThree: {
            on: {
              CLOSE: { target: 'finish' }
            }
          },
          finish: {
            type: 'final'
          }
        },
        onDone: 'start'
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
          // go to the setting screen
          SETTINGS: {
            target: 'settings'
          },
          START: {
            target: 'start'
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

    }
  }
);
