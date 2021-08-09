import { useInterpret } from '@xstate/react';
import { createReactContextHelpers } from 'xstate-helpers';
import { useErrorHandler } from 'react-error-boundary';
import { hanoiFSM } from './hanoiFSM';

// what do these props do?
const helper = createReactContextHelpers('Hanoi', (props: { name: string }) => {
  const handleError = useErrorHandler();

  // what to actually do in here?
  // ...

  // do we need to supply context here, can we even?
  const interpreter = useInterpret(hanoiFSM, { devTools: false});

  /*
  React.useEffect(() => {
    interpreter.send({ type: 'SET_USER', user: auth.user });
  }, [interpreter, auth.user]);
  */

  return interpreter;
});

export const {
  Provider: HanoiProvider,
  ReactContext: HanoiContext,
  useInterpreter: useHanoiInterpreter,
  useService: useHanoiService,
  useSelector: useHanoiSelector,
  useSend: useHanoiSend,
} = helper;
