import React from 'react'
import { Flex, Heading, IconButton } from "@chakra-ui/react"
import { ImUndo2, ImLoop2, ImCross } from "react-icons/im"
import { Sender } from 'xstate';
import { HanoiEvent } from '../../../state/hanoi/types/hanoiFSMTypes'
import { ScreenEvent } from '../../../state/screen/types/screenFSMTypes'
import { AspectNotify } from '../game/aspectNotifiy'

interface GameInfoProps {
  moves: number;
  minMoves: number;
  showTime: boolean;
  showMoves: boolean;
}

interface GameHeaderProps {
  hanoiSend: Sender<HanoiEvent>,
  screenSend: Sender<ScreenEvent>,
  gameInfo: any,
  tutorialMode: Boolean,
  midGame: Boolean,
  // eslint-disable-next-line no-undef
  gameAudioIcon: JSX.Element
}

const GameInfo = ({moves, minMoves, showTime, showMoves}: GameInfoProps) => {
  const timeString = showTime ? '12:23' : '';
  const moveString = showMoves ? moves+" ("+minMoves+")":'';
  return (
    <Heading as="h2" size="md" mt={1} mb={1} mr={2} ml={2} alignSelf="flex-end" color="white">{timeString} {moveString}</Heading>
  )
}

export const GameHeader = ({hanoiSend, screenSend, gameInfo, tutorialMode, midGame, gameAudioIcon }: GameHeaderProps) => {

  const { numMoves, minMoves, showMoves, showTime } = gameInfo;

  return (
    <>
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
            showMoves={showMoves}
            showTime={showTime}
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
      <AspectNotify />
    </>
  )
}