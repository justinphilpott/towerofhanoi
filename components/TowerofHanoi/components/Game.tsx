import React, { useState, MouseEvent } from 'react'
import { Machine, assign } from 'xstate'

import { Peg } from './Peg'

/**
 * 
 * @param param0 
 * @returns 
 */
export const Game = ({ state }: { state:any }) => {

  const game = state.context.gameState;
  const pegLengths: number[] = game.map((peg: number[]) => { return peg.length; })
  const numDisks: number = pegLengths.reduce((a, b) => { return a + b });
  const numPegs: number = game.length;

  const selected = state.context.activePeg;

  const diskHeight = 32;
  const diskSize = 16;

  return (
    <>
      <div className="game">
        {
          game.map((pegDiscs: Array<number>, index: number) =>
            <Peg pegDiscs={pegDiscs} numPegs={numPegs} diskSize={diskSize} key={index} selected={selected === index} pegNum={index} />
          )
        }
      </div>
      <style jsx>{`
        .game {
          display: flex;
          flex-direction: row;
          justify-content: center;
          width: 100%;
          padding-left: 10%;
          padding-right: 10%;
          border: 1px solid red
        }
      `}</style>
    </>
  );
}


