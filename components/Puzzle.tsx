import React, { useState, MouseEvent } from 'react'
import { Peg } from './Peg'

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
export const Puzzle: React.FC<PuzzleProps> = ({ puzzleState }) => {


  const pegLengths: number[] = puzzleState.map((peg: number[]) => { return peg.length; })
  const numDisks: number = pegLengths.reduce((a, b) => { return a + b });
  {/*const numPegs = puzzleState.length;*/}

  const diskHeight = 32;

  const diskSize = 16;
  const pegWidth = 100;

  const [selectedDisk, setSelectedDisk] = useState(1);


  /*
  const moveDisk = (from, to) => {
      // trigger two step move

  }
  */

  const reset = (event: MouseEvent) => {
    // trigger reset action dispatch
    //        , justifyContent: 'space-around', flexFlow: 'row wrap', alignItems: 'stretch'
    return false;
  }

  return (
    <>
      {/*<button onClick={(event) => reset(event)}>reset</button>
      <button />*/}
      <div className="toh_puzzle">
        {
          puzzleState.map((pegData) => {
            return (
              <Peg pegData={pegData} pegWidth={pegWidth} diskSize={diskSize} />
            )
          })
        }
      </div>
      <div className="info"><span>{}</span></div>
      <style jsx>{`
        .toh_puzzle {
          height: ${(numDisks+1) * diskHeight}px;
          margin-top: 20px;
          border-bottom: 16px solid #cba;
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </>
  );
}

