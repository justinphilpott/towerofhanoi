import { ActorRef } from 'xstate'

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
  | { type: 'PLAY' }
  | { type: 'SETTINGS', numPegs?: number, numDisks?: number }
  | { type: 'TUTORIAL' }
  | { type: 'SAVE', numPegs: number, numDisks: number, showMoves: boolean, showTime: boolean }
  | { type: 'NEXT' }
  | { type: 'CLOSE' }
  | { type: 'QUITCHECK' }
  | { type: 'STAY' }
  | { type: 'QUIT' }
  | { type: 'RESTART' }
  | { type: 'CANCEL' }
  | { type: 'RESTART' };

export type EmittedFrom<T> = T extends ActorRef<any, infer TEmitted>
  ? TEmitted
  : never;