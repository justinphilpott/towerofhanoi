import React, { MouseEvent } from 'react';

export interface DiskProps {
  diskNumber: number;
  key: number;
  selected: boolean;
  numPegs: number
}

export const Disk = ({ diskNumber, selected, numPegs }: DiskProps) => {


  const diskMarginAdjustment =
    numPegs === 5 ? 9 :
    numPegs === 4 ? 11 : 13;

  const diskMargin = diskMarginAdjustment-diskNumber;


  return (
    <>
      <li
        className="disk"
        key={diskNumber.toString()}>
        <div><span>{diskNumber}</span></div>
      </li>
      <style jsx>{`
        $color: black;
        li.disk {
          z-index: 2;
          border-radius: 0;
          color: $color;
          margin: 0;
          padding: 0;
          border-bottom: 0px;
          user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
          width: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
          div {
            padding: 0.1rem 0.3rem 0.1rem 0.3rem;
            margin: 0;
            margin-left: ${(9-diskNumber)*0.4}rem;
            margin-right: ${(9-diskNumber)*0.4}rem;
            flex: 1 0;
            display: flex;
            justify-content: center;
            background: linear-gradient(to left, #cfbb4b 0%, #e9ce56 20%, #fde86e 20.5%, #ebd55a 21%, #837527 60%, #615618 80%, #867d29 90%, #b6ad36 100%);
          }
        }
        li.disk:first-child {
          color: ${ selected ? '#fff' : '#000' };
        }
      `}</style>
    </>
  );
};
