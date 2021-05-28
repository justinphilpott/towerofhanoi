import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
  Flex, Spacer
} from "@chakra-ui/react"
import { Game } from '../TowerofHanoi/components/Game';
import { hanoiFSM } from '../TowerofHanoi/fsm/hanoiFSM';
import { useScreenService, useScreenInterpreter } from './fsm/ScreenFSMProvider';
import { useActor } from '@xstate/react';
import { XStateInspectLoaderProps } from 'xstate-helpers';

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
  // this could return undefined if the FSM wasn't there, but it will be so we !
  const [hanoiState, hanoiSend] = useActor(screenInterpreter.children.get('hanoiFSM')!); 

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

  return (
    <>
      <Flex direction="column" width="100vw" height="100vh" alignItems="center" justifyContent="space-between">
        <Flex direction="row" width="100vw"  justifyContent="space-between" background="rgba(15, 55, 56, 0.2)" p="2">
          <Button colorScheme="teal" m="0 0.5em 0 0.5em" onClick={() => screenSend("SETTINGS")}>New game</Button>
          <Button colorScheme="teal" m="0 0.5em 0 0.5em" onClick={() => onResetGame()}>Reset game</Button>
        </Flex>
        <Game state={hanoiState} />
      </Flex>
    </>
  )
}