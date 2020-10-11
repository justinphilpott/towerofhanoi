import React, { MouseEvent } from 'react';

export interface DiskProps {
  diskNumber: number;
  diskSize: number;
  key: number;
}

/**
 * may be to have a Disk as a standalone story is being too granular...?
 *
 * @param param0
 */
export const Disk: React.FC<DiskProps> = ({ diskNumber, diskSize }) => {

  const handleDiskClick = (event: MouseEvent) => {
    return false;
  };

  return (
    <>
      <li onClick={(event) => handleDiskClick(event)} style={{}} key={diskNumber}>
        <span>{diskNumber}</span>
      </li>
      <style jsx>{`
        li {
          background-color: #88f;
          width: ${ diskNumber * diskSize};
          height: 32px;
          background-color: #aaf;
          text-align: center;
          border: 1px solid #888;
        }
      `}</style>
    </>
  );
};
