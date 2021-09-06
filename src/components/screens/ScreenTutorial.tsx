import React, { useContext } from 'react';
import { Button, Flex, Heading, ScaleFade, Text } from "@chakra-ui/react"
import { Game } from '../towerofhanoi/Game';
import { XStateContext } from './ScreenWrapper';
import { useSelector } from '@xstate/react';
import { minMovesLookupTable } from '../../utils/hanoiData';
import { useGameAudioControl } from '../../utils/sound';
import { Interpreter } from 'xstate';
import { HanoiEvent, HanoiContext } from '../../state/hanoi/types/hanoiFSMTypes';
import { GameHeader } from './game/gameHeader';

/**
 * ScreenGame
 */
export const ScreenTutorial = () => {

  console.log("ScreenTutorial");

  // State machine handling
  const screenActor = useContext(XStateContext);
  const { send: screenSend } = screenActor;
  // hanoi is the child of screen and invoked within it @see /state/screen/screenFSM.txt
  const hanoiActor = screenActor.children.get('hanoiFSM') as Interpreter<HanoiContext, any, HanoiEvent>;
  const { send: hanoiSend } = hanoiActor;

  /**
   * read some state values from the state machine
   * we also deduce some "meta state" from fsm state;
   * either this is done here in a component, or one could
   * have another layer of state machine logic, either above (hierarchical)
   * or a separate machine that represents a "different cross section
   * through the state space."
   */
  const disks:number = useSelector(hanoiActor, (state) => (state.context.numDisks));
  const pegs:number = useSelector(hanoiActor, (state) => (state.context.numPegs));
  const minMoves:number = minMovesLookupTable[pegs-3][disks-1];
  const numMoves:number = useSelector(hanoiActor, (state) => (state.context.moves.length));

  const showMoves:boolean = useSelector(hanoiActor, (state) => (state.context.showMoves));
  const showTime:boolean = useSelector(hanoiActor, (state) => (state.context.showTime));

  const gameComplete = useSelector(hanoiActor, (state) => (state.matches("gameComplete")));
  const midGame = numMoves > 0 && !gameComplete;
  const gameNotStarted = !midGame && !gameComplete;
  const awaitSelection = useSelector(hanoiActor, (state) => (state.matches("diskSelection.awaitSelection")));
  const immoveableDiskSelected = useSelector(hanoiActor, (state) => (state.matches("diskSelection.immoveableDiskSelected")));
  const emptyPegSelected = useSelector(hanoiActor, (state) => (state.matches("diskSelection.emptyPegSelected")));
  const invalidMoveAttempt = useSelector(hanoiActor, (state) => (state.matches("diskSelection.invalidMoveAttempt")));
  const illegalMoveNotice = immoveableDiskSelected || emptyPegSelected || invalidMoveAttempt;

  const quitDialog = useSelector(screenActor, (state) => (state.matches("tutorial.quitDialog")));
  const restartDialog = useSelector(screenActor, (state) => (state.matches("tutorial.restartDialog")));

  const selectedPeg = useSelector(hanoiActor, (state) => (state.context.selectedPeg));
  const gameboard:number[][] = useSelector(hanoiActor, (state) => (state.context.gameBoard)); //@todo might need to assign type

  // use custom audio hook @todo, make into a little track player, with generic hook behind
  const [stopAudio, gameAudioIcon] = useGameAudioControl(); // we need to expose a stop control for this for when we exit the game while music is playing

  /**
   * The components that represent the actual game, pegs and disks
   * are not dependent upon xstate, and could use any method of
   * state management.
   *
   * SelectHandler is the only causal connection between the game components
   * and XState.
   *
   * It is the only event we need from the actual game board components:
   * pegs and disks and from that we know which peg has been clicked/tapped
   *
   * @param pegIndex
   */
  const selectHandler = (pegIndex: number) => {
    hanoiSend({
      type: "SELECT",
      pegIndex: pegIndex
    })
  }

  // using useeffect here didn't work
  const handleQuit = async () => {
    stopAudio();
    screenSend({ type: "QUIT" });
  }

  // @todo DRY the modals
  return (
    <>
      <Flex direction="column" width="100vw" height="100%" alignItems="center" background="linear-gradient(to bottom, transparent, 60%, #222)" position="relative">
        <GameHeader
          screenSend={screenSend}
          hanoiSend={hanoiSend}
          gameInfo={{ numMoves, minMoves, showMoves, showTime }}
          tutorialMode={true}
          midGame={midGame}
          gameAudioIcon={gameAudioIcon}
        />
        <ScaleFade in={true} initialScale={0.8}>
          <Flex direction="column" alignItems="left" p="6" pt="3" pb="3" background="rgba(255, 255, 255, 0.8)" flexGrow={0} rounded={8} mr={4} ml={4}>
            <Flex direction="column" alignItems="left" p="3">

              {(gameNotStarted && awaitSelection) &&
                <>
                  <Text mt={1} mb={1} color="black"><strong>Aim: move the tower of disks to the right hands side peg</strong><br />Click/tap the tower to start...</Text>
                </>
              }

              {!illegalMoveNotice &&
                <>
                  {numMoves === 0 && selectedPeg != null &&
                    <Text mt={1} mb={1} color="black"><strong>That&apos;s it</strong>, now tap on a peg to complete the first move...</Text>
                  }

                  {numMoves === 1 && selectedPeg === null &&
                    <Text mt={1} mb={1} color="black"><strong>Great!</strong> Now select the next disk to move. <em>You can Undo moves or Restart, with the controls (above right).</em></Text>
                  }

                  {numMoves === 1 && selectedPeg != null &&
                    <Text mt={1} mb={1} color="black"><strong>Ok</strong>, where to put it?</Text>
                  }

                  {numMoves === 2 && selectedPeg === null &&
                    <Text mt={1} mb={1} color="black"><strong>Cool</strong>. <strong>Here&apos;s a tip</strong>: Think how to move the largest disk to right, and then which disk needs to move to achieve that, and so on...</Text>
                  }

                  {
                    (
                      (numMoves === 2 && selectedPeg !== null) ||
                      (numMoves > 2 && !gameComplete)
                    ) &&
                    <Text mt={1} mb={1} color="black">Continue assembling the tower on the right hand peg...</Text>
                  }
                </>
              }

              {immoveableDiskSelected &&
                <Text mt={1} mb={1} color="black">This disk has nowhere to go right now. <strong>Choose another disk to move...</strong></Text>
              }

              {emptyPegSelected &&
                <Text mt={1} mb={1} color="black"><strong>Whoops!</strong> There no disks on this peg...</Text>
              }

              {invalidMoveAttempt &&
                <Text mt={1} mb={1} color="black">You can&apos;t place a bigger disk on top of a smaller, that would be too easy! <strong>Choose another peg...</strong></Text>
              }

            </Flex>
          </Flex>
        </ScaleFade>

        {gameComplete &&
          <>
            <Flex position="absolute" direction="column" width="100vw" height="calc(var(--vh, 1vh) * 100)" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
              <ScaleFade in={true} initialScale={0.01}>
                <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} m={6} rounded={8}>
                  <Heading as="h1" size="xl" mb={3} mr={3} flexGrow={1} textAlign="left">Well done!</Heading>
                  <Text mt={1} mb={6} color="black">Now you are ready to try with more disks! Check out game settings for other interesting options...</Text>
                  <Flex direction="row" flexWrap="wrap" justifyContent="space-between">
                    <Button size="md" textShadow="0px 0px 10px #fff" mr={2} flexGrow={1} flexBasis={0} minWidth="60px" colorScheme="teal" color="#000" onClick={ () => screenSend({ type: 'PLAY' }) }>Play</Button>
                    <Button size="md" textShadow="0px 0px 10px #fff" mr={2} flexGrow={1} flexBasis={0} minWidth="60px" colorScheme="salmon" color="#000" onClick={ () => screenSend({ type: 'SETTINGS' }) }>Settings</Button>
                    <Button size="md" textShadow="0px 0px 10px #fff" flexGrow={1} flexBasis={0} minWidth="60px" colorScheme="purple" color="#000" onClick={() => { handleQuit() }}>Quit</Button>
                  </Flex>
                </Flex>
              </ScaleFade>
            </Flex>
          </>
        }

        <Flex direction="column" width="100vw" alignItems="center" p="3" mb="auto" flexGrow={1} justifyContent="flex-end">
          <Game gameBoard={gameboard} selectedPeg={selectedPeg} selectHandler={selectHandler} />
        </Flex>

        {quitDialog &&
          <Flex position="absolute" direction="column" width="100vw" height="calc(var(--vh, 1vh) * 100)" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
              <Flex direction="column" flexWrap="wrap" width="100%" justifyContent="center">
                <Heading as="h2" size="lg" mb={6} mr={3}>Quit tutorial?</Heading>
                <Button colorScheme="purple" mb={3} onClick={() => { handleQuit(); }}>Quit</Button>
                <Button colorScheme="teal" onClick={() => screenSend({ type: "STAY" })}>Continue</Button>
              </Flex>
            </Flex>
          </Flex>
        }

        {restartDialog &&
          <Flex position="absolute" direction="column" width="100vw" height="calc(var(--vh, 1vh) * 100)" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
              <Flex direction="column" flexWrap="wrap" width="100%" justifyContent="center">
                <Heading as="h2" size="lg" mb={6} mr={3}>Restart tutorial?</Heading>
                <Button colorScheme="blue" mb={3} onClick={() => { hanoiSend({ type: "RESET"}); screenSend({ type: "RESTARTCONFIRM"}); }}>Restart</Button>
                <Button colorScheme="teal" onClick={() => screenSend({ type: "CANCEL"})}>Continue</Button>
              </Flex>
            </Flex>
          </Flex>
        }

      </Flex>
    </>
  )
}
