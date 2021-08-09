import { useInterpret } from '@xstate/react';
import { createReactContextHelpers } from 'xstate-helpers';
import { useErrorHandler } from 'react-error-boundary';

import { screenFSM } from './screenFSM';

// what do these props do?
const helper = createReactContextHelpers('Screen', () => {

  // do we need to supply context here, can we even?
  const interpreter = useInterpret(screenFSM, { devTools: true });

  return interpreter;
});

export const {
  Provider: ScreenProvider,
  ReactContext: ScreenContext,
  useInterpreter: useScreenInterpreter,
  useService: useScreenService,
  useSelector: useScreenSelector,
  useSend: useScreenSend,
} = helper;
