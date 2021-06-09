import React, { useState, MouseEvent } from 'react'
import { Machine, assign } from 'xstate'

import { Peg } from './Peg'

interface GameConfig {
  numDisks: number,
  numPegs: number,
  gameBoard: number[],
  activePeg: number|boolean
}


/**
 * 
 * @param param0
 * @returns 
 */
export const Game = ({ state }: { state:GameConfig }, { selectHandler }:{ selectHandler: () => void }) => {

  const game = state.gameState;
  const pegLengths: number[] = game.map((peg: number[]) => { return peg.length; })
  const numDisks: number = pegLengths.reduce((a, b) => { return a + b });
  const numPegs: number = game.length;

  const selected = state.activePeg;

  const diskHeight = 32;
  const diskSize = 16;

  console.log(selectHandler, typeof selectHandler);

  return (
    <>
      <div className="game">
        {
          game.map((pegDiscs: Array<number>, index: number) =>
            <Peg pegDiscs={pegDiscs} numPegs={numPegs} diskSize={diskSize} key={index} selected={selected === index} pegNum={index} selectHandler={selectHandler} />
          )
        }
      </div>
      <style jsx>{`
        .game {
          display: flex;
          flex-direction: row;
          justify-content: center;
          width: 100%;
        }
      `}</style>
    </>
  );
}


