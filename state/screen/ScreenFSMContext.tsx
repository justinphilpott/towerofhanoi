import React, { useState, createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { getScreenMachine } from './screenFSM';
import { ActorRef } from 'xstate';
import { ScreenEvent } from '../../state/screen/types/screenFSMTypes'

export interface XStateContextInterface {
  screenActor: ActorRef<ScreenEvent>;
  setInitialState: React.Dispatch<React.SetStateAction<string>>;
}

export const XStateContext = createContext({} as XStateContextInterface);

export const XStateProvider = ({ children }: any) => { // @todo remove any
  const [initialState, setInitialState] = useState('start');

  // generate a custom FSM depending upon the click of the
  // skeleton HTML start screen which gets replaced as soon as the FSM loads
  const screenActor = useInterpret(getScreenMachine(initialState));

  return (
    <XStateContext.Provider value={{ screenActor, setInitialState }}>
      { children }
    </XStateContext.Provider>
  );
};
