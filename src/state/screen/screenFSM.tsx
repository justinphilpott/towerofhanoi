import { createMachine, assign } from 'xstate'
import { createModel } from 'xstate/lib/model';
import { hanoiFSM } from '../hanoi/hanoiFSM'
import { ScreenContext, ScreenEvent } from './types/screenFSMTypes';
import { HanoiContext } from '../hanoi/types/hanoiFSMTypes'
import { initialGameBoardState } from '../hanoi/hanoiFSMActions';


/**
 * getFSMStruct
 * 
 * The Screen machine controls screen logic.
 * 
 * @param initialState this is used to create machines with different initial states
 * @returns the structure of the FSM
 */
export const getFSMStruct = (initialState: string, numDisks: number) => {

   const screenFSMModel = createModel({
    numPegs: 3,
    numDisks: numDisks,
    gameBoard: Array(),
    showMoves: true,
    showTime: false,
    prevNumDisks: numDisks, // 
    prevNumPegs: 3
  })

  let FSMStruct = {
    id: 'screenFSM',
    initial: 'start',
    context: screenFSMModel.initialContext,
    states: {
      start: {
        on: {
          PLAY: {
            target: 'game'
          },
          SETTINGS: {
            target: 'settings',
          },
          CREDITS: {
            target: 'credits',
          },
          TUTORIAL: {
            target: 'tutorial'
          }
        },
        meta: {
          test: async (page: any) => {
            await page.waitForXPath("//h1[text() = 'The Tower of Hanoi']");
            await page.waitForXPath("//button[text() = 'Play']");
            await page.waitForXPath("//button[text() = 'How to play']");
            await page.waitForXPath("//button[text() = 'Settings']");
            await page.waitForXPath("//a[text() = '~ Credits ~']");
          }
        }
      },
      settings: {
        on: {
          SAVE: {
            target: 'start',
            actions: ['saveSettings']
          }
        },
        meta: {
          test: async (page: any) => {
            await page.waitForXPath("//h2[text() = 'Settings']");
          }
        },
      },
      credits: {
        on: {
          EXIT: {
            target: 'start',
          }
        },
        meta: {
          test: async (page: any) => {
            await page.waitForXPath("//h1[text() = 'The Tower of Hanoi']");
          }
        },
      },

      /**
       * Tutorial
       */
      tutorial: {
        entry: ['initializeTutorialState'],
        exit: ['restoreStateAfterTutorial'],
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
            prevNumDisks: (context: HanoiContext) => context.numDisks,
            prevNumPegs: (context: HanoiContext) => context.numPegs,
          },
          // @todo would be better to use onDone when quitting the game, perhaps
        },
        meta: {
          test: async (page: any) => {
            await page.waitForXPath("//h2[text() = 'How to play']");
          }
        },
        on: {
          // go to the setting screen
          SETTINGS: {
            target: 'settings'
          },
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
              PLAY: {
                target: '#screenFSM.game'
              },
              RESTART: {
                target: 'restartDialog'
              }
            },
            meta: {
              test: async (page: any) => {
                await page.waitForXPath("//h2[text() = 'How to play']");
              }
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
            },
            meta: {
              test: async (page: any) => {
                await page.waitForXPath("//h2[text() = 'Quit tutorial?']");
              }
            },
          },
          restartDialog: {
            on: {
              CANCEL: {
                target: 'default'
              },
              RESTARTCONFIRM: {
                target: 'default'
              },
            },
            meta: {
              test: async (page: any) => {
                await page.waitForXPath("//h2[text() = 'Restart tutorial?']");
              }
            },
          },
        },
      },

      /**
       * Game
       */
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
            showTime: (context: HanoiContext) => context.showTime
          },
          // @todo would be better to use onDone when quitting the game, perhaps
        },
        meta: {
          test: async (page: any) => {
            await page.waitForXPath("//li[contains(@class, 'size1')]"); // look for the first disk, which must exist in all games
          }
        },
        /*
        on: {
          // go to the setting screen
          SETTINGS: {
            target: 'settings'
          }
        },
        */
        initial: 'default',
        states: {
          default: {
            on: {
              QUITCHECK: {
                target: 'quitDialog'
              },
              RESTART: {
                target: 'restartDialog'
              },
              QUIT: {
                target: '#screenFSM.start'
              }
            },
            meta: {
              test: async (page: any) => {
                await page.waitForXPath("//li[contains(@class, 'size1')]");
              }
            },
          },
          quitDialog: {
            on: {
              STAY: {
                target: 'default',
              },
              QUIT: {
                target: '#screenFSM.start'
              }
            },
            meta: {
              test: async (page: any) => {
                await page.waitForXPath("//h2[text() = 'Quit game?']");
              }
            },
          },
          restartDialog: {
            on: {
              CANCEL: {
                target: 'default'
              },
              RESTARTCONFIRM: {
                target: 'default'
              }
            },
            meta: {
              test: async (page: any) => {
                await page.waitForXPath("//h2[text() = 'Loose progress?']");
              }
            },
          }
        }
      }
    }
  };
  // create the screen FSM with customised start
  FSMStruct.initial = initialState;

  return FSMStruct;
}

/**
 * 
 * @param initialState 
 * @returns 
 */
export const getFSMActions = () => {
  return ({
    actions: {

      /**
       * Initial game state
       */
      initializeGameState: assign((context: ScreenContext) => {
        return {
          selectedPeg: null,
          gameBoard: initialGameBoardState(context.numPegs, context.numDisks),
          moves: Array()
        }
      }),

      /**
       * Initial tutorial state
       */
      initializeTutorialState: assign((context: ScreenContext) => {
        return {
          numDisks: 3,
          numPegs: 3,
          selectedPeg: null,
          gameBoard: initialGameBoardState(3, 3),
          moves: Array(),
          showMoves: false,
          showTime: false,
        }
      }),

      restoreStateAfterTutorial: assign((context: ScreenContext) => {
        return {
          numDisks: context.prevNumDisks,
          numPegs: context.prevNumPegs,
          selectedPeg: null,
          gameBoard: initialGameBoardState(context.prevNumDisks, context.prevNumPegs),
          moves: Array()
        }
      }),

      /**
       * the the pegs and disks and the resulting game board following settings change
       */
      saveSettings: assign((context: ScreenContext, event: any) => {
        return {
          numPegs: event.numPegs,
          numDisks: event.numDisks,
          prevNumPegs: event.numPegs,
          prevNumDisks: event.numDisks,
          showMoves: event.showMoves,
          showTime: event.showTime,
          gameBoard: initialGameBoardState(event.numPegs, event.numDisks)
        };
      }),
    }
  });
}

/**
 * getScreenMachine
 */
export const getScreenMachine = (initialState: string, numDisks: number) => {
  return createMachine<ScreenContext>(
    getFSMStruct(initialState, numDisks),
    getFSMActions())
}
