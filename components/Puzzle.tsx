import React, { useState, MouseEvent } from 'react'
import { Peg } from './Peg'


/*
export interface PuzzleProps {
  puzzleState: {
    towers: number[][],
    activePeg: number
  ];
}

interface PuzzleState {

}

interface Peg {

}

*/

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
export const Puzzle = ({ puzzleState }) => {

  const pegLengths: number[] = puzzleState.towers.map((peg: number[]) => { return peg.length; })
  const numDisks: number = pegLengths.reduce((a, b) => { return a + b });
  const numPegs: number = puzzleState.towers.length;

  const diskHeight = 32;
  const diskSize = 16;

  const selected = puzzleState.activePeg;

  return (
    <>
      <div className="puzzle">
        {
          puzzleState.towers.map((pegDiscs: Array<number>, index: number) => 
            <Peg pegDiscs={pegDiscs} numPegs={numPegs} diskSize={diskSize} key={index} selected={selected === index} pegNum={index} />
          )
        }
      </div>
      <style jsx>{`
        .puzzle {
          display: flex;
          flex-direction: row;
          justify-content: center;
          width: 100%;
          padding-left: 10%;
          padding-right: 10%;
        }
      `}</style>
    </>
  );
}
