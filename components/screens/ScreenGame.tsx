import React from 'react'
import { Button, ButtonGroup, Flex, Text, Heading } from "@chakra-ui/react"
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

  // this could return undefined if the FSM wasn't there, but it will be so we !
  const [hanoiState, hanoiSend] = useActor(useScreenInterpreter().children.get('hanoiFSM')!);

  const disks = hanoiState.context.numDisks;
  const pegs = hanoiState.context.numPegs;

  // note that this provides a manner of abstraction in that the actual game
  // component doesn't care what manner of state management we use, it is merely a view

  const selectHandler = () => {
    // call the hanoi send method passing the selected index
    console.log('select handler');
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
      <Flex direction="column" width="100vw" height="100vh" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="space-between" position="relative">
        
        <Flex direction="row" width="100vw" justifyContent="space-between" p="2">
          <Button colorScheme="purple" m="0 0.5em 0 0.5em" onClick={() => screenSend("QUITCHECK")}>Quit</Button>
          <Button colorScheme="teal" m="0 0.5em 0 0.5em" onClick={() => hanoiSend('RESET')}>Restart</Button>
        </Flex>
        <Flex direction="row" width="100vw" justifyContent="center" p="12">
          <Game state={hanoiState.context} selectHandler={selectHandler} />
        </Flex>

        {screenState.matches("game.quitDialog") &&
          <Flex position="absolute" direction="column" width="100vw" height="100vh" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p="12" rounded="6">
              <Flex direction="column" flexWrap="wrap" width="100%" justifyContent="center">
                <Heading as="h2" size="lg" mb={6} mr={3}>Really quit?</Heading>
                <Button colorScheme="teal" mb={6} onClick={() => screenSend({ type: "STAY"})}>Play on</Button>
                <Button colorScheme="purple" onClick={() => screenSend({ type: "QUIT"})}>Quit</Button>
              </Flex>
            </Flex>
          </Flex>
        }
      </Flex>
    </>
  )
}