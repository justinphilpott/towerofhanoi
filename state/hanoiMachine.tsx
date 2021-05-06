import { Machine } from 'xstate'

export const hanoiMachine = Machine({
    id: 'hanoiUIMachine',
    initial: 'initial',
    context: {
      puzzleState: {
        towers: [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
        activePeg: 0
      }
    },
    states: {
      initial: {
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
          PUZZLECOMPLETE: 'puzzleComplete',
          SELECTSRC: 'srcSelected',
          RESET: 'initial'
        }
      },
      puzzleComplete: {
        on: {
          RESET: 'initial'
        }
      },
    }
/*    {
      guards: {
        isValidMoveSrc,
        isValidMoveDest
      }
    }*/
  });


const isValidMoveSrc = (context, event) => {



}

const isValidMoveDest = (context, event) => {

}



