import React from "react";
import { Disk } from "./Disk"

export interface PegProps {
  pegDiscs: number[];
  diskSize: number;
  numPegs: number;
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
export const Peg = ({ pegDiscs, numPegs, diskSize }: PegProps) => {

  

  return (<>
    <ul className={'peg'}>
      {pegDiscs.map((diskNum: number) => <Disk diskNumber={diskNum} diskSize={diskSize} key={diskNum} />)}
    </ul>
    <style jsx>{`
      ul.peg {
        flex-basis: calc(100%/${numPegs});
      }
    `}</style>
    <style jsx>{`
      ul.peg {
        list-style: none;
        margin: 0;
        padding: 0;
        padding-top: 32px;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        position: relative;
      }
      ul.peg:after {
        content:"";
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 50%;
        border-left: 6px solid #cba;
        transform: translate(-50%);
        border-image:
          linear-gradient(
            to right,
            #cba,
            rgba(0, 0, 0, 0),
            #cba
          ) 1 100%;
            }
          `}</style>
  </>)
}
export { Peg as default }
