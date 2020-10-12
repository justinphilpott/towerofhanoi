import React from "react";
import { Disk } from "./Disk"

export interface PegProps {
  pegData: number[];
  pegWidth: number;
  diskSize: number;
}

/**
 * @param {*} props
 */
export const Peg: React.FC<PegProps> = ({ pegData, pegWidth, diskSize }) => (
  <>
    <ul>
      {pegData.map(diskNum => <Disk diskNumber={diskNum} diskSize={diskSize} key={diskNum} />)}
    </ul>
    <style jsx>{`
      ul {
        border: 1px solid #aaaaaa;
        width: ${pegWidth}px;
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
      }
    `}</style>
  </>
);
