import React, { useState, MouseEvent } from 'react';

export interface DiskProps {
  diskNumber: number;
  diskSize: number;
  key: number;
}

export const Disk = ({ diskNumber, diskSize }: DiskProps) => {

  const [selected, setSelected] = useState(false);

  const handleDiskClick = (event: MouseEvent) => {


    setSelected(!selected);
  };

  // fire a callback (or method?) on selection to get the puzzle to 

  return (
    <>
      <li
        className={ selected ? 'disk disk-selected' : 'disk disk-unselected' }
        style={{ width: ((diskNumber * diskSize)+48) +'px' }}
        onClick={(event) => handleDiskClick(event)}
        key={diskNumber}>
        <span>{diskNumber} {/*{diskSize} { selected ? 'true' : 'false' } */}</span>
      </li>
      <style jsx>{`
        $color: black;
        li.disk {
          display: flex;
          height: 32px;
          -webkit-border-radius: 16px;
          -moz-border-radius: 16px;
          border-radius: 16px;
          color: $color;
          margin: 0;
          align-items: center;
          justify-content: center;
          border-bottom: 0px;
          user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
        }

        li.disk-unselected {
          background: linear-gradient(#b3cce4, #81a3c5);
        }
        li.disk-selected {
          background: linear-gradient(#8da3b8, #5b7692);
        }
      `}</style>
    </>
  );
};
export { Disk as Default }
