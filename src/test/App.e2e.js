import { createMachine } from 'xstate'
import { createModel } from '@xstate/test'
import { getFSMStruct, getFSMActions } from '../state/screen/screenFSM'
import { getDocument, queries, waitFor } from 'pptr-testing-library'
import { initialGameBoardState } from '../state/hanoi/hanoiFSMActions';

const { getByTestId, getByLabelText, getByText } = queries;


const play3PegGame = async (page) => {
  await page.click('[data-testid="peg1"]');
  await page.click('[data-testid="peg3"]');
  await page.click('[data-testid="peg1"]');
  await page.click('[data-testid="peg2"]');
  await page.click('[data-testid="peg3"]');
  await page.click('[data-testid="peg2"]');
  await page.click('[data-testid="peg1"]');
  await page.click('[data-testid="peg3"]');
  await page.click('[data-testid="peg2"]');
  await page.click('[data-testid="peg1"]');
  await page.click('[data-testid="peg2"]');
  await page.click('[data-testid="peg3"]');
  await page.click('[data-testid="peg1"]');
  await page.click('[data-testid="peg3"]');
}


/**
 * define events
 */
const getScreenEvents = () => {

  return {
    'PLAY': async page => {
      const result = await page.$x("//h2[text() = 'How to play']");
      if (result.length > 0) {
        console.log("test1");        // play the game to reveal the dialog from
        // which we can fire the PLAY event (which takes us to the main game)
        await play3PegGame(page);
        await page.click('[data-testid="start-play"]');

      } else {
        console.log('test2');
                // here we are on the start screen so just click it
        await page.click('[data-testid="start-play"]');

      }
    },
    'SETTINGS': {
      exec: async (page) => {
        const result = await page.$x("//h2[text() = 'How to play']");
        if (result.length > 0) {
          console.log("test1");        // play the game to reveal the dialog from
          // which we can fire the PLAY event (which takes us to the main game)
          await play3PegGame(page);
          await page.click('[data-testid="start-settings"]');

        } else {
          console.log('test2');
                  // here we are on the start screen so just click it
          await page.click('[data-testid="start-settings"]');
        }
      },
      cases: [
        {
          numPegs: 3,
          numDisks: 8
        }
      ]
    },
    'TUTORIAL': async page => {
      await page.click('[data-testid="start-tutorial"]');
    },
    'CREDITS': async page => {
      await page.click('[data-testid="start-credits"]');
    },
    'EXIT': async page => {
      await page.click('[data-testid="credits-exit"]');
    },
    'SAVE': {
      exec: async (page, event) => {
        await page.click('[data-testid="settings-done"]');
      },
      cases: [
        {
          numPegs: 3,
          numDisks: 8,
          showMoves: true,
          showTime: false,
          gameBoard: initialGameBoardState(3, 8)
        }
      ]
    },
    'QUITCHECK': async page => {
      await page.click('[data-testid="game-quit"]');
    },
    'STAY': async page => {
      await page.click('[data-testid="game-quit-cancel"]');
    },
    'QUIT': async page => {
      await page.click('[data-testid="game-quit-confirm"]'); // @todo make the naming match with restart/restart confirm
    },
    'RESTART': async page => {
      await page.click('[data-testid="game-restart"]');
    },
    'CANCEL': async page => {
      await page.click('[data-testid="game-restart-cancel"]');
    },
    'RESTARTCONFIRM': async page => {
      await page.click('[data-testid="game-restart-confirm"]');
    }
  }
}

/**
 * @deprecated
 * 
 * getAssertions]
 * 
 * I feel this really wants to sit within the one machine definition, but
 * this also feels like bloating out the client side state machine.
 * So the next best thing is to match the structure, so that we can
 * programmatically merge.
 * 
 * structure is of the format:
 * 
 * states: {
 *   statename: {
 *     meta [assertions for this state]: {
 *       
 *     },
 *     events [specific events that can be triggered from this state, and how]: {
 *       eventName:
 *     }
 *     states: {
 *       substatename [structure as statename]: {}
 *     }
 *   }
 * }
 * 
 * @see ScreenFSM
 */
const getScreenAssertions = () => {

  return {
    states: {
      start: {
        events: {
          PLAY: async page => {
            await page.click('[data-testid="good-button"]'); //page.$x("//button[contains(., 'Button text')]");
          },
          SETTINGS: async page => {
            await page.click('[data-testid="good-button"]');
          },
          CREDITS: async page => {
            await page.click('[data-testid="good-button"]');
          },
          TUTORIAL: async page => {
            await page.click('[data-testid="good-button"]');
          },
        },
        meta: {
          test: async page => {
            await page.waitForXPath("//h1[text() = 'The Tower of Hanoi']");
            await page.waitForXPath("//button[text() = 'Play']");
            await page.waitForXPath("//button[text() = 'Tutorial']");
            await page.waitForXPath("//button[text() = 'Settings']");
            await page.waitForXPath("//a[text() = 'Credits']");
          }
        }
      },
      settings: {
        meta: {
          test: async page => {
            await page.waitForXPath("//h2[text() = 'Settings']");
          }
        }
      },
      credits: {
        meta: {
          test: async page => {
            await page.waitForXPath("//h1[text() = 'The Tower of Hanoi']");
          }
        }
      },
      tutorial: {
        meta: {
          test: async page => {
            await page.waitForXPath("//h2[text() = 'How to play']");
          }
        },
        states: {
          default: {
            meta: {
              test: async page => {
                await page.waitForXPath("//h2[text() = 'How to play']");
              }
            },
          },
          quitDialog: {
            meta: {
              test: async page => {
                await page.waitForXPath("//h2[text() = 'Quit tutorial?']");
              }
            },
          },
          restartDialog: {
            meta: {
              test: async page => {
                await page.waitForXPath("//h2[text() = 'Restart tutorial?']");
              }
            },
          }
        }
      },
      game: {
        meta: {
          test: async page => {
            await page.waitForXPath("//l1[contains(@class, 'size1')]"); // look for the first disk, which must exist in all games
          }
        },
        states: {
          default: {
            meta: {
              test: async page => {
                await page.waitForXPath("//li[contains(@class, 'size1')]");
              }
            },
          },
          quitDialog: {
            meta: {
              test: async page => {
                await page.waitForXPath("//h2[text() = 'Quit game?']");
              }
            },
          },
          restartDialog: {
            meta: {
              test: async page => {
                await page.waitForXPath("//h2[text() = 'Restart game?']");
              }
            },
          }
        }
      }
    }
  };
}

/**
 * the state machine ScreenFSM (which invokes HanoiFSM) can be started
 * in each of its 5 top level states, so we need to test the machine as started
 * from all the possible initial states
 * - normally a state machine would have only one initial state.
 *
 * @see assertions in the state machine definition
 */
describe('Screen FSM - Traverse initial states', () => {

  /**
   * initial state: start
   */
  describe('Screen FSM - initial-state: settings', () => {

    // get Screen machine with initial state as start
    const screenMachineDef = getFSMStruct('settings');
    // assertions are in the state machine definition
    const screenMachineActions = getFSMActions(); // parameter is not currently necessary
    const screenMachine = createMachine(screenMachineDef, screenMachineActions);
    const screenMachineModel = createModel(screenMachine).withEvents(
      getScreenEvents()
    );

    const testPlansall = screenMachineModel.getShortestPathPlans();

    //const testPlans = testPlansall.slice(1, 4);

    testPlansall.forEach((plan, i) => {

      describe(plan.description, () => {

        plan.paths.forEach((path, i) => {

          console.log(plan.description);
          it(
            path.description,
            async () => {
              await page.goto(`http://localhost:${process.env.PORT || '3000'}`);
              const doc = await getDocument(page);
              const button = await getByText(doc, "Settings");
              button.click();

              await path.test(page);
            },
            20000
          );

        });
      });
    });

    //it('should have full coverage', () => {
    //  return screenMachineModel.testCoverage();
    //});
  });
});


/**
 * mergeAssertions
 */
 const getMergedAssertions = (assertions, machineDef) => {
  const machineWithAssertions = {};
  return machineWithAssertions;
}


/**
 * getScreenEvents


const ScreenEvents = () => {

  return {
    CLICK_GOOD: async page => {
      await page.click('[data-testid="good-button"]');
    },
    CLICK_BAD: async page => {
      await page.click('[data-testid="bad-button"]');
    },
    CLOSE: async page => {
      await page.click('[data-testid="close-button"]');
    },
    ESC: async page => {
      await page.press('Escape');
    },
    SUBMIT: {
      exec: async (page, event) => {
        await page.type('[data-testid="response-input"]', event.value);
        await page.click('[data-testid="submit-button"]');
      },
      cases: [{ value: 'something' }, { value: '' }]
    }
  }
}
 */
