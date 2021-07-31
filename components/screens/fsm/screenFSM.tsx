import { createMachine, assign } from 'xstate'
import { createModel } from 'xstate/lib/model';
import { hanoiFSM } from '../../towerofhanoi/fsm/hanoiFSM'
import { ScreenContext } from './types/screenFSMTypes';
import { HanoiContext } from '../../towerofhanoi/fsm/types/hanoiFSMTypes'
import { initialGameBoardState } from '../../towerofhanoi/fsm/hanoiFSMActions';


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
  showMoves: true,
  showTime: false,
  showTutorial: false // get set either t/f false depending on the start screen selection anyway
})

/**
 * gameInProgress - infered elewhere
 * 
 * @todo no longer needed!
 */
const gameInProgress = () => {

  // Now done in react - @see
  // This is now somehow a metastate...
  //
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
            actions: ['resetInitialContext'] // this only sets tutorial mode off, to preserve settings selection...
          },
          SETTINGS: {
            target: 'settings',
          },
          CREDITS: {
            target: 'credits',
          },
          TUTORIAL: {
            target: 'game',
            actions: ['storeTutorialContext']
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
          PLAY: { // this would be triggered from the tutorial meta-state and so we need to reset for a normal game
            target: 'game',
            actions: ['setInitialContext'] // this sets the 5 tower to start with a tutorial mode off
          },
          QUIT: {
            target: 'start',
            actions: ['setInitialContext'] // also here
          }
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
      },
    }
  },
  {
    actions: {

      /**
       * set up the default game position, all disks on the left hand peg
       */
       initializeGameState: assign((context: ScreenContext, event) => {
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
          showMoves: event.showMoves,
          showTime: event.showTime,
          gameBoard: initialGameBoardState(event.numPegs, event.numDisks)
        };
      }),

      /**
       * This must also turn off timer and moves count
       */
       storeTutorialContext: assign((context: ScreenContext, event) => {
        return {
          numPegs: 3,
          numDisks: 3,
          showMoves: false,
          showTime: false,
          showTutorial: true,
        };
      }),

      /**
       * Use to ...
       */
      setInitialContext: assign((context: ScreenContext, event) => {
        return {
          numPegs: 3,
          numDisks: 5,
          showMoves: true,
          showTutorial: false,
        };
      }),

      /**
       * Use to go back to normal mode after tutorial @todo, extended state is getting messy
       */
      resetInitialContext: assign((context: ScreenContext, event) => {
        return {
          showTutorial: false,
        };
      })
    },
    guards: {
      gameInProgress
    }
  }
);
