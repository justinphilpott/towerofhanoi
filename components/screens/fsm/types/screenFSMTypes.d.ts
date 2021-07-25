
/**
 *
 */
export interface ScreenStateSchema {
  states: {
    start: {},
    settings: {},
    game: {},
  }
}

// Screen context that stores the settings info to supply to the
// Tower of Hanoi FSM
export interface ScreenContext {
  numDisks: number;
  numPegs: number;
  gameBoard: number[][],
  showMoves: boolean,
  showTime: boolean,
  showTutorial: boolean
}

export type ScreenEvent =
  | { type: 'PLAY', tutorial: boolean }
  | { type: 'SETTINGS', numPegs: number, numDisks: number }
  | { type: 'TUTORIAL' }
  | { type: 'SAVE', numPegs: number, numDisks: number }
  | { type: 'NEXT' }
  | { type: 'CLOSE' }
  | { type: 'QUITCHECK' }
  | { type: 'STAY' }
  | { type: 'QUIT' };
