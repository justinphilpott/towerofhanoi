import React, { useState, MouseEvent } from 'react'
import { Tower } from './Tower'

export const Puzzle = ({ puzzleState }: { puzzleState:any }) => {

  console.log(puzzleState);

  const towerLengths: number[] = puzzleState.towers.map((tower: number[]) => { return tower.length; })
  const numDisks: number = towerLengths.reduce((a, b) => { return a + b });
  const numTowers: number = puzzleState.towers.length;

  const diskHeight = 32;
  const diskSize = 16;

  const selected = puzzleState.activeTower;

  return (
    <>
      <div className="puzzle">
        {
          puzzleState.towers.map((towerDiscs: Array<number>, index: number) =>
            <Tower towerDiscs={towerDiscs} numTowers={numTowers} diskSize={diskSize} key={index} selected={selected === index} towerNum={index} />
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
          border: 1px solid red
        }
      `}</style>
    </>
  );
}
