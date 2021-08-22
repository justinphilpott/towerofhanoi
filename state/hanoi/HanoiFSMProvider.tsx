import { useInterpret } from '@xstate/react';
import { createReactContextHelpers } from 'xstate-helpers/react/createReactContextHelpers';
import { hanoiFSM } from './hanoiFSM';

export const {
  Provider: HanoiProvider,
  ReactContext: HanoiContext,
  useInterpreter: useHanoiInterpreter,
  useActor: useHanoiActor,
  useSelector: useHanoiSelector,
  useSend: useHanoiSend,
} = createReactContextHelpers('Screen', () => {
  return useInterpret(hanoiFSM, { devTools: true });
});
