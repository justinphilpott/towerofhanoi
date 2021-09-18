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
export const getFSMStruct = (initialState: string) => {

   const screenFSMModel = createModel({
    numPegs: 3,
    numDisks: initialState === 'tutorial' ? 3 : 5,
    gameBoard: Array(),
    showMoves: true,
    showTime: false
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
        entry: ['initializeTutorialState'], // configure the FSM context depending on tutorial mode setting
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

          // onDone will be set when the hanoiFSM reaches its final state
          onDone: {
            target: 'start',
          }
        },
        meta: {
          test: async (page: any) => {
            await page.waitForXPath("//li[contains(@class, 'size1')]"); // look for the first disk, which must exist in all games
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
              RESTART: {
                target: 'restartDialog'
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
                await page.waitForXPath("//h2[text() = 'Restart game?']");
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
          selectedPeg: null,
          gameBoard: initialGameBoardState(3, 3),
          moves: Array(),
          showMoves: false,
          showTime: false,
        }
      }),

      /**
       * the the pegs and disks and the resulting game board following settings change
       */
      saveSettings: assign((context: ScreenContext, event: any) => {
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
        return {
          numPegs: 3,
          numDisks: 3,
          showMoves: false,
          showTime: false
        };
      }),

      /**
       * Use to
       */
      setInitialContext: assign((context: ScreenContext, event) => { // eslint-disable-line
        return {
          numPegs: 3,
          numDisks: 5,
          showMoves: true,
          gameBoard: initialGameBoardState(3, 5)
        };
      })
    }
  });
}

/**
 * getScreenMachine
 */
export const getScreenMachine = (initialState: string) => {
  return createMachine<ScreenContext>(
    getFSMStruct(initialState),
    getFSMActions())
}
