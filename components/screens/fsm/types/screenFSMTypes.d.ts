
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
  tutorialPage: number;
}

export type PlayEvent = {
  type: 'PLAY',
  numPegs: number;
  numDisks: number;
}
