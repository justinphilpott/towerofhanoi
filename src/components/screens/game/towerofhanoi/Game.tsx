import React from 'react'
import { Peg } from './Peg'

// @todo refine eslinting
export interface GameProps {
  gameBoard: number[][]; // eslint-disable-line
  selectedPeg: number | null;
  selectHandler: (pegIndex: number) => void; // eslint-disable-line
}

/**
 * This takes in the game state and the selectHandler callback.
 * No logic is contained in here or deeper. Just rendering.
 *
 * @returns
 */
export const Game = ({ gameBoard, selectedPeg, selectHandler }: GameProps) => {

  const pegLengths: number[] = gameBoard.map((peg: number[]) => { return peg.length; })
  const numDisks: number = pegLengths.reduce((a, b) => { return a + b });
  const numPegs: number = gameBoard.length;

  const selected = selectedPeg;

  return (
    <>
      <div className="game">
        {
          gameBoard.map((pegDiscs: Array<number>, index: number) =>
            <Peg pegDiscs={pegDiscs} numPegs={numPegs} numDisks={numDisks} key={index} selected={selected === index} pegNum={index} selectHandler={selectHandler} />
          )
        }
      </div>
      <style jsx>{`
        .game {
          display: flex;
          flex-direction: row;
          max-width: 1200px;
          width: 100%;
        }
      `}</style>
    </>
  );
}


