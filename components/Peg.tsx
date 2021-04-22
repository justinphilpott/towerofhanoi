import React, { MouseEvent } from "react";
import { Disk } from "./Disk"

export interface PegProps {
  pegDiscs: number[];
  diskSize: number;
  numPegs: number;
  selected: boolean;
  pegNum: number;
}

/**
 * @param {*} props
 *
 * knowledge of which peg has been clicked and which is therefore active, must be done at the peg level, and then also
 * at the puzzle level...
 *
 * or! let the peg simply be active... and choose whichever is the top disk to be the active disk...
 * then disks don't need a click handler... possibly...
 *
 * @todo find how to pass methods... usereducer, useMethods? try that...
 */
export const Peg = ({ pegDiscs, numPegs, diskSize, selected, pegNum }: PegProps) => {

  const pegClickHandler = (index: number) => {
    console.log('call state machine passing the index of the clicked peg', index);
  }

  return (<>
    <ul
      onClick={() => pegClickHandler(pegNum)}
      className="peg">
      {pegDiscs.map((diskNum: number) => <Disk diskNumber={diskNum} diskSize={diskSize} key={diskNum} selected={selected} />)}
    </ul>
    <style jsx>{`
      ul.peg {
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
          numPegs === 3 ? '300px' :
          numPegs === 4 ? '230px' :
          numPegs === 5 ? '180px' : '180px'
          };
        border-bottom: 20px solid #000;
        border-image:
          linear-gradient(to bottom, #738ca4 0%, #eee 100%) 100% 0;
      }
      ul.peg:after {
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
export { Peg as default }
