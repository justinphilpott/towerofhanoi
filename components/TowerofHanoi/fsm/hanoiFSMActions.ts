import { HanoiContext } from './types/hanoiFSMTypes';

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
export const initialGameBoardState = (numPegs:number, numDisks:number): number[][] => {
  const pegs:number[][] = Array(numPegs);
  const firstPeg = Array(numDisks+1).keys();
  pegs[0] = [...firstPeg]; // place the disks on the first peg
  pegs[0].shift(); // make 1 based
  // peg.fill([], 1); // so how this is leaving the sub arrays linked to one another

  for(let p = 1; p < numPegs; p++) {
    pegs[p] = Array();
  }

  //console.log('unshift', towers[0].shift());
  //towers[2].push(towers[0].pop());
  return pegs;
}