import React from 'react';
import { Flex, Fade } from '@chakra-ui/react';
import { ScreenStart } from './ScreenStart';
import { ScreenSettings } from './ScreenSettings';
import { ScreenGame } from './ScreenGame';
import { useScreenService } from './fsm/ScreenFSMProvider';

export const ScreenWrapper = () => {

  const [screenState] = useScreenService();



  return (
    <>
      {screenState.value === "start" &&
        <Fade in={true}>
          <ScreenStart />
        </Fade>
      }
      {screenState.value === "settings" &&
        <Fade in={true}>
          <Flex height="100vh" width="100vw" p={12} alignItems="center" justifyContent="center">
            <ScreenSettings />
          </Flex>
        </Fade>
      }
      {screenState.matches("game") &&
        <Flex height="100vh" width="100vw" alignItems="center" justifyContent="center">
          <ScreenGame />
        </Flex>
      }
    </>
  )
}