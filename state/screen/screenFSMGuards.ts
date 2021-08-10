import { ScreenContext, ScreenEvent } from './types/screenFSMTypes';

/**
 * Check with the invoked HanoiFSM to see if we should show the restart icon
 * @todo currently this check can never but run at a time that we are not
 * midgame, as the UI prevents it, so this check is useless, but it should
 * be removed and noted as such. Restart could be called when game is finished 
 * or when game has not started - but the UI currently prevents it.
 * @param context 
 * @param event 
 * @returns 
 */
export const gameCompleteCheck = (context: ScreenContext, event: ScreenEvent): boolean => {



  return true;
}