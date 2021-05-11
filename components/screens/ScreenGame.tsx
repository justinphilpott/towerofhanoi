import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
  Flex
} from "@chakra-ui/react"
import { hanoiFSMDef } from '../../state/hanoiFSM';
import { useMachine } from '@xstate/react'
import { createMachine } from 'xstate'
import { Game } from '../Game'

type CallbackFunction = () => void;

interface GameConfig {
  numDisks: number,
  numPegs: number,
  gameBoard: number[],
  activePeg: number|boolean
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

  /// create initial tower

  // this could also be done by sending an event to the hanoiFSM in the screen wrapper
  // which would setup up all the following, and no need to have so many params...
  // reducing params is good. But fsms get more complex. Logical separation of concerns is good.
  const initialGameContext:GameConfig = { 
    numDisks: numDisks,
    numPegs: numPegs,
    gameBoard: [],
    activePeg: false
  }

  const hanoiFSM = createMachine(hanoiFSMDef);
  hanoiFSM.withContext(initialGameContext); // set up the initial towers structure

  const [state, send] = useMachine(hanoiFSM, { devTools: true });

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
