import React, { useState, MouseEvent } from 'react'
import { Peg } from './Peg'
import useMethods from 'use-methods';

export interface PuzzleProps {
  puzzleState: number[][];
}

/**
 * what does the puzzle need to know... state is maintained externally
 *
 * we need to feed in the puzzle state
 * as we are treating react here and just the view layer
 *
 * xstate?
 *
 * - consider a puzzle as simple view
 * - to be rendered either as game or as testbed
 * - but good to be able to user contol and algo control in same wrapper...
 * - think...
 *
 * what controls are needed?
 * - reset to initialState
 * - 
 *
 * @param {*} props
 */
export const Puzzle = ({ puzzleState }: PuzzleProps) => {

  const pegLengths: number[] = puzzleState.map((peg: number[]) => { return peg.length; })
  const numDisks: number = pegLengths.reduce((a, b) => { return a + b });
  const numPegs = puzzleState.length;

  const diskHeight = 32;
  const diskSize = 16;



  const [
    { state }, // <- latest state
    { reset, selectDisk }, // <- callbacks for modifying state
  ] = useMethods(methods, puzzleState);




  return (
    <>
      {/*<button onClick={(event) => reset(event)}>reset</button>
      <button />*/}
      <div className="toh_puzzle">
        {
          puzzleState.map((pegDiscs) => {
            return (
              <Peg pegDiscs={pegDiscs} numPegs={numPegs} diskSize={diskSize} />
            )
          })
        }
      </div>
      <div className="info"><span></span></div>
      <div className="controls"><span>Reset </span></div>
      <style jsx>{`
        .toh_puzzle {
          height: ${(numDisks+1) * diskHeight}px;
          margin: 40px;
          border-bottom: 16px solid #cba;
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </>
  );
}

const methods = state => ({
  reset(event: MouseEvent) {
    return initialState;
  },
  selectDisk() {


    state.count++;
  },
  goBack() {
    // this needs to be a pointer to an array that saves moves

  },
  goForward() {

  }
});