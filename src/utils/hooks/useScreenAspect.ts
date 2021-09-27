import { useState, useLayoutEffect } from 'react'

declare global {
  interface Window { // eslint-disable-line
    availHeight?: number;
    availWidth?: number;
  }
}

/**
 * Gives the aspect ratio of the screen
 *
 * Depending on circumstances this may or may not allow
 * one to infer orientation e.g. an onscreen keyboard
 *
 * @returns Float - screen aspect ratio
 *
 * @see https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
 * @see https://css-tricks.com/debouncing-throttling-explained-examples/
 * @see https://www.typescriptlang.org/docs/handbook/2/functions.html#declaring-this-in-a-function
 */
export const useScreenAspect = (delay = 1000) => {

  const iOS = () => {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

  const calcAspect = ():number => {
    
    // @todo bit hacky detection here
    return iOS() ? window.innerWidth / window.innerHeight : window.screen.availWidth / window.screen.availHeight;
  }

  const [aspect, setAspect] = useState(calcAspect());

  // debounce function
  const db = (fn: () => void, milliseconds: number) => {
    let timer: number | null;

    return function() {
      clearTimeout(timer as number);
        timer = window.setTimeout(function(this: () => {}){ // eslint-disable-line
        timer = null;
        fn.apply(this);
      }, milliseconds)
    };
  }

  // capture the resize and get update the aspect
  useLayoutEffect(() => {

    const db_handleResize = db(function handleResize() {
      setAspect(calcAspect());
    }, delay);

    window.addEventListener('resize', db_handleResize);
    return () => {
      window.removeEventListener('resize', db_handleResize);
    };
  });

  return aspect;
}