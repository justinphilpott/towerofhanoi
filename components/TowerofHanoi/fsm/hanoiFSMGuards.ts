import { HanoiContext, HanoiEvent } from './types/hanoiFSMTypes';
import { assertEvent } from 'xstate-helpers';

/**
 * @param context
 * @param event
 * @returns
 */
export const isSelected = (context: HanoiContext, event: HanoiEvent): boolean => {
  assertEvent(event, 'SELECT');
  console.log('check if peg is selected', context.selectedPeg === event.pegIndex);
  return context.selectedPeg === event.pegIndex;
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
    console.log('select tower is zero height, selection is illegal');
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

  console.log('topDisks ', topDisks);

  // disk to move
  const chosenDisk = topDisks[event.pegIndex];

  // ensure that there is a larger disk to move this one onto, zero height is treated as a "larger disk"
  const valid = chosenDisk !== Math.max(...topDisks);

  console.log('disk is moveable', chosenDisk);
  return !valid;
}

/**
 * validMoveSelection
 *
 * we have a valid disk selection, now we check if the selected destination is OK,
 * It must be:
 * - not the selected Peg
 * - destination peg is empty or has larger disk
 * 
 * @param context
 * @param event
 * @returns
 */
export const validMoveSelection = (context: HanoiContext, event: HanoiEvent): boolean => {
  console.log('validMoveSelection');

  // 

  return true;
}

export const gameCompleteCheck = (context: HanoiContext, event: HanoiEvent): boolean => {
  console.log('gameCompleteCheck');
  console.log(context.gameBoard);
  console.log(event);
  return true;
}



type PuzzleState = number[][];

type Move = [number, number];

/**
 * TowersOfHanoiEngine
 *
 * This engine is intended to be 
 *
 * It
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



