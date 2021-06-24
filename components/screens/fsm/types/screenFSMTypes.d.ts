
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
}

export type ScreenEvent =
  | { type: 'PLAY', numPegs: number, numDisks: number }
  | { type: 'SETTINGS', numPegs: number, numDisks: number }
  | { type: 'TUTORIAL' }
  | { type: 'SAVE', numPegs: number, numDisks: number }
  | { type: 'NEXT' }
  | { type: 'CLOSE' }
  | { type: 'QUITCHECK' }
  | { type: 'STAY' }
  | { type: 'QUIT' };
