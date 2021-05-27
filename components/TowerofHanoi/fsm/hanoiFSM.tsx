import { Machine, assign } from 'xstate'

/**
 * 
 * @param pegs 
 * @param disks 
 * @returns 
 */
 const initialGameState = (pegs:number, disks:number) => {
  const towers:number[][] = Array(pegs);
  towers[0] = [...Array(disks+1).keys()] // place the disks on the first peg
  towers[0].shift(); // make 1 based
  towers.fill([], 1);
  return towers;
}


/**
 * hanoiFSM
 */
 export const hanoiFSM = Machine(
  {
    id: 'hanoiFSM',
    initial: 'initial',
    context: {
      numDisks: 0,
      numPegs: 0,
      gameState: [],
      activePeg: 0
    },
    states: {
      initial: {
        entry: ['initialiseGameState'],
        on: {
          SELECTSRC: 'srcSelected',
          NEWGAME: 'newGame'
        }
      },
      srcSelected: {
        on: {
          REJECTSELECTION: 'invalidSelection',
          SELECTDEST: 'moveSelected',
          RESET: 'initial',
          NEWGAME: 'newGame'
        }
      },
      moveSelected: {
        on: {
          MOVE: 'moveInProgress',
          REJECTMOVE: 'invalidMove',
          RESET: 'initial',
          NEWGAME: 'newGame'
        }
      },
      invalidMove: {
        on: {
          SELECTDEST: 'moveSelected',
          RESET: 'initial',
          NEWGAME: 'newGame'
        }
      },
      invalidSelection: {
        on: {
          SELECTSRC: 'srcSelected',
          RESET: 'initial',
          NEWGAME: 'newGame'
        }
      },
      moveInProgress: {
        on: {
          MOVECOMPLETE: 'moveComplete',
        }
      },
      moveComplete: {
        on: {
          GAMECOMPLETE: 'gameComplete',
          SELECTSRC: 'srcSelected',
          RESET: 'initial',
          NEWGAME: 'newGame'
        }
      },
      gameComplete: {
        on: {
          RESET: 'initial',
          NEWGAME: 'newGame'
        }
      },
      newGame: {
        type: 'final'
      }
    }
  },
  {
    actions: {
      initialiseGameState: assign({
        gameState: (context, event) => initialGameState(context.numPegs, context.numDisks)
      })
    }
  }
);

// ...
const isMidGame = (context, event) => {
  // check hanoi fsm
  console.log('check state on hanoi fsm to determine if we have started and not finished the game...');
  return true;
};





/**
 * Build the initial towers structure with
 * "disks" disks on the first of "pegs" pegs.
 *
 * e.g. pegs=3, disks=5 gives
 * [[1, 2, 3, 4, 5], [], []]
 *
 */

// const isValidMove = (startPeg:number, destPeg:number) => {}
// const performMove = (startPeg:number, destPeg:number) => {}
// const isComplete = () => {}


const isValidMoveSrc = (context, event) => {



}

const isValidMoveDest = (context, event) => {

}