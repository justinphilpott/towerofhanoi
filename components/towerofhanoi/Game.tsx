import React from 'react'
import { Peg } from './Peg'


export interface GameProps {
  state: GameConfig;
  selectHandler: (pegIndex: number) => void;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export const Game = ({ state, selectHandler }: GameProps) => {

  const game = state.gameBoard;
  const pegLengths: number[] = game.map((peg: number[]) => { return peg.length; })
  const numDisks: number = pegLengths.reduce((a, b) => { return a + b });
  const numPegs: number = game.length;

  const selected = state.selectedPeg;

  return (
    <>
      <div className="game">
        {
          game.map((pegDiscs: Array<number>, index: number) =>
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


