import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
  Flex
} from "@chakra-ui/react"
import { Game } from '../TowerofHanoi/components/Game';
import { hanoiFSM } from '../TowerofHanoi/fsm/hanoiFSM';
import { useScreenService, useScreenInterpreter } from './fsm/ScreenFSMProvider';
import { useService } from '@xstate/react';

type CallbackFunction = () => void;

interface GameConfig {
  numDisks: number,
  numPegs: number,
  gameBoard: number[],
  activePeg: number|boolean
}

interface GameWrapper {



}

/**
 * ScreenGame
 *
 * @param numDisks
 * @param numPegs
 * @param onNewGame
 * @returns JSX
 */
export const ScreenGame = () => {

  const [screenState, screenSend] = useScreenService();

  const screenInterpreter = useScreenInterpreter();
  const [hanoiState, hanoiSend] = useService(screenInterpreter.children.get('hanoiFSM'));

  // console.log("hanoiState", hanoiState);

  /**
   * onResetGame
   *
   * What does this need to do:
   * - the FSM need to go to the initial state
   * - which means setting up the start position of the game
   * - which means assigning to the numPegs and numDisks
   * -
   */
  const onResetGame = () => {
    console.log("Implement onResetGame");
    hanoiSend({
      type: "RESET"
    })
  }

  const onNewGame = () => {
    console.log('test');
    hanoiSend({
      type: 'NEWGAME'
    });
  }

  return (
    <Flex direction="column" width="100vw" alignItems="flex-end" justifyContent="flex-end" background="rgba(255, 255, 255, 0.9)" p="12" rounded="6" boxShadow="md">
      <Game state={hanoiState} />
      <ButtonGroup >
        <Button colorScheme="teal" onClick={() => onNewGame()}>New game</Button>
        <Button colorScheme="orange" onClick={() => onResetGame()}>Reset game</Button>
      </ButtonGroup>
    </Flex>
  )
}