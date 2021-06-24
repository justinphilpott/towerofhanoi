import React from 'react'
import { Button, ButtonGroup, Flex, Text, Heading, ScaleFade, SlideFade } from "@chakra-ui/react"
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

  const selectHandler = (pegIndex: number) => {
    // call the hanoi send method passing the selected index
    console.log('selectHandler', pegIndex);
    hanoiSend({
      type: "SELECT",
      pegIndex: pegIndex
    })
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
        
      <SlideFade in={true} offsetY="-20px">
        <Flex direction="row" width="100vw" justifyContent="space-between" p="2">
          <Button colorScheme="purple" m="0 0.5em 0 0.5em" onClick={() => screenSend("QUITCHECK")}>Quit</Button>
          {/*<Button colorScheme="salmon" m="0 0.5em 0 0.5em" onClick={() => hanoiSend('RESET')}>Restart</Button>*/}
          <Button colorScheme="teal" m="0 0.5em 0 0.5em" onClick={() => hanoiSend('RESET')}>Restart</Button>
        </Flex>
      </SlideFade>

      <ScaleFade in={true} initialScale={0.5}>
        <Flex direction="column" width="100vw" alignItems="center" p="3">
          <Game state={hanoiState.context} selectHandler={selectHandler} />
        </Flex>
      </ScaleFade>

        {screenState.matches("game.quitDialog") &&
          <Flex position="absolute" direction="column" width="100vw" height="100vh" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
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