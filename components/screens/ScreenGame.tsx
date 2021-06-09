import React from 'react'
import { Button, ButtonGroup, Flex, Text } from "@chakra-ui/react"
import { Game } from '../TowerofHanoi/components/Game';
import { useScreenService, useScreenInterpreter } from './fsm/ScreenFSMProvider';
import { useActor } from '@xstate/react';
import { XStateInspectLoaderProps } from 'xstate-helpers';

type CallbackFunction = () => void;



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

  const disks = hanoiState.context.numDisks;
  const pegs = hanoiState.context.numPegs;

  const fn = () => {
    // call the hanoi send method passing the selected index
    console.log('test');
  }

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
      <Flex direction="column" width="100vw" height="100vh" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="space-between">
        <Flex direction="row" width="100vw" justifyContent="space-between" p="2">
          <Button colorScheme="salmon" m="0 0.5em 0 0.5em" onClick={() => screenSend("START")}>Back</Button>
          <Button colorScheme="teal" m="0 0.5em 0 0.5em" onClick={() => hanoiSend('RESET')}>Restart</Button>
        </Flex>
        <Flex direction="row" width="100vw" justifyContent="center" p="12">
          <Game state={hanoiState.context} selectHandler={fn} />
        </Flex>
      </Flex>
    </>
  )
}