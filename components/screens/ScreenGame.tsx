import React, { useState, useContext } from 'react'
import { Button, Flex, Heading, ScaleFade, Text } from "@chakra-ui/react"
import { Game } from '../towerofhanoi/Game';
import { XStateContext } from '../../state/screen/ScreenFSMContext';
import { useActor } from '@xstate/react';
import { ImUndo2, ImLoop2, ImCross } from "react-icons/im"
import { MdScreenRotation, MdClear } from "react-icons/md"
import { IconButton } from "@chakra-ui/react";
import { minMovesLookupTable } from '../../utils/hanoi';
import { useGameAudioControl } from '../../utils/sound';
import { useScreenAspect } from '../../utils/hooks/useScreenAspect';
import { ActorRef } from 'xstate'

interface GameInfoProps {
  moves: number;
  minMoves: number;
  showTime: boolean;
  showMoves: boolean;
}

const GameInfo = ({moves, minMoves, showTime, showMoves}: GameInfoProps) => {
  const timeString = showTime ? '12:23' : '';
  const moveString = showMoves ? moves+" ("+minMoves+")":'';
  return (
    <Heading as="h2" size="md" mt={1} mb={1} mr={2} ml={2} alignSelf="flex-end" color="white">{timeString} {moveString}</Heading>
  )
}

export type EmittedFrom<T> = T extends ActorRef<any, infer TEmitted>
  ? TEmitted
  : never;

/**
 * ScreenGame
 */
export const ScreenGame = () => {

  // device rotate notify/dismiss, debounce 250 delay
  const aspect = useScreenAspect(250);
  const [rotateDismissed, setRotateDismissed] = useState(false);

  // State machine handling
  const screenActor:ActorRef<Event, EmittedFrom<T>> = useContext(XStateContext);
  const [hanoiState, hanoiSend] = useActor(screenActor.getSnapshot().children.get('hanoiFSM')!);

  /**
   * read some state values from the state machine
   * we also deduce some "meta state" from fsm state;
   * either this is done here in a component, or one could
   * have another layer of state machine logic, either above (hierarchical)
   * or a separate machine that represents a "different cross section
   * through the state space."
   */
  const disks = hanoiState.context.numDisks;
  const pegs = hanoiState.context.numPegs;
  const tutorialMode = hanoiState.context.showTutorial;
  const gameComplete = hanoiState.matches("gameComplete");
  const numMoves = hanoiState.context.moves.length;
  const midGame = numMoves > 0 && !gameComplete;
  const gameNotStarted = !midGame && !gameComplete;
  const illegalMoveNotice =
    hanoiState.matches("diskSelection.immoveableDiskSelected") ||
    hanoiState.matches("diskSelection.emptyPegSelected") ||
    hanoiState.matches("moveSelection.invalidMoveAttempt");

  // for use when count moves is turned on
  const minMoves = minMovesLookupTable[pegs-3][disks-1];

  // use custom audio hook @todo, make into a little track player, with generic hook behind
  const [stopAudio, gameAudioIcon] = useGameAudioControl(!tutorialMode); // we need to expose a stop control for this for when we exit the game while music is playing

  /**
   * The components that represent the actual game, pegs and disks
   * are not dependent upon xstate, and could use any method of
   * state management. SelectHandler connects Xstate in this implementation.
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
    await stopAudio();
    screenSend({ type: "QUIT"});
  }

  // The following should be normalised with a few obvious structural components
  // @todo normalise
  // @todo DRY the modals
  return (
    <>
      <Flex direction="column" width="100vw" height="100%" alignItems="center" background="linear-gradient(to bottom, transparent, 60%, #222)" position="relative">
        <Flex direction="row" width="100vw" p="2" mb="0" justifyContent="space-between" background="rgba(0, 0, 0, 0.1)" flexGrow={0}>
          <Flex>
            <IconButton
              colorScheme="white"
              aria-label="Quit"
              icon={<ImCross />}
              onClick={() => screenSend("QUITCHECK")}
              alignSelf="flex-start"
              mr="2"
              mb="0"
              background="rgba(0, 0, 0, 0.2)"
            />
            {gameAudioIcon}
          </Flex>
          {tutorialMode &&
            <Heading as="h2" fontSize={{base: "1.2rem", sm: "1.8rem"}} mt={{base: "2", sm: "0"}} mb={0} mr={2} ml={2} color="white" textShadow="0 0 0.4em #0A3839">How to play</Heading>
          }
          {!tutorialMode &&
            <GameInfo
              moves={numMoves}
              minMoves={minMoves}
              showMoves={hanoiState.context.showMoves}
              showTime={hanoiState.context.showTime}
            />
          }
          <Flex>
            <IconButton
              colorScheme="white"
              aria-label="Undo move"
              icon={<ImUndo2 />}
              onClick={() => hanoiSend('UNDO')}
              alignSelf="flex-start"
              mb="0"
              ml="2"
              mr="2"
              isDisabled={!midGame}
              background="rgba(0, 0, 0, 0.2)"
            />
            <IconButton
              colorScheme="white"
              aria-label="Restart game"
              icon={<ImLoop2 />}
              onClick={() => screenSend('RESTARTCHECK')} // this icon is currently only shown when we CAN logically restart, i.e. 
              // midgame - screenFSM doesn't currently check if the game is midgame @todo remove hidden gotcha
              alignSelf="flex-start"
              mb="0"
              isDisabled={!midGame}
              background="rgba(0, 0, 0, 0.2)"
            />
          </Flex>
        </Flex>

        <Flex color="white" mt="0.5" mb="0.5" background="rgba(0, 0, 0, 0.3)" width="100vw">
          {(aspect < 1 && !rotateDismissed) &&
            <>
              <ScaleFade in={true} initialScale={0.1}>
                <Flex flexDirection="row"  alignItems="center" justifyContent="space-between"  width="100vw">
                  <IconButton
                    colorScheme="white"
                    aria-label="Rotate device"
                    icon={<MdScreenRotation />}
                    alignSelf="flex-start"
                    ml="2"
                    mb="0"
                    background="transparent"
                  />
                  <Text>rotate device for best view</Text>
                  <IconButton
                    colorScheme="white"
                    aria-label="Quit"
                    icon={<MdClear />}
                    onClick={() => setRotateDismissed(true) }
                    alignSelf="flex-start"
                    mr="2"
                    mb="0"
                    background="transparent"
                  />
                </Flex>
              </ScaleFade>
            </>
          }
        </Flex>

        {/* one could use a small state machine for the tutorial stages,
            but notice that they are based mostly on extended
            state, rather than the finite states...
        */}
        {tutorialMode &&
          <>
            <ScaleFade in={true} initialScale={0.8}>
              <Flex direction="column" alignItems="left" p="6" pt="3" pb="3" background="rgba(255, 255, 255, 0.8)" flexGrow={0} rounded={8} mr={4} ml={4}>
                <Flex direction="column" alignItems="left" p="3">

                  {(gameNotStarted && hanoiState.matches("diskSelection.awaitSelection")) &&
                    <>
                      <Text mt={1} mb={1} color="black"><strong>Aim: move the tower of disks to the right hands side peg</strong><br />Click/tap the tower to start...</Text>
                    </>
                  }

                  {!illegalMoveNotice &&
                    <>
                      {numMoves === 0 && hanoiState.context.selectedPeg != null &&
                        <Text mt={1} mb={1} color="black"><strong>That&apos;s it</strong>, now tap on a peg to complete the first move...</Text>
                      }

                      {numMoves === 1 && hanoiState.context.selectedPeg === null &&
                        <Text mt={1} mb={1} color="black"><strong>Great!</strong> Now select the next disk to move. <em>You can Undo moves or Restart, with the controls (above right).</em></Text>
                      }

                      {numMoves === 1 && hanoiState.context.selectedPeg != null &&
                        <Text mt={1} mb={1} color="black"><strong>Ok</strong>, where to put it?</Text>
                      }

                      {numMoves === 2 && hanoiState.context.selectedPeg === null &&
                        <Text mt={1} mb={1} color="black"><strong>Cool</strong>. <strong>Here&apos;s a tip</strong>: Think how to move the largest disk to right, and then which disk needs to move to achieve that, and so on...</Text>
                      }

                      {
                        (
                          (numMoves === 2 && hanoiState.context.selectedPeg !== null) ||
                          (numMoves > 2 && !gameComplete)
                        ) &&
                        <Text mt={1} mb={1} color="black">Continue assembling the tower on the right hand peg...</Text>
                      }
                    </>
                  }

                  {hanoiState.matches("diskSelection.immoveableDiskSelected") &&
                    <Text mt={1} mb={1} color="black">This disk has nowhere to go right now. <strong>Choose another disk to move...</strong></Text>
                  }

                  {hanoiState.matches("diskSelection.emptyPegSelected") &&
                    <Text mt={1} mb={1} color="black"><strong>Whoops!</strong> There no disks on this peg...</Text>
                  }

                  {hanoiState.matches("moveSelection.invalidMoveAttempt") &&
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
          </>
        }

        <Flex direction="column" width="100vw" alignItems="center" p="3" mb="auto" flexGrow={1} justifyContent="flex-end">
          <Game state={hanoiState.context} selectHandler={selectHandler} />
        </Flex>

        {screenState.matches("game.quitDialog") &&
          <Flex position="absolute" direction="column" width="100vw" height="calc(var(--vh, 1vh) * 100)" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
              <Flex direction="column" flexWrap="wrap" width="100%" justifyContent="center">
                <Heading as="h2" size="lg" mb={6} mr={3}>{ tutorialMode ? "Quit tutorial?" : "Quit game?" }</Heading>
                <Button colorScheme="purple" mb={3} onClick={() => {
                  handleQuit();
                }}>Quit</Button>
                <Button colorScheme="teal" onClick={() => screenSend({ type: "STAY"})}>{ tutorialMode ? "Continue" : "Play on" }</Button>
              </Flex>
            </Flex>
          </Flex>
        }

        {screenState.matches("game.restartDialog") &&
          <Flex position="absolute" direction="column" width="100vw" height="calc(var(--vh, 1vh) * 100)" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
              <Flex direction="column" flexWrap="wrap" width="100%" justifyContent="center">
                <Heading as="h2" size="lg" mb={6} mr={3}>{ tutorialMode ? "Restart tutorial?" : "Loose progress?" }</Heading>
                <Button colorScheme="blue" mb={3} onClick={() => {hanoiSend({ type: "RESET"}); screenSend({ type: "RESTART"}); }}>Restart</Button>
                <Button colorScheme="teal" onClick={() => screenSend({ type: "CANCEL"})}>{ tutorialMode ? "Continue" : "Play on" }</Button>
              </Flex>
            </Flex>
          </Flex>
        }

        {(gameComplete && !tutorialMode) &&
          <Flex position="absolute" direction="column" width="100vw" height="calc(var(--vh, 1vh) * 100)" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <ScaleFade in={true} initialScale={0.01}>
              <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} m={6} rounded={8}>
                <Flex direction="column" flexWrap="wrap" justifyContent="center">
                  { hanoiState.context.showMoves &&
                    <>
                      { numMoves > minMoves &&
                        <>
                          <Heading as="h1" size="xl" mb={3} flexGrow={1} textAlign="left">Good...</Heading>
                          <Text mb={3} mt={0}>Think how you can complete this with fewer moves.</Text>
                        </>
                      }
                      { numMoves === minMoves &&
                        <>
                          <Heading as="h1" size="xl" mb={3} flexGrow={1} textAlign="center">Well done!</Heading>
                          <Text m={3} mt={0}>You found the optimal solution for the {pegs} peg, {disks} disc setup.
                            {
                              disks < 8 ?
                                <> Try with one more disk.</>
                              :
                                pegs > 3 ?
                                  <> Try with one less peg</>
                                :
                                  <></> // @todo here suggest a timed game
                            }
                          </Text>
                        </>
                      }
                      { numMoves < minMoves &&
                        <>
                          <Heading as="h1" size="xl" mb={3} flexGrow={1} textAlign="center">Wow!</Heading>
                          <Text m={3} mt={0}>You have shown that my minimum moves calculations are wrong, pls get in touch!</Text>
                        </>
                      }
                    </>
                  }

                  { !hanoiState.context.showMoves &&
                    <>
                      <Heading as="h1" size="xl" mb={6} mr={3} flexGrow={1} textAlign="center">Game complete!</Heading>
                    </>
                  }

                  {
                    disks < 8 ?
                      <Button colorScheme="gold" flexGrow={1} mb={3} color="#000" onClick={() => { hanoiSend({ type: "RESETPLUSONEDISK"}); screenSend({ type: "RESTART"}); }}>Play +1 disk</Button>
                    :
                    pegs > 3 ?
                      <Button colorScheme="gold" flexGrow={1} mb={3} color="#000" onClick={() => { hanoiSend({ type: "RESETLESSONEPEG"}); screenSend({ type: "RESTART"}); }}>Play -1 Peg</Button>
                    :
                      <></> // @todo here suggest a timed game...
                  }
                  <Button colorScheme="teal" flexGrow={1} mb={3} onClick={() => { hanoiSend({ type: "RESET"}); screenSend({ type: "RESTART"}); }}>Play again</Button>
                  <Button colorScheme="salmon" flexGrow={1} onClick={() => screenSend({ type: "SETTINGS"})}>Settings</Button>
                </Flex>
              </Flex>
            </ScaleFade>
          </Flex>
        }

      </Flex>
    </>
  )
}
