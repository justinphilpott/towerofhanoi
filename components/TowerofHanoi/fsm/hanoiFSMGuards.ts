import { HanoiContext, HanoiEvent } from './types/hanoiFSMTypes';



/**
 * Build the initial towers structure with
 * "disks" disks on the first of "pegs" pegs.
 *
 * e.g. pegs=3, disks=5 gives
 * [[1, 2, 3, 4, 5], [], []]
 *
 */


/**
 * check if the disk chosen is a valid selection for a disk to move
 * 
 * - disk is the top of whichever is the selected peg, as you can only move the top
 * - which ones could not be moved?
 * = empty peg
 * = not the largest disk (unless game is 1 disk game)
 * 
 * @param context 
 * @param event 
 */
export const validDiskSelection = (context: HanoiContext, event: HanoiEvent): boolean => {
  console.log('validDiskSelection');
  console.log(context.gameBoard);
  console.log(event);

  // is the peg empty

  // disk to move is
  const chosenDisk = context.gameBoard[event.pegIndex]

  return true;
}

export const validMoveSelection = (context: HanoiContext, event: HanoiEvent): boolean => {
  console.log('validMoveSelection');
  console.log(context.gameBoard);
  console.log(event);
  return true;
}

export const gameCompleteCheck = (context: HanoiContext, event: HanoiEvent): boolean => {
  console.log('gameCompleteCheck');
  console.log(context.gameBoard);
  console.log(event);
  return true;
}