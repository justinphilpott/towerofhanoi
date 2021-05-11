import { Machine } from 'xstate'

export const hanoiFSMDef = {
    id: 'hanoiFSM',
    initial: 'initial',
    context: {
      numDisks: 0,
      numPegs: 0,
      gameBoard: [],
      activePeg: 0
    },
    states: {
      initial: {
        // entry actions
        entry: ['buildTowers'],
        on: {
          SELECTSRC: 'srcSelected'
        }
      },
      srcSelected: {
        on: {
          REJECTSELECTION: 'invalidSelection',
          SELECTDEST: 'moveSelected',
          RESET: 'initial'
        }
      },
      moveSelected: {
        on: {
          MOVE: 'moveInProgress',
          REJECTMOVE: 'invalidMove',
          RESET: 'initial'
        }
      },
      invalidMove: {
        on: {
          SELECTDEST: 'moveSelected',
          RESET: 'initial'
        }
      },
      invalidSelection: {
        on: {
          SELECTSRC: 'srcSelected',
          RESET: 'initial'
        }
      },
      moveInProgress: {
        on: {
          MOVECOMPLETE: 'moveComplete',
          RESET: 'initial'
        }
      },
      moveComplete: {
        on: {
          GAMECOMPLETE: 'gameComplete',
          SELECTSRC: 'srcSelected',
          RESET: 'initial'
        }
      },
      gameComplete: {
        on: {
          RESET: 'initial'
        }
      },
    },
  },
  {
    actions: {

    },
    guards: {

    }
  }
};




const isValidMoveSrc = (context, event) => {



}

const isValidMoveDest = (context, event) => {

}

/**
 * Build the initial towers structure with
 * "disks" disks on the first of "pegs" pegs.
 *
 * e.g. pegs=3, disks=5 gives
 * [[1, 2, 3, 4, 5], [], []]
 *
 * @param pegs
 * @param disks
 */
const initialGameState = (pegs:number, disks:number) => {
  const towers:number[][] = Array(pegs);
  towers[0] = [...Array(disks+1).keys()] // place the disks on the first peg
  towers[0].shift(); // make 1 based
}

// const isValidMove = (startPeg:number, destPeg:number) => {}
// const performMove = (startPeg:number, destPeg:number) => {}
// const isComplete = () => {}

// 