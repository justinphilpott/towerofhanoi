
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

export type Move = {
  src: number,
  dest: number
}

// Tower of Hanoi FSM standard context
export interface HanoiContext {
  numDisks: number;
  numPegs: number;
  gameBoard: number[][];
  selectedPeg: number | null;
  moves: Move[],
  showMoves: boolean,
  showTime: boolean
  showTutorial: boolean
}

export type HanoiEvent =
  | { type: 'SELECT', pegIndex: number }
  | { type: 'RESET' }
  | { type: 'RESETPLUSONEDISK' }
  | { type: 'RESETLESSONEPEG' }
  | { type: 'UNDO' }
