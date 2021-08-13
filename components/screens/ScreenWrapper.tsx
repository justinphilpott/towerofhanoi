import React from "react";
import { Flex } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
// import { ScreenStart } from "./ScreenStart";
import { useScreenService } from '../../state/screen/ScreenFSMProvider';
import { SpinnerLight } from '../../utils/spinnerLight';

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


export const ScreenWrapper = () => {
  const [screenState] = useScreenService();

  return (
    <>
      {screenState.value === "start" &&
        <>
        </>
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
