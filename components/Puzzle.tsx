import React from 'react'
import { Peg } from './Peg'

/**
 * what does the puzzle need to know... state is maintained externally
 *
 * we need to feed in the puzzle state
 * as we are treating react here and just the view layer
 *
 * @param {*} props
 */
export const ToHPuzzle = () => {

    // input from puzzleStaten external game state store...
    const puzzleState = {
        pegs: [[3, 4, 5, 6, 7, 8, 9, 10], [1], [2]],
        totalDisks: 10
    };

    const diskHeight = 32;

    const numPegs = puzzleState.pegs.length;
    const diskSize = 16;
    const pegWidth = 100;

    
    /*
    const moveDisk = (from, to) => {
        // trigger two step move

    }
    */

    const reset = () => {
        // trigger reset action dispatch
//        , justifyContent: 'space-around', flexFlow: 'row wrap', alignItems: 'stretch'
    }

    return (
        <>
            <button onClick={reset()}>reset</button>
            <button />
            <div className="toh_puzzle" style={{ height: puzzleState.totalDisks*(diskHeight+2), width: '600px', marginTop: '20px', borderBottom: '10px solid #cba', display: 'flex', flexDirection: 'row' }}>
                {
                    puzzleState.pegs.map((pegData) => {
                        return (
                            <Peg pegData={pegData} pegWidth={pegWidth} diskSize={diskSize} />
                        )
                    })
                }
            </div>
            <div className="info"><span>{}</span></div>
        </>
    );
}