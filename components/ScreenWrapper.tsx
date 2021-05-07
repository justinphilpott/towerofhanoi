import React from 'react';
import { screenMachine } from '../state/screenMachine';
import { ScreenStart } from './screens/ScreenStart';
import { ScreenGame } from './screens/ScreenGame';
import { useMachine } from '@xstate/react'
import { Flex } from '@chakra-ui/react'

export const ScreenWrapper = () => {
  const [state, send] = useMachine(screenMachine, { devTools: true });

  return (
    <>
      {state.matches("screenStart") &&
        <ScreenStart onPlay={
          (numDisks: number, numPegs: number) => send("PLAY", { numDisks, numPegs })
        } />
      }
      {state.matches("screenGame") &&
        <Flex height="100vh" alignItems="flex-end" justifyContent="center">
          <ScreenGame onNewGame={() => send("NEWGAME")} />
        </Flex>
      }
    </>
  )
}