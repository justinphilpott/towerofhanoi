
/**
 * 
 */
export interface HanoiStateSchema {
  states: {
    initial: {},
    srcSelected: {},
    moveSelected: {},
    invalidMove: {},
    invalidSelection: {},
    moveInProgress: {},
    moveComplete: {},
    gameComplete: {},
    newGame: {}
  }
}


// Tower of Hanoi FSM standard context
export interface HanoiContext {
  numDisks: number;
  numPegs: number;
  gameState: number[][];
  activePeg: number;
}

