
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
  selectedPeg: number | null;
  moves: number[][],
  message: string,
}

export type HanoiEvent =
  | { type: 'SELECT', pegIndex: number }
  | { type: 'RESET' }
