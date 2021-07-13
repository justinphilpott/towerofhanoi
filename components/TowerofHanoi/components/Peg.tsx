import React, { MouseEvent } from "react";
import { Disk } from "./Disk"

export interface PegProps {
  pegDiscs: number[];
  numPegs: number;
  numDisks: number;
  selected: boolean;
  pegNum: number;
  selectHandler: (pegIndex: number) => void;
}

/**
 * Peg, renders a tower of 0 or more Disk components
 *
 * @param {*} props
 *
 */
export const Peg = ({ pegDiscs, numPegs,  numDisks, selected, pegNum, selectHandler }: PegProps) => {

  const pegClickHandler = (index: number, event: any) => {
    event.stopPropagation();
    return selectHandler(index);
  }

  return (<>
    <ul
      onClick={(event) => pegClickHandler(pegNum, event)}
      className="peg">
      {pegDiscs.map((diskNum: number) => <Disk diskNumber={diskNum} key={diskNum} selected={selected} numPegs={numPegs} />)}
    </ul>
    <style jsx>{`
      ul.peg {
        height: ${(numDisks*28)+28}px;
      }
    `}</style>
    <style jsx>{`
      ul.peg {
        z-index: 2;
        list-style: none;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        flex-grow: 1;
        flex-basis: 0;
        border-bottom: 20px solid #000;
        border-image:
          linear-gradient(to top, #455463 0%, rgb(184, 183, 183) 100%) 100% 0;
      }
      ul.peg:after {
        content: "";
        position: absolute;
        z-index: 0;
        top: 0;
        bottom: 0;
        left: 50%;
        border-left: 6px solid #cba;
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
