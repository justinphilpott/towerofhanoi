import { createMachine, assign } from "xstate";

interface TimerContext {
  elapsed: number;
  duration: number;
  interval: number;
}

type TimerEvent =
  | {
      type: "TICK";
    }
  | {
      type: "DURATION.UPDATE";
      value: number;
    }
  | {
      type: "RESET";
    };


export const timerFSM = createMachine<TimerContext, TimerEvent>({
  id: 'timerEvent',
  initial: "initial",

  states: {
    initial: {
      entry: ['resetTimer']
    },
    running: {
      invoke: {
        src: context => cb => {
          const interval = setInterval(() => {
            cb("TICK");
          }, 1000 * context.interval);

          return () => {
            clearInterval(interval);
          };
        }
      },
      always: {
        target: "paused",
        cond: context => {
          return context.elapsed >= context.duration;
        }
      },
      on: {
        TICK: {
          actions: assign({
            elapsed: context => +(context.elapsed + context.interval).toFixed(2)
          })
        }
      }
    },
    paused: {
      always: {
        target: "running",
        cond: context => context.elapsed < context.duration
      }
    }
  },
  on: {
    "DURATION.UPDATE": {
      actions: assign({
        duration: (_, event) => event.value
      })
    },
    // reset by going to the start state
    RESET: {
      target: 'initial'
    }
  }
},{
    actions: {

      /**
       * reset the timer to the start position
       */
      resetTimer: assign((context: TimerContext, event) => {
        return {
          elapsed: 0,
        }
      }),
    }
  }
);
