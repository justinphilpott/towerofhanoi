import React from 'react';
import { screenMachine } from '../state/screenMachine';
import { ScreenStart } from './screens/ScreenStart';
import { ScreenGame } from './screens/ScreenGame';
import { useMachine } from '@xstate/react'
import { Flex } from '@chakra-ui/react'

export const TowerOfHanoiGame = () => {
  const [state, send] = useMachine(screenMachine);

  return (
    <>
      {state.matches("screenStart") &&
        <Flex direction="column" background="rgba(255, 255, 255, 0.9)" p="12" rounded="6" boxShadow="md">
          <ScreenStart onPlay={
            (numDisks: number, numPegs: number) => send("PLAY", { numDisks, numPegs })
          } />
        </Flex>
      }
      {state.matches("screenGame") &&
        <ScreenGame onNewGame={
          send("NEWGAME")
        } />
      }
    </>  
  )
}