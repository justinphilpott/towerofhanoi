import React from "react";
import { Flex } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { ScreenStart } from "./ScreenStart";
import { SpinnerLight } from '../../utils/spinnerLight';
import { ScreenProvider, useScreenActor } from '../../state/screen/ScreenFSMProvider';

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

const ScreenWrapper_inner = ({ initialState }: ScreenWrapperProps ) => {

  const [screenState] = useScreenActor();

  console.log('initialState', initialState);

  return (
    <>
      {screenState.value === "start" &&
        <ScreenStart />
      }
      {screenState.matches("game") &&
        <Flex
          height="calc(var(--vh, 1vh) * 100)"
          width="100vw"
          alignItems="center"
          justifyContent="center"
        >
          <ScreenGame_Dynamic />
        </Flex>
      }
      {screenState.value === "settings" &&
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
      {screenState.value === "credits" &&
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
    </>
  );
};

export const ScreenWrapper = ({initialState}: ScreenWrapperProps) => {
  return (
    <ScreenProvider>
      <ScreenWrapper_inner initialState={initialState} />
    </ScreenProvider>
  )
}