import { HanoiContext } from '../types/hanoiFSMTypes';

/**
 * @param pegs
 * @param disks
 * @returns Array of arrays to represent the default game state, e.g.
 *
 * Given (3, 5)
 *
 * Will return:
 *
 * [[1, 2, 3, 4, 5], [0], [0]]
 */
export const initialGameState = (pegs:number, disks:number): number[][] => {
  console.log(pegs, disks);

  const towers:number[][] = Array(pegs);
  const firstTower = Array(disks+1).keys();
  towers[0] = [...firstTower]; // place the disks on the first peg
  towers[0].shift(); // make 1 based
  towers.fill([], 1);
  return towers;
}

/**
 * if(activePeg === 0) { // src has not been selected
 *
 *   if (legal src selection) {
 *     target: set activePeg == chosen peg
 *   } else {
 *     target: set error message, invalid source peg/disk
 *   }
 *
 * } else { // src peg HAS been selected
 *
 *   if (legal dest selection) {
 *     update gameBoard from previous gameBoard
 *     set activePeg === 0
 *   } else {
 *     target: set error message, invalid dest peg
 *   }
 *
 * }
 */
export const processSelect = (context, event) => {



}



/**
 * Build the initial towers structure with
 * "disks" disks on the first of "pegs" pegs.
 *
 * e.g. pegs=3, disks=5 gives
 * [[1, 2, 3, 4, 5], [], []]
 *
 */

// const isValidMove = (startPeg:number, destPeg:number) => {}
// const performMove = (startPeg:number, destPeg:number) => {}
// const isComplete = () => {}

const isValidMoveSrc = (context: HanoiContext, event: Event) => {

}

const isValidMoveDest = (context: HanoiContext, event: Event) => {

}
