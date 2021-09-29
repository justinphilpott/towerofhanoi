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

  for(let p = 1; p < numPegs; p++) {
    pegs[p] = Array();
  }

  return pegs;
}