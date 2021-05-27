import React from 'react';
import { Flex } from '@chakra-ui/react';
import { ScreenStart } from './ScreenStart';
import { ScreenGame } from './ScreenGame';
import { useScreenService } from './fsm/ScreenFSMProvider';

export const ScreenWrapper = () => {

  const [screenState] = useScreenService();

  return (
    <>
      {screenState.matches("start") &&
        <ScreenStart />
      }
      {screenState.matches("settings") &&
        <ScreenSettings />
      }
      {screenState.matches("game") &&
        <Flex height="100vh" width="100vw" alignItems="center" justifyContent="center">
          <ScreenGame />
        </Flex>
      }
      {screenState.matches("credits") &&
        <ScreenCredits />
      }
    </>
  )
}