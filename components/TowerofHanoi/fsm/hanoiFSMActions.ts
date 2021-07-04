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
export const initialGameBoardState = (pegs:number, disks:number): number[][] => {
  const towers:number[][] = Array(pegs);
  const firstTower = Array(disks+1).keys();
  towers[0] = [...firstTower]; // place the disks on the first peg
  towers[0].shift(); // make 1 based
  towers.fill([], 1);

  //console.log('unshift', towers[0].shift());
  //towers[2].push(towers[0].pop());
  return towers;
}
