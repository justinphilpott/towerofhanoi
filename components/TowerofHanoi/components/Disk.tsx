import React from 'react';

export interface DiskProps {
  diskNumber: number;
  key: number;
  selected: boolean;
  numPegs: number
}

export const Disk = ({ diskNumber, selected }: DiskProps) => {

  return (
    <>
      <li
        className={ 'disk size'+(diskNumber) }
        key={diskNumber.toString()}>
        <span>{diskNumber}</span>
      </li>
      <style jsx>{`
        $color: black;
        li.disk {
          z-index: 2;
          border-radius: 0;
          color: $color;
          font-weight: bold;
          line-height: 1.2rem;
          margin: 0;
          padding: 0;
          border-bottom: 0px;
          user-select: none;
          width: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
          padding-top: 0.2rem;
          background: linear-gradient(to left, #cfbb4b 0%, #e9ce56 20%, #fde86e 20.5%, #ebd55a 21%, #837527 60%, #615618 80%, #867d29 90%, #b6ad36 100%);
        }
        li.disk:first-child {
          color: ${ selected ? '#fff' : '#000' };
          position: relative;
          top: ${ selected ? '-3px' : '0px' };
        }

        /* styled-jsx doesn't seem to like calculated percentages, sure this can be improved */
        li.disk.size1 { width: 30%; }
        li.disk.size2 { width: 40%; }
        li.disk.size3 { width: 50%; }
        li.disk.size4 { width: 60%; }
        li.disk.size5 { width: 70%; }
        li.disk.size6 { width: 80%; }
        li.disk.size7 { width: 90%; }
      `}</style>
    </>
  );
};
