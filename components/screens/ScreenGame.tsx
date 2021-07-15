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

  // turns out its easier to determine this status here than from inside the FSM
  let midGame = hanoiState.context.moves.length > 0 && !hanoiState.matches("gameComplete");

  const disks = hanoiState.context.numDisks;
  const pegs = hanoiState.context.numPegs;

  const selectHandler = (pegIndex: number) => {
    // call the hanoi send method passing the selected index
    console.log('selectHandler', pegIndex);
    hanoiSend({
      type: "SELECT",
      pegIndex: pegIndex
    })
  }

  /**
   * this could be done in React or within Xstate
   *
   * if in react, we would read the hanoiFSM state and if
   * complete or zero moves, we don't show dialog (or even reset button!)
   *
   * In Xstate we have a condition which reads the state of the synced
   * invoked machine (how to sync an invoked machine) and returns based
   * on that state... we can read both state value and context...
   * so that should work fine and be neater...
   */
  const onResetGame = () => {
    console.log("Implement onResetGame");
    hanoiSend({
      type: "RESET"
    })
  }

  "Game complete, well done!"
  "This peg is empty, select a peg with a moveable disk."
  "The top disk on this peg is currently immoveable."
  "You must place disks on top of larger ones."
  "Move disks to rebuild the tower on the right-hand peg."

  return (
    <>
      <Flex direction="column" width="100vw" height="100%" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="space-between" position="relative">

        <SlideFade in={true} offsetY="-20px">
          <Flex direction="row" width="100vw" justifyContent="space-between" p="2">
            <Button colorScheme="purple" m="0 0.5em 0 0.5em" onClick={() => screenSend("QUITCHECK")}>Menu</Button>
            <Heading as="h2" size="lg" m={3} color="#fff">{hanoiState.context.message}</Heading>
            { midGame &&
              <ScaleFade in={true} initialScale={0.9}>
                <Button colorScheme="purple" m="0 0.5em 0 0.5em" onClick={() => screenSend('RESTARTCHECK')}>Restart</Button>
                <Button colorScheme="salmon" m="0 0.5em 0 0.5em" onClick={() => hanoiSend('UNDO')}>Undo</Button>
              </ScaleFade>
            }
          </Flex>
        </SlideFade>

        <ScaleFade in={true} initialScale={0.5}>
          <Flex direction="column" width="100vw" alignItems="center" p="3" align-self="center">
            <Game state={hanoiState.context} selectHandler={selectHandler} />
          </Flex>
        </ScaleFade>

        {screenState.matches("game.quitDialog") &&
          <Flex position="absolute" direction="column" width="100vw" height="100vh" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
              <Flex direction="column" flexWrap="wrap" width="100%" justifyContent="center">
                <Heading as="h2" size="lg" mb={6} mr={3}>Really quit?</Heading>
                <Button colorScheme="purple" mb={6} onClick={() => screenSend({ type: "QUIT"})}>Quit</Button>
                <Button colorScheme="teal" onClick={() => screenSend({ type: "STAY"})}>Play on</Button>
              </Flex>
            </Flex>
          </Flex>
        }

        {screenState.matches("game.restartDialog") &&
          <Flex position="absolute" direction="column" width="100vw" height="100vh" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
              <Flex direction="column" flexWrap="wrap" width="100%" justifyContent="center">
                <Heading as="h2" size="lg" mb={6} mr={3}>Loose progress?</Heading>
                <Button colorScheme="purple" mb={6} onClick={() => {hanoiSend({ type: "RESET"}); screenSend({ type: "RESTART"}); }}>Restart</Button>
                <Button colorScheme="teal" onClick={() => screenSend({ type: "CANCEL"})}>Play on</Button>
              </Flex>
            </Flex>
          </Flex>
        }

      </Flex>
    </>
  )
}