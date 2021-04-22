import React, { MouseEvent } from 'react';

export interface DiskProps {
  diskNumber: number;
  diskSize: number;
  key: number;
  selected: boolean;
}

export const Disk = ({ diskNumber, diskSize, selected }: DiskProps) => {

  const diskClickHandler = (event: MouseEvent) => {
    console.log(event);
  }

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
          z-index: 2;
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
          background: linear-gradient(to right, #cfbb4b 0%, #e9ce56 20%, #fde86e 20.5%, #ebd55a 21%, #837527 60%, #615618 80%, #867d29 90%, #b6ad36 100%);
        }
        li.disk:first-child {
          color: ${ selected ? '#fff' : '#000' };
        }
      `}</style>
    </>
  );
};
export { Disk as Default }
