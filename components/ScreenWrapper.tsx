import React from 'react';
import { screenMachine } from '../state/screenMachine';
import { ScreenStart } from './screens/ScreenStart';
import { ScreenGame } from './screens/ScreenGame';
import { useMachine } from '@xstate/react'
import { Flex } from '@chakra-ui/react'

export const ScreenWrapper = () => {
  const [screenState, send] = useMachine(screenMachine, { devTools: true });
 // const [hanoiState, send] = useMachine(hanoiMachine, { devTools: true });

  return (
    <>
      {screenState.matches("screenStart") &&
        <ScreenStart onPlay={
          (numDisks: number, numPegs: number) => send("PLAY", { numDisks, numPegs })
        } />
      }
      {screenState.matches("screenGame") &&
        <Flex height="100vh" alignItems="flex-end" justifyContent="center">
          <ScreenGame disks={state.context.numDisks} pegs  onNewGame={() => send("NEWGAME")} />
        </Flex>
      }
    </>
  )
}