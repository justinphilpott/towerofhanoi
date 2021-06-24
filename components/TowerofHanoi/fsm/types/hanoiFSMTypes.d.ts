
/**
 * 
 */

 export interface HanoiStateSchema {
  states: {
    playing: {},
    awaitingSelection: {},
    start: {},
    midGame: {},
    diskSelected: {},
    invalidDiskSelection: {},
    moveSelected: {},
    invalidMoveSelected: {},
    movingDisk: {},
    gameComplete: {},
    newGame: {}
  }
}

// Tower of Hanoi FSM standard context
export interface HanoiContext {
  numDisks: number;
  numPegs: number;
  gameBoard: number[][];
  activePeg: number;
  moves: number[][],
  errorMessage: string,
}

export type HanoiEvent =
  | { type: 'SELECT', pegIndex: number }
  | { type: 'RESET' }
