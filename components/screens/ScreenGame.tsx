import React from 'react'
import { Button, Flex, Heading, ScaleFade, SlideFade, Text } from "@chakra-ui/react"
import { Game } from '../TowerofHanoi/components/Game';
import { useScreenService, useScreenInterpreter } from './fsm/ScreenFSMProvider';
import { useActor } from '@xstate/react';
import { RepeatIcon, CloseIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { IconButton } from "@chakra-ui/react"
import { minMovesLookupTable } from '../TowerofHanoi/utils/hanoi';

export interface GameInfoProps {
  moves: number;
  minMoves: number;
  showMoves: boolean;
  showTimer: boolean;
}

export const GameInfo = ({moves, minMoves, showTimer, showMoves}: GameInfoProps) => {

  const moveString = showMoves ? moves+" ("+minMoves+")":'';
  const timeString = showTimer ? '12:23' : '';

  return (
    <Heading as="h2" size="lg" mt={1} mb={1} mr={2} ml={2} alignSelf="flex-end" color="white">{timeString}  {moveString}</Heading>
  )
}

/**
 * ScreenGame
 * 
 * @returns JSX
 */
export const ScreenGame = () => {

  const [screenState, screenSend] = useScreenService();

  // this could return undefined if the FSM wasn't there, but it will be so we !
  const [hanoiState, hanoiSend] = useActor(useScreenInterpreter().children.get('hanoiFSM')!);

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
    // call the hanoi send method passing the selected index
    hanoiSend({
      type: "SELECT",
      pegIndex: pegIndex
    })
  }

  return (
    <>
      <Flex direction="column" width="100vw" height="100%" alignItems="center" background="rgba(0, 0, 0, 0.4)" justifyContent="space-between" position="relative">

        <SlideFade in={true} offsetY="-20px">
          <Flex direction="row" width="100vw" p="2" mb="0" justifyContent="space-between">
            <IconButton
              colorScheme="purple"
              aria-label="Back"
              icon={<CloseIcon />}
              onClick={() => screenSend("QUITCHECK")}
              alignSelf="flex-start"
              mr="12"
              mb="0"
            />
            <GameInfo moves={hanoiState.context.moves.length} minMoves={minMoves} showMoves={hanoiState.context.showMoves} showTimer={hanoiState.context.showMoves} />

            <Flex>
              <IconButton
                colorScheme="blue"
                aria-label="Back"
                icon={<ChevronLeftIcon />}
                onClick={() => hanoiSend('UNDO')}
                alignSelf="flex-start"
                mb="0"
                mr="8px"
                isDisabled={!midGame}
              />
              <IconButton
                colorScheme="teal"
                aria-label="Back"
                icon={<RepeatIcon />}
                onClick={() => screenSend('RESTARTCHECK')}
                alignSelf="flex-start"
                mb="0"
                isDisabled={!midGame}
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
                <Button colorScheme="purple" mb={6} onClick={() => screenSend({ type: "QUIT"})}>Quit</Button>
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
                <Button colorScheme="blue" mb={6} onClick={() => {hanoiSend({ type: "RESET"}); screenSend({ type: "RESTART"}); }}>Restart</Button>
                <Button colorScheme="teal" onClick={() => screenSend({ type: "CANCEL"})}>Play on</Button>
              </Flex>
            </Flex>
          </Flex>
        }

        {gameComplete &&
          <Flex position="absolute" direction="column" width="100vw" height="calc(var(--vh, 1vh) * 100)" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <ScaleFade in={true} initialScale={0.01}>
              <Flex direction="column" width="400px" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
                <Heading as="h1" size="xl" mb={6} mr={3} flexGrow={1} textAlign="center">Well Done!</Heading>
                <Text>?</Text>

                <Heading as="h1" size="xl" mb={6} mr={3} flexGrow={1} textAlign="center">Not bad...</Heading>
                <Text>Think how you can complete this with fewer moves.</Text>


                <Flex direction="row" flexWrap="wrap" width="100%" justifyContent="center">
                  <Button colorScheme="teal" flexGrow={1} mb={6} onClick={() => {hanoiSend({ type: "RESET"}); screenSend({ type: "RESTART"}); }}>Play again</Button>
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