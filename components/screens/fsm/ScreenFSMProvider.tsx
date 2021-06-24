import { useInterpret } from '@xstate/react';
import { createReactContextHelpers } from 'xstate-helpers';
import { useErrorHandler } from 'react-error-boundary';

import { screenFSM } from './screenFSM';

// what do these props do?
const helper = createReactContextHelpers('Screen', (props: { name: string }) => {
  const handleError = useErrorHandler();

  // what to actually do in here?
  // ...

  // do we need to supply context here, can we even?
  const interpreter = useInterpret(screenFSM, { devTools: true });

  /*
  React.useEffect(() => {
    interpreter.send({ type: 'SET_USER', user: auth.user });
  }, [interpreter, auth.user]);
  */

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
