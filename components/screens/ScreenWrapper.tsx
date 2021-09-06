import React from "react";
import { Flex } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { ScreenStart } from "./ScreenStart";
import { SpinnerLight } from '../../utils/spinnerLight';
import { useInterpret, useSelector } from '@xstate/react';
import { EmittedFrom, ScreenContext } from '../../state/screen/types/screenFSMTypes'
import { getScreenMachine } from '../../state/screen/screenFSM';
import { Interpreter, AnyEventObject } from 'xstate';

interface ScreenSettingsProps {}
const ScreenSettings_Dynamic = dynamic<ScreenSettingsProps>(
  () => import('./ScreenSettings').then((mod) => mod.ScreenSettings),
  { loading: () =>
    <Flex height="calc(var(--vh, 1vh) * 100)" width="100vw" alignItems="center" justifyContent="center" backgroundColor="transparent" z-index={10} >
      <SpinnerLight />
    </Flex>
  }
)

interface ScreenGameProps {}
const ScreenGame_Dynamic = dynamic<ScreenGameProps>(
  () => import('./ScreenGame').then((mod) => mod.ScreenGame),
  { loading: () =>
    <Flex height="calc(var(--vh, 1vh) * 100)" width="100vw" alignItems="center" justifyContent="center" backgroundColor="transparent" z-index={10} >
      <SpinnerLight />
    </Flex>
  }
)

interface ScreenTutorialProps {}
const ScreenTutorial_Dynamic = dynamic<ScreenTutorialProps>(
  () => import('./ScreenTutorial').then((mod) => mod.ScreenTutorial),
  { loading: () =>
    <Flex height="calc(var(--vh, 1vh) * 100)" width="100vw" alignItems="center" justifyContent="center" backgroundColor="transparent" z-index={10} >
      <SpinnerLight />
    </Flex>
  }
)

interface ScreenCreditsProps {}
const ScreenCredits_Dynamic = dynamic<ScreenCreditsProps>(
  () => import('./ScreenCredits').then((mod) => mod.ScreenCredits),
  { loading: () =>
    <Flex height="calc(var(--vh, 1vh) * 100)" width="100vw" alignItems="center" justifyContent="center" backgroundColor="transparent" z-index={10} >
      <SpinnerLight />
    </Flex>
  }
)

interface ScreenWrapperProps {
  initialState: string;
}

export const XStateContext = React.createContext({} as Interpreter<ScreenContext, any, AnyEventObject, {
  value: any;
  context: ScreenContext;
}>);

/**
 * Initialise the screenState
 */
export const ScreenWrapper = ({ initialState }: ScreenWrapperProps ) => {

  // load screen actor (@see https://xstate.js.org/docs/guides/actors.html)
  const screenActor = useInterpret(getScreenMachine(initialState), { devTools: true });

  const isStart = useSelector(screenActor, (state: EmittedFrom<typeof screenActor>) => (state.value === "start"));
  const isGame = useSelector(screenActor, (state: EmittedFrom<typeof screenActor>) => (state.matches("game")));
  const isTutorial = useSelector(screenActor, (state: EmittedFrom<typeof screenActor>) => (state.matches("tutorial")));
  const isSettings = useSelector(screenActor, (state: EmittedFrom<typeof screenActor>) => (state.value === "settings"));
  const isCredits = useSelector(screenActor, (state: EmittedFrom<typeof screenActor>) => (state.value === "credits"));

  return (
    <XStateContext.Provider value={screenActor}>
      {isStart &&
        <ScreenStart />
      }
      {isGame &&
        <Flex
          height="calc(var(--vh, 1vh) * 100)"
          width="100vw"
          alignItems="center"
          justifyContent="center"
        >
          <ScreenGame_Dynamic />
        </Flex>
      }
      {isTutorial &&
        <Flex
          height="calc(var(--vh, 1vh) * 100)"
          width="100vw"
          alignItems="center"
          justifyContent="center"
        >
          <ScreenTutorial_Dynamic />
        </Flex>
      }
      {isSettings &&
        <Flex
          height="calc(var(--vh, 1vh) * 100)"
          width="100vw"
          p={6}
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <ScreenSettings_Dynamic />
        </Flex>
      }
      {isCredits &&
        <Flex
          height="calc(var(--vh, 1vh) * 100)"
          width="100vw"
          p={3}
          alignItems="center"
          position="relative"
          flexDirection="column"
        >
          <ScreenCredits_Dynamic />
        </Flex>
      }
    </XStateContext.Provider>
  );
};
