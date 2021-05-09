import { Machine } from 'xstate'

const gameStarted = (context, event) => {
  return context.gameStarted;
}


/**
 * controls the screen logic, transitions between screens
 * and receives high level info on the game state from the hanoi
 * fsm.
 * 
 * States are keys of states, CAPS keys are events.
 */
export const screenMachine = Machine(
  {
    id: 'screenMachine',
    initial: 'screenStart',
    states: {
      screenStart: {
        on: {
          PLAY: {
            target: 'screenGame',
            actions: 'setGameParams'
            // think here... do we message the hanoi fsm here with game config data?
          }
        }
      },
      screenGame: {
        initial: 'default',
        // default state, we await the new game event... nothing else is relevant
        // though there is the question of:
        // should I get the hanoi machine to tell the screen machine when play has started
        // which means that it would also need to say when it had completed
        // which mean that I would be duplicating state in this fsm from another fsm
        // where actually I should just check the state of the hanoi fsm from this one
        // when needed...... better...
        states: {
          default: {
            on: {
              NEWGAME: {
                target: 'confirmdialog',
                cond: isMidGame
                // we need a conditional target here... we only show the confirm dialog if
                // we are currently playing... we need to check the hanoi fsm state to
                // determine this...
              }
              // we don't care about the reset game option as this is with the domain
              // of the hanoi fsm and we don't care about that here
            }
          },
          confirmdialog: {
            on: {
              CONFIRM: {
                target: 'playing',
              },
              CANCEL: {
                // 
                target: 'default'
              }
            }
          }
        }
      }
    }
  },
  {
    actions: {
      setGameParams: (context, event) => {
        console.log('set params...');
      }
    },
    guards: {
      isMidGame: (context) => { context.gameStarted === false }
      // this will need to go direct to the hanoi fsm to determine as that is the source of truth for game status
      // true === is not initial and is not complete
    }
  }
);
