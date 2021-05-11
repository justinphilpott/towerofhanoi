import React from 'react';
import { screenFSM } from '../state/screenFSM';
import { ScreenStart } from './screens/ScreenStart';
import { ScreenGame } from './screens/ScreenGame';
import { useMachine } from '@xstate/react'
import { Flex } from '@chakra-ui/react'

export const ScreenWrapper = () => {
  const [screenState, send] = useMachine(screenFSM, { devTools: true });

  /**
   * What state affects:
   * 
   * Screen machine:
   * - whether the game has started or not
   * - 
   */

  return (
    <>
      {screenState.matches("screenStart") &&
        <ScreenStart onPlay={
          (numDisks: number, numPegs: number) => send("PLAY", { numDisks, numPegs })
        } />
      }
      {screenState.matches("screenGame") &&
        <Flex height="100vh" alignItems="flex-end" justifyContent="center">
          <ScreenFSM disks={state.context.numDisks} pegs  onNewGame={() => send("NEWGAME")} />
        </Flex>
      }
    </>
  )
}