import { useState, useLayoutEffect } from 'react'

declare global {
  interface Window {
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

  const calcAspect = ():number => {
    return window.screen.availWidth / window.screen.availHeight;
  }

  const [aspect, setAspect] = useState(calcAspect());
  const [timeoutState, setTimeoutState] = useState(false);

  // debounce function
  const db = (fn: () => void, milliseconds: number) => {
    let timer: number | null;

    return function() {
      clearTimeout(timer as number);
        timer = window.setTimeout(function(this: () => {}){
        timer = null;
        fn.apply(this);
      }, milliseconds)
    };
  }

  // capture the resize and get update the aspect
  useLayoutEffect(() => {

    const db_handleResize = db(function handleResize() {
      console.log('handle resize');
      setAspect(calcAspect());
    }, delay);

    window.addEventListener('resize', db_handleResize);
    return () => {
      window.removeEventListener('resize', db_handleResize);
    };
  });

  return aspect;
}