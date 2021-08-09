/**
 * 3*10 array of minimal move counts for for tower of hanoi games
 * first element is the 3 pegs solutions for 1 disk up to 10 disk
 * second if for 4 pegs, and so on...
 * 
 * The 3 pegs solutions are known, the other I am pretty sure about but not certain
 */
export const minMovesLookupTable: number[][] = [
  [1,3,7,15,31,63,127,255,511,1023],
  [1,3,5,9,13,17,25,33,45,57],
  [1,3,5,7,11,15,19,23,27,31]
]