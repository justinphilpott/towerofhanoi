import React, { MouseEvent } from 'react';

export interface DiskProps {
  diskNumber: number;
  diskSize: number;
  key: number;
  selected: boolean;
}

export const Disk = ({ diskNumber, diskSize, selected }: DiskProps) => {

  return (
    <>
      <li
        className="disk"
        key={diskNumber.toString()}>
        <span>{diskNumber} {/*{diskSize} { selected ? 'true' : 'false' } */}</span>
      </li>
      <style jsx>{`
        $color: black;
        li.disk {
          height: 32px;
          border-radius: 10%;
          color: $color;
          margin: 0;
          border-bottom: 0px;
          user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
          width: ${(diskNumber+5)*18}px;
          justify-content: center;
          align-items: center;
          display: flex;
          background: linear-gradient(to right, #81a3c5 0%, #b3cce4 20%, #d8f2fa 20.5%, #b3cce4 21%, #536c84 60%, #334c64 80%, #536c84 90%, #7193b5 100%);
        }
      `}</style>
    </>
  );
};
export { Disk as Default }
