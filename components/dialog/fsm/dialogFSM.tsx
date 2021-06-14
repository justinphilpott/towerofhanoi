import { createMachine, assign } from 'xstate'
import { createModel } from 'xstate/lib/model';
import { hanoiFSM } from '../../TowerofHanoi/fsm/hanoiFSM'
import { PlayEvent, dialogContext } from './types/dialogFSMTypes';
import { HanoiContext } from '../../TowerofHanoi/fsm/types/hanoiFSMTypes'
import { start } from 'xstate/lib/actions';

/**
 * controls the dialog logic, transitions between dialogs
 * and receives high level info on the game state from the hanoi
 * fsm.
 *
 * States are keys of states, CAPS keys are events.
 */
const dialogFSMModel = createModel({
  title: 'Dialog title',
  numDisks: 5
})

export const dialogFSM = createMachine<typeof dialogFSMModel>(
  {
    id: 'dialogFSM',
    initial: 'start',
    context: dialogFSMModel.initialContext,
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
              dialogFSMModel.assign({ numPegs: (context, event: PlayEvent) => { console.log("pegs ", event.numPegs); return event.numPegs} }),
              dialogFSMModel.assign({ numDisks: (context, event: PlayEvent) => { console.log("disks ", event.numDisks); return event.numDisks} }),
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
              NEXT: { target: 'pageFour' },
              CLOSE: { target: 'finish' }
            }
          },
          pageFour: {
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

          // here we can construct the initial state based on the values set in dialogStart
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
          // go to the setting dialog
          SETTINGS: {
            target: 'settings'
          },
        },
        initial: 'default',
        states: {
          default: {
            on: {
              QUITCHECK: {
                target: 'quitDialog'
              }
            }
          },
          quitDialog: {
            on: {
              STAY: {
                target: 'default'
              },
              QUIT: {
                target: 'finish'
              },
            }
          },
          finish: {
            type: 'final'
          }
        },
        onDone: 'start'
      }
    }
  }
);
