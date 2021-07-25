import React from 'react'
import { Button, Flex, Heading, ScaleFade, SlideFade, Text } from "@chakra-ui/react"
import { Game } from '../TowerofHanoi/components/Game';
import { useScreenService, useScreenInterpreter } from './fsm/ScreenFSMProvider';
import { useActor } from '@xstate/react';
import { RepeatIcon, CloseIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { IconButton } from "@chakra-ui/react";
import { minMovesLookupTable } from '../TowerofHanoi/utils/hanoi';
import { useGameAudioControl } from '../TowerofHanoi/utils/sound';

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


/**
 * ScreenGame
 * 
 * @returns JSX
 */
export const ScreenGame = () => {

  const [screenState, screenSend] = useScreenService();
  const [hanoiState, hanoiSend] = useActor(useScreenInterpreter().children.get('hanoiFSM')!);

  // use game audio hook
  const [stopAudio, gameAudioIcon] = useGameAudioControl();

  let gameComplete = hanoiState.matches("gameComplete");

  // turns out its easier to determine this status here than from inside the FSM
  let midGame = hanoiState.context.moves.length > 0 && !gameComplete;

  const disks = hanoiState.context.numDisks;
  const pegs = hanoiState.context.numPegs;

  const minMoves = minMovesLookupTable[pegs-3][disks-1];

  /**
   * The components that represent the actual game, pegs and disks
   * are not dependent upon xstate, and could use any method of
   * state management. SelectHandler connects Xstate in this implementation.
   *
   * @param pegIndex
   */
  const selectHandler = (pegIndex: number) => {

    // call the hanoi send method passing the selected peg index
    hanoiSend({
      type: "SELECT",
      pegIndex: pegIndex
    })
  }


  /**
   * toggleAudio requires the component below to still be rendered in order to access
   * the audio player, so make this async and wait for the audio off process to complete
   */
  const handleQuit = async () => {
    await stopAudio();
    screenSend({ type: "QUIT"});
  }

  return (
    <>
      <Flex direction="column" width="100vw" height="100%" alignItems="center" background="linear-gradient(to bottom, transparent, 60%, #222)" justifyContent="space-between" position="relative">

        <SlideFade in={true} offsetY="-20px">
          <Flex direction="row" width="100vw" p="2" mb="0" justifyContent="space-between" background="rgba(0, 0, 0, 0.1)">
            <Flex>
              <IconButton
                colorScheme="white"
                aria-label="Quit"
                icon={<CloseIcon />}
                onClick={() => screenSend("QUITCHECK")}
                alignSelf="flex-start"
                mr="2"
                mb="0"
                background="rgba(0, 0, 0, 0.2)"
              />
              {gameAudioIcon}
            </Flex>
            <GameInfo
              moves={hanoiState.context.moves.length}
              minMoves={minMoves}
              showMoves={hanoiState.context.showMoves}
              showTime={hanoiState.context.showTime}
            />
            <Flex>
              <IconButton
                colorScheme="white"
                aria-label="Undo move"
                icon={<ChevronLeftIcon />}
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
                icon={<RepeatIcon />}
                onClick={() => screenSend('RESTARTCHECK')}
                alignSelf="flex-start"
                mb="0"
                isDisabled={!midGame}
                background="rgba(0, 0, 0, 0.2)"
              />
            </Flex>

          </Flex>
        </SlideFade>

        <ScaleFade in={true} initialScale={0.5}>
          <Flex direction="column" width="100vw" alignItems="center" p="3" align-self="center">
            <Game state={hanoiState.context} selectHandler={selectHandler} />
          </Flex>
        </ScaleFade>

        {screenState.matches("game.quitDialog") &&
          <Flex position="absolute" direction="column" width="100vw" height="calc(var(--vh, 1vh) * 100)" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
              <Flex direction="column" flexWrap="wrap" width="100%" justifyContent="center">
                <Heading as="h2" size="lg" mb={6} mr={3}>Really quit?</Heading>
                <Button colorScheme="purple" mb={3} onClick={() => {
                  handleQuit();
                }}>Quit</Button>
                <Button colorScheme="teal" onClick={() => screenSend({ type: "STAY"})}>Play on</Button>
              </Flex>
            </Flex>
          </Flex>
        }

        {screenState.matches("game.restartDialog") &&
          <Flex position="absolute" direction="column" width="100vw" height="calc(var(--vh, 1vh) * 100)" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
              <Flex direction="column" flexWrap="wrap" width="100%" justifyContent="center">
                <Heading as="h2" size="lg" mb={6} mr={3}>Loose progress?</Heading>
                <Button colorScheme="blue" mb={3} onClick={() => {hanoiSend({ type: "RESET"}); screenSend({ type: "RESTART"}); }}>Restart</Button>
                <Button colorScheme="teal" onClick={() => screenSend({ type: "CANCEL"})}>Play on</Button>
              </Flex>
            </Flex>
          </Flex>
        }

        {gameComplete &&
          <Flex position="absolute" direction="column" width="100vw" height="calc(var(--vh, 1vh) * 100)" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <ScaleFade in={true} initialScale={0.01}>
              <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} m={6} rounded={8}>
                <Flex direction="column" flexWrap="wrap" justifyContent="center">
                  { hanoiState.context.showMoves &&
                    <>
                      { hanoiState.context.moves.length > minMoves &&
                        <>
                          <Heading as="h1" size="xl" m={3} flexGrow={1} textAlign="center">Not bad...</Heading>
                          <Text m={3} mt={0}>Think how you can complete this with fewer moves.</Text>
                        </>
                      }
                      { hanoiState.context.moves.length === minMoves &&
                        <>
                          <Heading as="h1" size="xl" m={3} flexGrow={1} textAlign="center">Well done!</Heading>
                          <Text m={3} mt={0}>You found the optimal solution for the {pegs} peg, {disks} disc setup. Try with one more disk.</Text>
                        </>
                      }
                      { hanoiState.context.moves.length < minMoves &&
                        <>
                          <Heading as="h1" size="xl" m={3} flexGrow={1} textAlign="center">Wow!</Heading>
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

                  <Button colorScheme="teal" flexGrow={1} mb={3} onClick={() => {hanoiSend({ type: "RESET"}); screenSend({ type: "RESTART"}); }}>Play again</Button>
                  <Button colorScheme="gold" flexGrow={1} mb={3} color="#000" onClick={() => { hanoiSend({ type: "RESETPLUSONE"}); screenSend({ type: "RESTART"}); }}>Play +1 disk</Button>
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


const completeDialog = () => {

}