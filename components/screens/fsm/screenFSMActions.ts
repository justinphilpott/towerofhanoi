import { ScreenContext, ScreenEvent } from './types/screenFSMTypes';
import { assign } from 'xstate'
import { assertEvent } from 'xstate-helpers';

/**
 * actions for Screen FSM:
 * 
 * saveSettings
 */
const actions = {
  saveSettings: assign((context: ScreenContext, event: ScreenEvent) => {
    assertEvent(event, 'SAVE');
    return {
      numPegs: event.numPegs,
      numDisks: event.numDisks
    };
  })
}

export { actions }