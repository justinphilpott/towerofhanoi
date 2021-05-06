import { Machine } from 'xstate'

const gameStarted = (context, event) => {
  return context.gameStarted;
}

export const screenMachine = Machine({
    id: 'screenIMachine',
    initial: 'screenStart',
    context: {
      gameStarted: false,
      numDisks: 5,
      numPegs: 3
    },
    states: {
      screenStart: {
        on: {
          PLAY: {
            target: 'screenGame',
            actions: 'setGameParams'
          }
        }
      },
      screenGame: {
        on: {
          NEWGAME: 'screenStart'
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
      gameStarted: (context) => context.gameStarted
    }
  });
