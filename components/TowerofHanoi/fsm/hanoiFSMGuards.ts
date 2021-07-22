import { HanoiContext, HanoiEvent } from './types/hanoiFSMTypes';
import { assertEvent } from 'xstate-helpers';

/**
 * isSelected - check if this peg is already selected, in which case we will deselect
 *
 * @param context
 * @param event
 * @returns
 */
export const isSelected = (context: HanoiContext, event: HanoiEvent): boolean => {
  assertEvent(event, 'SELECT');
  return context.selectedPeg === event.pegIndex;
}

/**
 * inValidMoveSelection
 *
 * @param context
 * @param event
 * @returns true if we are trying to make an invalid move
 */
 export const inValidMoveSelection = (context: HanoiContext, event: HanoiEvent): boolean => {
  assertEvent(event, 'SELECT'); // appease typescript
  let inValid = false;

  const topDisks = Array();

  // loop through all towers and get the top disks, including any zero height towers
  context.gameBoard.forEach((peg, index) => {
    // treat the zero height towers as the biggest to make the following check simple
    let topDisk = peg.length === 0 ? context.numDisks + 1 : peg[0];
    topDisks.push(topDisk);
  });

  const chosenDisk = topDisks[context.selectedPeg as number];
  const destTopDisk = topDisks[event.pegIndex];

  // check if we are moving this disk onto a larger one - zero height is treated as a "larger disk" for ease
  inValid = chosenDisk > destTopDisk;

  return inValid;
}

/**
 * Initial selection error: empty peg, we cannot move a disk from a peg that has none.
 *
 * @param context
 * @param event
 * @returns
 */
export const emptyPegSelected = (context: HanoiContext, event: HanoiEvent): boolean => {
  assertEvent(event, 'SELECT'); // appease typescript

  // check tower height
  const selectedTowerHeight = context.gameBoard[event.pegIndex].length;

  // we must select a disk, not an empty peg
  if(selectedTowerHeight === 0) {
    return true;
  }
  return false;
}

/**
 * Initial selection error: immovable disk, we must select a disk that has a space available to move to
 *
 * Consider the game instance:
 *
 * [[1], [2], [3]]
 *
 * Selecting the third peg here will trigger this error as there is nowhere legal to move
 * the disk "3" (largest disk)
 *
 * @param context
 * @param event
 * @returns
 */
export const immoveableDiskSelected = (context: HanoiContext, event: HanoiEvent): boolean => {
  assertEvent(event, 'SELECT'); // appease typescript

  const topDisks = Array();

  // loop through all towers and get the top disks, including any zero height towers
  context.gameBoard.forEach((peg, index) => {
    // treat the zero height towers as the biggest to make the following check simple
    let topDisk = peg.length === 0 ? context.numDisks + 1 : peg[0];
    topDisks.push(topDisk);
  });

  // disk to move
  const chosenDisk = topDisks[event.pegIndex];

  // ensure that there is a larger disk to move this one onto, zero height is treated as a "larger disk"
  const valid = chosenDisk !== Math.max(...topDisks);
  return !valid;
}

/**
 * If all the disks are on the last peg, we're done.
 *
 * this would be an array equality check for a more complex game that allows
 * custom start and end points
 *
 * @param context
 * @param event
 * @returns
 */
export const gameCompleteCheck = (context: HanoiContext, event: HanoiEvent): boolean => {
  if(context.gameBoard[context.numPegs-1].length === context.numDisks) {
    return true;
  } else {
    return false;
  }
}


/**
 * to be move elsewhere
 */

type PuzzleState = number[][];

type Move = [number, number];

/**
 * TowersOfHanoiEngine
 */
class TowersOfHanoiEngine {

  private towers: PuzzleState;

  constructor(towers: PuzzleState) {
    this.towers = towers;
  }

  /**
   * default is that all disks on the last peg is "complete"
   *
   * but we may wish to define an intermediary state which we wish to arrive at
   * @param completeState
   */
  public isComplete(completeState: PuzzleState) {

  }

  public isValidDiskSelection() {

  }

  public isValidMoveSelection() {

  }

  public isValidMove(move: Move) {

  }

  public move(move: Move) {

    // return the game state after
    return this.towers
  }
}
