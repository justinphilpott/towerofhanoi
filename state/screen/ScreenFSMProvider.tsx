import { useInterpret } from '@xstate/react';
import { createReactContextHelpers } from 'xstate-helpers/react/createReactContextHelpers';
import { screenFSM } from './screenFSM';

export const {
  Provider: ScreenProvider,
  ReactContext: ScreenContext,
  useInterpreter: useScreenInterpreter,
  useActor: useScreenActor,
  useSelector: useScreenSelector,
  useSend: useScreenSend,
} = createReactContextHelpers('Screen', () => {
  return useInterpret(screenFSM, { devTools: true });
});
