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
  gameBoard: Array(),
  showMoves: false,
  showTime: false,
})

/**
 * gameInProgress
 *
 * read the status of the spawned hanoiFSM
 * 
 * if it is status gameComplete or context.moves === 0, 
 * game has not started so this will return false
 */
const gameInProgress = () => {
  /**
   * this could be done in React or within Xstate
   *
   * if in react, we would read the hanoiFSM state and if
   * complete or zero moves, we don't show dialog (or even reset button!)
   *
   * In Xstate we have a condition which reads the state of the synced
   * invoked machine (how to sync an invoked machine) and returns based
   * on that state... we can read both state value and context...
   * so that should work fine and be neater...
   *
   * ...
   */

  // actions: (context, event, { state }) => {
  //   state.children['some-id']?.getSnapshot();
  // }

  return true;
}

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
            gameBoard: (context: HanoiContext) => context.gameBoard,
            moves: (context: HanoiContext) => context.moves,
            showMoves: (context: HanoiContext) => context.showMoves,
            showTime: (context: HanoiContext) => context.showTime
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
              },
              RESTARTCHECK: [
                {
                  cond: gameInProgress,
                  target: 'restartDialog'
                },
              ]
            },
          },
          quitDialog: {
            on: {
              STAY: {
                target: 'default'
              },
              QUIT: {
                target: '#screenFSM.start'
              },
            }
          },
          restartDialog: {
            on: {
              CANCEL: {
                target: 'default'
              },
              RESTART: {
                target: 'default'
              },
            }
          },
        },
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
          gameBoard: gameBoard,
          moves: Array()
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
    },
    guards: {
      gameInProgress
    }
  }
);
