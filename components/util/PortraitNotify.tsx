import React from 'react';
import { useScreenAspect } from '../towerofhanoi/utils/useScreenAspect';

type Props = {
  delay: number
  component: React.FunctionComponent
};

/**
 * PortraitNotify
 *
 * @param {number} delay - trailing edge delay after resize completes
 * @param {React.FunctionComponent} component - the component to render if we are 
 * @returns {React.FunctionComponent}
 */
export const PortraitNotify:React.FunctionComponent<Props> = ({delay, component}: Props) => {

  let aspect = useScreenAspect(delay);

  return (
    aspect < 1 ?
      <>
        {component}
      </>
    :
      <></>
  )
}