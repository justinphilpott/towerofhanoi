import { createMachine, assign } from 'xstate'
import { createModel } from 'xstate/lib/model';
import { hanoiFSM } from '../../TowerofHanoi/fsm/hanoiFSM'
import { ScreenContext } from './types/screenFSMTypes';
import { HanoiContext } from '../../TowerofHanoi/fsm/types/hanoiFSMTypes'
import { initialGameBoardState } from '../../TowerofHanoi/fsm/hanoiFSMActions';


/**
 * controls the screen logic, transitions between screens
 * and receives high level info on the game state from the hanoi
 * fsm.
 *
 * States are keys of states, CAPS keys are events.
 */
const screenFSMModel = createModel({
  numPegs: 3,
  numDisks: 5,
  gameBoard: Array()
})

export const screenFSM = createMachine<ScreenContext>(
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
            actions: ['saveSettings']
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
        entry: ['initializeGameState'],

        // now we invoke the hanoiFSM setting the initial state
        invoke: {
          id: 'hanoiFSM',
          src: hanoiFSM,

          // here we can construct the initial state based on the values set in screenStart
          data: {
            numDisks: (context: HanoiContext) => context.numDisks,
            numPegs: (context: HanoiContext) => context.numPegs,
            gameBoard: (context: HanoiContext) => context.gameBoard
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
  },
  {
    actions: {

      /**
       * set up the default game position, all disks on the left hand peg
       */
       initializeGameState: assign((context: ScreenContext, event) => {
        console.log('screen initializeGameState');
        const gameBoard = initialGameBoardState(context.numPegs, context.numDisks);
        return {
          selectedPeg: null,
          gameBoard: gameBoard
        }
      }),

      /**
       * the the pegs and disks and the resulting game board following settings change
       */
      saveSettings: assign((context: ScreenContext, event) => {
        return {
          numPegs: event.numPegs,
          numDisks: event.numDisks,
          gameBoard: initialGameBoardState(event.numPegs, event.numDisks)
        };
      })
    }
  }
);
