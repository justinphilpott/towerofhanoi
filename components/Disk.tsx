import React, { useState, MouseEvent } from 'react';

export interface DiskProps {
  diskNumber: number;
  diskSize: number;
  key: number;
}

export const Disk: React.FC<DiskProps> = ({ diskNumber, diskSize }) => {

  const [selected, setSelected] = useState(false);

  const handleDiskClick = (event: MouseEvent) => {
    setSelected(!selected);
  };

  return (
    <>
      <li
        className={ selected ? 'disk disk-selected' : 'disk disk-unselected' }
        style={{ width: ((diskNumber * diskSize)+20) +'px' }}
        onClick={(event) => handleDiskClick(event)}
        key={diskNumber}>
        <span>{diskNumber} {/*{diskSize} { selected ? 'true' : 'false' } */}</span>
      </li>
      <style jsx>{`
        li.disk {
          display: flex;

          height: 32px;


          border-top: 1px solid #96d1f8;

          background: -webkit-gradient(linear, left top, left bottom, from(#b3cce4), to(#81a3c5));
          background: -webkit-linear-gradient(top, #b3cce4, #81a3c5);
          background: -moz-linear-gradient(top, #b3cce4, #81a3c5);
          background: -ms-linear-gradient(top, #b3cce4, #81a3c5);
          background: -o-linear-gradient(top, #b3cce4, #81a3c5);
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;

          color: black;
          margin: 0;
          align-items: center;
          justify-content: center;
          border-top: 1px solid rgb(183, 212, 236);
          border-bottom: 0px;
        }
        li.disk-selected {
          background-color: rgb(172, 137, 92);
        }
        li.disk-unselected {
          background-color: rgb(255, 187, 97);
        }
      `}</style>
    </>
  );
};
