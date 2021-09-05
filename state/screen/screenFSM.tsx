import { createMachine, assign } from 'xstate'
import { createModel } from 'xstate/lib/model';
import { hanoiFSM } from '../hanoi/hanoiFSM'
import { ScreenContext } from './types/screenFSMTypes';
import { HanoiContext } from '../hanoi/types/hanoiFSMTypes'
import { initialGameBoardState } from '../hanoi/hanoiFSMActions';

/**
 *
 */
export const getScreenMachine = (initialState: string) => {

    /**
   * controls the screen logic, transitions between screens
   * and receives high level info on the game state from the hanoi
   * fsm.
   *
   * States are keys of states, CAPS keys are events.
   */
  const screenFSMModel = createModel({
    numPegs: 3,
    numDisks: initialState === 'tutorial' ? 3 : 5,
    gameBoard: Array(),
    showMoves: true,
    showTime: false,
    showTutorial: initialState === 'tutorial' ? true : false  // get set either t/f false depending on the start screen selection anyway
  })

  let FSMStruct = {
    id: 'screenFSM',
    initial: 'start',
    context: screenFSMModel.initialContext,
    states: {
      start: {
        on: {
          PLAY: {
            target: 'game',
            actions: ['resetInitialContext'] // set tutorial mode off
          },
          SETTINGS: {
            target: 'settings',
          },
          CREDITS: {
            target: 'credits',
          },
          TUTORIAL: {
            target: 'game',
            actions: ['setTutorialContext'] // set tutorial mode on
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
      credits: {
        on: {
          EXIT: {
            target: 'start',
          }
        }
      },

      game: {
        entry: ['initializeGameState'], // configure the FSM context depending on tutorial mode setting
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
            showTime: (context: HanoiContext) => context.showTime,
            showTutorial: (context: HanoiContext) => context.showTutorial
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
          // PLAY event here caused issues that point to it being better to have
          // @todo separate states for tutorial and game - selective re-use can occur
          // neatly on the component level
          QUIT: {
            target: 'start'
          }
        },
        initial: 'default',
        states: {
          default: {
            on: {
              QUITCHECK: {
                target: 'quitDialog'
              },
              RESTART: [
                {
                  // @todo fix redundant check as the UI currently prevents this being
                  // called at any other time (not-started or finished.)
                  // cond: gameInProgress,
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
      },
    }
  };
  // create the screen FSM with customised start
  // both the tutorial and the game use the same FSM state, but with a flag set in context to render in tutorial mode
  // @todo this could be done better, probably with a distinct 'tutorial' FSM state
  FSMStruct.initial = initialState === 'tutorial' ? 'game' : initialState;

  return createMachine<ScreenContext>(
    FSMStruct,
    {
      actions: {

        /**
         * set up the default game position, all disks on the left hand peg
         */
        initializeGameState: assign((context: ScreenContext) => {
          let updatedContext = {}

          // initialize hanoiFSM for the tutorial, or for the standard game
          if (context.showTutorial) {
            updatedContext = {
              selectedPeg: null,
              gameBoard: initialGameBoardState(context.numPegs, 3),
              moves: Array(),
              showMoves: false,
              showTime: false,
              showTutorial: true,
            }
          } else {
            updatedContext = {
              selectedPeg: null,
              gameBoard: initialGameBoardState(context.numPegs, context.numDisks),
              moves: Array()
            }
          }
          return updatedContext;
        }),

        /**
         * the the pegs and disks and the resulting game board following settings change
         */
        saveSettings: assign((context: ScreenContext, event) => {
          return {
            numPegs: event.numPegs,
            numDisks: event.numDisks,
            showMoves: event.showMoves,
            showTime: event.showTime,
            gameBoard: initialGameBoardState(event.numPegs, event.numDisks)
          };
        }),

        /**
         * This must also turn off timer and moves count
         */
        setTutorialContext: assign((context: ScreenContext, event) => { // eslint-disable-line
          console.log('set tutorial context');
          return {
            numPegs: 3,
            numDisks: 3,
            showMoves: false,
            showTime: false,
            showTutorial: true,
          };
        }),

        /**
         * Use to
         */
        setInitialContext: assign((context: ScreenContext, event) => { // eslint-disable-line
          console.log('set initial context');
          return {
            numPegs: 3,
            numDisks: 5,
            showMoves: true,
            showTutorial: false,
            gameBoard: initialGameBoardState(3, 5)
          };
        }),

        /**
         * Use to go back to normal mode after tutorial, but leave other custom settings as they are
         */
        resetInitialContext: assign((context: ScreenContext, event) => { // eslint-disable-line
          console.log('reset initial context');
          return {
            showTutorial: false,
          };
        })
      }
    }
  );
}
