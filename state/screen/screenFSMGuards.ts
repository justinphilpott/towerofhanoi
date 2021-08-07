import { ScreenContext, ScreenEvent } from './types/screenFSMTypes';
import { assign } from 'xstate'
import { assertEvent } from 'xstate-helpers';

/**
 * Check with the invoked HanoiFSM to see if we should show the 
 * @param context 
 * @param event 
 * @returns 
 */
export const gameCompleteCheck = (context: ScreenContext, event: ScreenEvent): boolean => {



  return true;
}