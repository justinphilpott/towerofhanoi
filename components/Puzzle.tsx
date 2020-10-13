import React, { MouseEvent } from 'react'
import { Peg } from './Peg'

export interface PuzzleProps {
  initialState: number[][];
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
export const Puzzle: React.FC<PuzzleProps> = ({ initialState }) => {

  const puzzleState = initialState;

  const pegLengths: number[] = initialState.map((peg: number[]) => { return peg.length; })
  const numDisks: number = pegLengths.reduce((a, b) => { return a + b });
  const numPegs = initialState.length;

  const diskHeight = 32;

  const diskSize = 16;
  const pegWidth = 100;

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
      <button onClick={(event) => reset(event)}>reset</button>
      <button />
      <div className="toh_puzzle" style={{ height: numDisks * (diskHeight + 2), width: '600px', marginTop: '20px', borderBottom: '10px solid #cba', display: 'flex', flexDirection: 'row' }}>
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
                  ul {
                      border: 1px solid #aaaaaa;
                      width: ${pegWidth}px;
                      list-style: none;
                      margin: 0;
                      padding: 0;
                      display: flex;
                      flex-grow: 1;
                      flex-direction: column;
                      justify-content: flex-end;
                      align-items: center;
                  }
              `}</style>
    </>
  );
}
