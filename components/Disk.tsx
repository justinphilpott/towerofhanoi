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
  // style={{ width: ((diskNumber * diskSize)+48) +'px' }}

  return (
    <>
      <li
        className={ selected ? 'disk disk-selected' : 'disk disk-unselected' }
        onClick={(event) => handleDiskClick(event)}
        key={diskNumber.toString()}>
        <span>{diskNumber} {/*{diskSize} { selected ? 'true' : 'false' } */}</span>
      </li>
      <style jsx>{`
        $color: black;
        li.disk {
          height: 32px;
          -webkit-border-radius: 10%;
          -moz-border-radius: 10%;
          border-radius: 10%;
          color: $color;
          margin: 0;
          border-bottom: 0px;
          user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
          width: ${(diskNumber+5)*20}px;
          justify-content: center;
          align-items: center;
          display: flex;
        }

        li.disk-unselected {
          background: linear-gradient(to right, #81a3c5 0%, #b3cce4 20%, #d8f2fa 20.5%, #b3cce4 21%, #536c84 60%, #334c64 80%, #536c84 90%, #7193b5 100%);
        }
        li.disk-selected {
          background: linear-gradient(to right, #b3cce4, #81a3c5);
        }
      `}</style>
    </>
  );
};
export { Disk as Default }
