import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
  Flex
} from "@chakra-ui/react"
import { hanoiMachineDef } from '../../state/hanoiMachine';
import { Game } from '../Game'
import { useMachine } from '@xstate/react'
import { createMachine } from 'xstate'

type CallbackFunction = () => void;

interface GameConfig {
  numDisks: number;
  numPegs: number;
}

/**
 * ScreenGame
 *
 * @param numDisks
 * @param numPegs
 * @param onNewGame
 * @returns JSX
 */
export const ScreenGame = (numDisks:number, numPegs:number, { onNewGame }:{ onNewGame:any }) => {

  const chosenGameConfig:GameConfig = { numDisks: numDisks, numPegs: numPegs}

  const hanoiMachine = createMachine(hanoiMachineDef);
  hanoiMachine.withContext({ "gameState": chosenGameConfig }); // set up the initial towers structure

  const [state, send] = useMachine(hanoiMachine, { devTools: true });

  const onResetGame = () => {
    console.log("Implement onResetGame");
    // send("RESET")
  }

  return (
    <Flex direction="column" alignItems="flex-end" justifyContent="flex-end" background="rgba(255, 255, 255, 0.9)" p="12" rounded="6" boxShadow="md">
      <Game gameState={state.context.gameState} />
      <ButtonGroup>
        <Button colorScheme="teal" onClick={() => onNewGame()}>New game</Button>
        <Button colorScheme="orange" onClick={() => onResetGame()}>Reset game</Button>
      </ButtonGroup>
    </Flex>
  )
}
