import React, { MouseEvent } from "react";
import { Disk } from "./Disk"
import { useMachine } from '@xstate/react'
import { hanoiFSM } from '../state/hanoiFSM'

export interface TowerProps {
  towerDiscs: number[];
  diskSize: number;
  numTowers: number;
  selected: boolean;
  towerNum: number;
}

/**
 * @param {*} props
 * 
 * @todo find how to pass methods... usereducer, useMethods? try that...
 */
export const Tower = ({ towerDiscs, numTowers, diskSize, selected, towerNum }: TowerProps) => {

  const [state, send] = useMachine(hanoiFSM);

  const towerClickHandler = (index: number) => {
    console.log('call fsm passing the index of the clicked tower', index);
  }

  return (<>
    <ul
      onClick={() => towerClickHandler(towerNum)}
      className="tower">
      {towerDiscs.map((diskNum: number) => <Disk diskNumber={diskNum} diskSize={diskSize} key={diskNum} selected={selected} />)}
    </ul>
    <style jsx>{`
      ul.tower {
        z-index: 2;
        list-style: none;
        margin: 0;
        padding: 32px 0 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        flex: 0 0 ${
          numTowers === 3 ? '300px' :
          numTowers === 4 ? '230px' :
          numTowers === 5 ? '180px' : '180px'
          };
        border-bottom: 20px solid #000;
        border-image:
          linear-gradient(to bottom, #738ca4 0%, #eee 100%) 100% 0;
      }
      ul.tower:after {
        content: "";
        position: absolute;
        z-index: 0;
        top: 0;
        bottom: 0;
        left: 50%;
        border-left: 10px solid #cba;
        border-radius: 50%;
        transform: translate(-50%);
        border-image:
          linear-gradient(
            to right,
            rgb(181, 181, 181) 0%,
            rgb(201, 201, 201) 25%,
            rgb(94, 94, 94) 100%,
          ) 1 100%;
      }
      `}</style>
  </>)
}
