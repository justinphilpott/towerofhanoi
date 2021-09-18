import React from "react";
import { Disk } from "./Disk"


export interface PegProps {
  pegDiscs: number[];
  numPegs: number;
  numDisks: number;
  selected: boolean;
  pegNum: number;
  selectHandler: (pegIndex: number) => void; // eslint-disable-line
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
      data-testid={"peg"+(pegNum+1)}
      onClick={(event) => pegClickHandler(pegNum, event)}
      className="peg">
      {pegDiscs.map((diskNum: number) => <Disk diskNumber={diskNum} key={diskNum} selected={selected} numPegs={numPegs} />)}
    </ul>
    <style jsx>{`
      ul.peg {
        height: ${(numDisks*1.5)+1.5}rem;
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
        border-bottom: 12px solid #455463;
        border-image:
          linear-gradient(to top, #000 0%, #455463 50%, #455463 80%, #aaa 90%, #fff 100%) 150 40;
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
            to left,
            rgb(181, 181, 181) 0%,
            rgb(201, 201, 201) 25%,
            rgb(94, 94, 94) 100%,
          ) 1 100%;
      }
      `}</style>
  </>)
}
