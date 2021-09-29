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
 * 
 * I notice here that there is a bit of hassle with differentiating event context
 * because the same events are fired from different contexts, and so there is a tradeoff
 * between specificity of event naming (and thus statemachine complexity/verbosity)
 * and event definitions for model based testing.
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
 * the state machine ScreenFSM (which invokes HanoiFSM) can be started
 * in each of its 5 top level states, so we need to test the machine as started
 * from all the possible initial states
 * - normally a state machine would have only one initial state.
 * 
 * For brevity here we test only from the initial state === 'play'
 *
 * @see assertions in the state machine definition screenFSM.tsx
 */
describe('Screen FSM - Test application screen transition', () => {

  // get Screen machine with initial state as specified
  const screenMachineDef = getFSMStruct('game', 3);
  // assertions are in the state machine definition
  const screenMachineActions = getFSMActions(); // parameter is not currently necessary
  const screenMachine = createMachine(screenMachineDef, screenMachineActions);
  const screenMachineModel = createModel(screenMachine).withEvents(
    getScreenEvents()
  );

  const testPlansall = screenMachineModel.getShortestPathPlans();
  //const testPlans = testPlansall.slice(0, 16);
  testPlansall.forEach((plan, i) => {

    describe(plan.description, () => {

      plan.paths.forEach((path, i) => {

        it(
          path.description,
          async () => {
            await page.goto(`http://localhost:${process.env.PORT || '3000'}`);
            // we need to drive the app past the initial flat HTML
            const doc = await getDocument(page);
            const button = await getByText(doc, "Play");
            button.click();

            await path.test(page);
          },
          100000
        );
      });
    });
  });
});
