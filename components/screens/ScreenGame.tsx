import React from 'react'
import { Button } from '@chakra-ui/react'
import {
  Flex
} from "@chakra-ui/react"
import { hanoiMachine } from '../../state/hanoiMachine';
import { Puzzle } from '../Puzzle'
import { useMachine } from '@xstate/react'

type CallbackFunction = () => void;

export const ScreenGame = ({ onNewGame }:{ onNewGame:any }) => {
  const [state, send] = useMachine(hanoiMachine, { devTools: true });

  const onResetPuzzle = () => {
    console.log("Implement onResetPuzzle");
  }

  return (
    <Flex direction="column" background="rgba(255, 255, 255, 0.9)" p="12" rounded="6" boxShadow="md">
      <Puzzle puzzleState={state.context.puzzleState} />
      <Button colorScheme="teal" onClick={() => onNewGame()}>New game</Button>
      <Button colorScheme="teal" onClick={() => onResetPuzzle()}>Reset game</Button>
    </Flex>
  )
}
