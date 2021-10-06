import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { ScreenStart } from "./ScreenStart";
import { SpinnerLight } from '../../utils/spinnerLight';
import { useInterpret, useSelector } from '@xstate/react';
import { EmittedFrom, ScreenContext } from '../../state/screen/types/screenFSMTypes'
import { getScreenMachine } from '../../state/screen/screenFSM';
import { Interpreter, AnyEventObject } from 'xstate';

// dynamic loading
interface ScreenSettingsProps {}
const ScreenSettings_Dynamic = dynamic<ScreenSettingsProps>(
  () => import('./ScreenSettings').then((mod) => mod.ScreenSettings),
  {
    loading: ({error}) => {
      if (error) {
        return <Flex height="calc(var(--vh, 1vh) * 100)" position="absolute" top="0px" left="0px" bottom="0px" right="0px" width="100vw" alignItems="center" justifyContent="center" backgroundColor="transparent" z-index={10} >
          <Flex direction="column" width="80%" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
            <Text fontSize={{base: "1.2rem", md: "1.8rem", lg:"2.5rem"}} z-index={100} color="black">! Please check your connection and reload...</Text>
          </Flex>
        </Flex>
      }
      return <Flex height="calc(var(--vh, 1vh) * 100)" width="100vw" alignItems="center" justifyContent="center" backgroundColor="transparent" z-index={10} >
        <SpinnerLight />
      </Flex>
    }
  }
)

interface ScreenGameProps {}
const ScreenGame_Dynamic = dynamic<ScreenGameProps>(
  () => import('./ScreenGame').then((mod) => mod.ScreenGame),
  {
    loading: ({error}) => {
      if (error) {
        return <Flex height="calc(var(--vh, 1vh) * 100)" position="absolute" top="0px" left="0px" bottom="0px" right="0px" width="100vw" alignItems="center" justifyContent="center" backgroundColor="transparent" z-index={10} >
          <Flex direction="column" width="80%" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
            <Text fontSize={{base: "1.2rem", md: "1.8rem", lg:"2.5rem"}} z-index={100} color="black">! Please check your connection and reload...</Text>
          </Flex>
        </Flex>
      }
      return <Flex height="calc(var(--vh, 1vh) * 100)" width="100vw" alignItems="center" justifyContent="center" backgroundColor="transparent" z-index={10} >
        <SpinnerLight />
      </Flex>
    }
  }
)

interface ScreenTutorialProps {}
const ScreenTutorial_Dynamic = dynamic<ScreenTutorialProps>(
  () => import('./ScreenTutorial').then((mod) => mod.ScreenTutorial),
  {
    loading: ({error}) => {
      if (error) {
        return <Flex height="calc(var(--vh, 1vh) * 100)" position="absolute" top="0px" left="0px" bottom="0px" right="0px" width="100vw" alignItems="center" justifyContent="center" backgroundColor="transparent" z-index={10} >
          <Flex direction="column" width="80%" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
            <Text fontSize={{base: "1.2rem", md: "1.8rem", lg:"2.5rem"}} z-index={100} color="black">! Please check your connection and reload...</Text>
          </Flex>
        </Flex>
      }
      return <Flex height="calc(var(--vh, 1vh) * 100)" width="100vw" alignItems="center" justifyContent="center" backgroundColor="transparent" z-index={10} >
        <SpinnerLight />
      </Flex>
    }
  }
)

interface ScreenCreditsProps {}
const ScreenCredits_Dynamic = dynamic<ScreenCreditsProps>(
  () => import('./ScreenCredits').then((mod) => mod.ScreenCredits),
  {
    loading: ({error}) => {
      if (error) {
        return <Flex height="calc(var(--vh, 1vh) * 100)" position="absolute" top="0px" left="0px" bottom="0px" right="0px" width="100vw" alignItems="center" justifyContent="center" backgroundColor="transparent" z-index={10} >
          <Flex direction="column" width="80%" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
            <Text fontSize={{base: "1.2rem", md: "1.8rem", lg:"2.5rem"}} z-index={100} color="black">! Please check your connection and reload...</Text>
          </Flex>
        </Flex>
      }
      return <Flex height="calc(var(--vh, 1vh) * 100)" width="100vw" alignItems="center" justifyContent="center" backgroundColor="transparent" z-index={10} >
        <SpinnerLight />
      </Flex>
    }
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
 * 
 * initialState is given to allow us to enter the statemachine that controls the screen flow at any of the major
 * states given what is clicked in the HTML screenStartFragment.txt. This is in order to remove XState code
 * and processing from the critical path. This gives c. 20% reduction in first load size
 */
export const ScreenWrapper = ({ initialState }: ScreenWrapperProps ) => {

  // load screen actor (@see https://xstate.js.org/docs/guides/actors.html) with custom start state
  const screenActor = useInterpret(getScreenMachine(initialState, 3), { devTools: true });

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
