import React, { useState, MouseEvent } from 'react'
import { Tower } from './Tower'

export const Game = ({ gameState }: { gameState:any }) => {

  console.log(gameState);

  const towerLengths: number[] = gameState.towers.map((tower: number[]) => { return tower.length; })
  const numDisks: number = towerLengths.reduce((a, b) => { return a + b });
  const numTowers: number = gameState.towers.length;

  const diskHeight = 32;
  const diskSize = 16;

  const selected = gameState.activeTower;

  return (
    <>
      <div className="game">
        {
          gameState.towers.map((towerDiscs: Array<number>, index: number) =>
            <Tower towerDiscs={towerDiscs} numTowers={numTowers} diskSize={diskSize} key={index} selected={selected === index} towerNum={index} />
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
