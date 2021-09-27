import { createMachine } from 'xstate'
import { createModel } from '@xstate/test'
import { getFSMStruct, getFSMActions } from '../state/screen/screenFSM'
import { getDocument, queries, waitFor } from 'pptr-testing-library'
import { initialGameBoardState } from '../state/hanoi/hanoiFSMActions';

const { getByTestId, getByLabelText, getByText } = queries;

const testNumDisks = 5;

/**
 * 
 * @param {*} page 
 */
const startGame = async (page) => {
  await page.click('[data-testid="peg1"]');
  await page.click('[data-testid="peg3"]');
}

/**
 * 
 * @returns 
 */
const solveGame = async (page, n, fromPeg, toPeg, auxPeg) => {
	if (n===1) {
    await page.click('[data-testid="peg'+fromPeg+'"]');
    await page.click('[data-testid="peg'+toPeg+'"]');
    return
	}
	solveGame(page, n-1, fromPeg, auxPeg, toPeg);
  await page.click('[data-testid="peg'+fromPeg+'"]');
  await page.click('[data-testid="peg'+toPeg+'"]');
	solveGame(page, n-1, auxPeg, toPeg, fromPeg);
}

/**
 * solveThreePegGame
 * 
 * @todo create generalised x numbers of pegs algo
 * @todo move into main game code to use for auto play function
 * 
 * @param {*} n 
 * @param {*} source 
 * @param {*} target 
 * @param {*} auxiliary 
 */
const createThreePegSolution = (numDisks, source, auxiliary, target) => {

  let moves = [];

  const tohSolve = (numDisks, source, auxiliary, target) => {
    if (numDisks === 1) {
      moves.push({ src: source, dest: target });
    } else {
      // Move n - 1 disks from source to auxiliary, so they are out of the way
      tohSolve(numDisks - 1, source, target, auxiliary)
      moves.push({ src: source, dest: target });
      // Move the n - 1 disks that we left on auxiliary onto target
      tohSolve(numDisks - 1, auxiliary, source, target)
    }
  }
  tohSolve(numDisks, source, auxiliary, target);
  return moves;
}


/**
 * performMoveSequence
 *
 * for testing purposes, play out a sequence of moves
 * 
 * @param {*} page
 * @param {*} moves
 */
const performMoveSequence = async (page, moves) => {
  const numMoves = moves.length;
  for(let i = 0; i < numMoves; i++) {
    await page.click('[data-testid="peg'+moves[i].src+'"]');
    await page.click('[data-testid="peg'+moves[i].dest+'"]');
  }
}


/**
 * define events
 */
const getScreenEvents = () => {

  return {
    'PLAY': async page => {
      const test_start = await page.$x("//h1[text() = 'The Tower of Hanoi']");
      if (test_start.length > 0) {
        // here we are on the start screen so just click it
        await page.click('[data-testid="start-play"]');
      } else {
        // which we can fire the PLAY event (which takes us to the main game)
        await performMoveSequence(page, createThreePegSolution(testNumDisks, 1, 2, 3))
        await page.click('[data-testid="start-play"]');
      }
    },
    'SETTINGS': {
      exec: async (page) => {
        const test_start = await page.$x("//h1[text() = 'The Tower of Hanoi']");
        if (test_start.length > 0) {
          // here we are on the start screen so just click it
          await page.click('[data-testid="start-settings"]');
        } else {
          // which we can fire the PLAY event (which takes us to the main game)
          await performMoveSequence(page, createThreePegSolution(testNumDisks, 1, 2, 3))
          await page.click('[data-testid="start-settings"]');
        }
      },
      cases: [
        {
          numPegs: testNumDisks,
          numDisks: 3
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
          numPegs: testNumDisks,
          numDisks: 3,
          showMoves: true,
          showTime: false,
          gameBoard: initialGameBoardState(3, testNumDisks),
          prevNumDisks: testNumDisks,
          prevNumPegs: 3
        }
      ]
    },
    'QUITCHECK': async page => {
      await page.click('[data-testid="game-quit"]');
    },
    'STAY': async page => {
      await startGame(page);
      await page.click('[data-testid="game-quit-cancel"]');
    },
    'QUIT': async page => {
      const test_tutorial = await page.$x("//h2[text() = 'How to play']");
      if (test_tutorial.length > 0) {
        await performMoveSequence(page, createThreePegSolution(3, 1, 2, 3))
      }
      await page.click('[data-testid="game-quit-confirm"]'); // @todo make the naming match with restart/restart confirm
    },
    'RESTART': async page => {
      await startGame(page);
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
    const screenMachineDef = getFSMStruct('settings', 3);
    // assertions are in the state machine definition
    const screenMachineActions = getFSMActions(); // parameter is not currently necessary
    const screenMachine = createMachine(screenMachineDef, screenMachineActions);
    const screenMachineModel = createModel(screenMachine).withEvents(
      getScreenEvents()
    );

    const testPlansall = screenMachineModel.getShortestPathPlans();
    // const testPlans = testPlansall.slice(20, 22);
    testPlansall.forEach((plan, i) => {

      describe(plan.description, () => {

        plan.paths.forEach((path, i) => {

          it(
            path.description,
            async () => {
              await page.goto(`http://localhost:${process.env.PORT || '3000'}`);
              const doc = await getDocument(page);
              const button = await getByText(doc, "Settings");
              button.click();

              await path.test(page);
            },
            40000
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

