/**
 * Tower of Hanoi FSM standard context
 */
export interface Context {
  numDisks: number;
  numPegs: number;
  gameState: number[][];
  activePeg: number;
}