import React, { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { ScreenStart } from "./ScreenStart";
import { SpinnerLight } from '../../utils/spinnerLight';
import { XStateContext, XStateProvider } from '../../state/screen/ScreenFSMContext';
import { useSelector } from '@xstate/react';
import { EmittedFrom } from '../../state/screen/types/screenFSMTypes'


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

  console.log(initialState);
  const screenFSMContext = useContext(XStateContext);

  const isScreenStart = useSelector(
    screenFSMContext.screenActor,
    (state: EmittedFrom<typeof screenFSMContext.screenActor>) => (state.value === "start")
  );
  const isScreenGame = useSelector(
    screenFSMContext.screenActor,
    (state: EmittedFrom<typeof screenFSMContext.screenActor>) => (state.matches("game"))
  );
  const isScreenSettings = useSelector(
    screenFSMContext.screenActor,
    (state: EmittedFrom<typeof screenFSMContext.screenActor>) => (state.value === "settings")
  );
  const isScreenCredits = useSelector(
    screenFSMContext.screenActor,
    (state: EmittedFrom<typeof screenFSMContext.screenActor>) => (state.value === "credits")
  );

  return (
    <>
      {isScreenStart &&
        <ScreenStart />
      }
      {isScreenGame &&
        <Flex
          height="calc(var(--vh, 1vh) * 100)"
          width="100vw"
          alignItems="center"
          justifyContent="center"
        >
          <ScreenGame_Dynamic />
        </Flex>
      }
      {isScreenSettings &&
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
      {isScreenCredits &&
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
    <XStateProvider>
      <ScreenWrapper_inner initialState={initialState} />
    </XStateProvider>
  )
}
