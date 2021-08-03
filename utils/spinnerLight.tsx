import React from 'react'

/**
 * A light weight spinner adapted from https://loading.io/css/
 * 
 * @returns React component
 */
export const SpinnerLight = () => {

  return (
    <>
      <div className="lds-dual-ring"></div>
      <style jsx>{`
        .lds-dual-ring {
          display: inline-block;
          width: 80px;
          height: 80px;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 64px;
          height: 64px;
          margin: 8px;
          border-radius: 50%;
          border: 6px solid #FDC173;
          border-color: #FDC173 transparent #E78059 transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

/**
 * A light weight spinner adapted from https://loading.io/css/
 * 
 * @returns React component
 */
 export const SpinnerLightSmall = () => {

  return (
    <>
      <div className="lds-dual-ring"></div>
      <style jsx>{`
        .lds-dual-ring {
          display: inline-block;
          width: 20px;
          height: 20px;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 18px;
          height: 18px;
          margin: 1px;
          margin-left: 2px;
          border-radius: 50%;
          border: 3px solid #FDC173;
          border-color: #FDC173 transparent #E78059 transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};