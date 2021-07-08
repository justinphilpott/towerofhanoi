import React, { useState } from 'react'
import { Button, Heading, Input } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Box,
  Flex,
  ButtonGroup,
  SlideFade
} from "@chakra-ui/react"
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useScreenService } from './fsm/ScreenFSMProvider';

export const ScreenSettings = () => {

  const [screenState, screenSend] = useScreenService();

  // need to read the disks and pegs data from the FSM
  const [numPegs, setNumPegs] = useState(screenState.context.numPegs);
  const [numDisks, setNumDisks] = useState(screenState.context.numDisks);
  const maxDisks = 7;

  const minMovesLookupTable: number[][] = [
    [1,3,7,15,31,63,127,255,511,1023],
    [1,3,5,9,13,17,25,33,45,57],
    [1,3,5,7,11,15,19,23,27,31]
  ]

  // minmoves will change potentially rapidly on element drag
  // therefore don't calc, perform a simple lookup - the
  // data space is small for our game scope
  let minMoves = minMovesLookupTable[numPegs-3][numDisks-1];

  return (
    <Flex direction="column" width="100vw" background="rgba(255, 255, 255, 0.9)" p="12" rounded="6">

      <Flex direction="row" flexWrap="wrap" width="100%" justifyContent="space-between">
        <Heading as="h2" size="lg" mb={6} mr={3}>Settings</Heading>
        <Text mr={3}>
          Min. number of moves: <strong>{minMoves}</strong>
        </Text>
      </Flex>

      <Flex direction="row" flexWrap="wrap" width="100%" mt={3}>
        <Flex direction="column" flexGrow={1} minWidth="200">
          <Text>Pegs</Text>
          <Box ml={6} mr={6}>
          <Slider value={numPegs} onChange={(v) => setNumPegs(v)} defaultValue={numPegs} mb={6} min={3} max={5}>
            <SliderTrack>
              <SliderFilledTrack bg="teal.400" />
            </SliderTrack>
            <SliderThumb fontSize="sm" boxSize="32px" children={numPegs} />
          </Slider>
          </Box>
        </Flex>

        <Flex direction="column" flexGrow={1} minWidth="200">
          <Text>Disks</Text>
          <Box ml={6} mr={6}>
          <Slider value={numDisks} onChange={(v) => setNumDisks(v)} defaultValue={numDisks} mb={6} min={1} max={maxDisks}>
            <SliderTrack>
              <SliderFilledTrack bg="teal.400" />
            </SliderTrack>
            <SliderThumb boxShadow="teal.400" fontSize="sm" boxSize="32px" children={numDisks} />
          </Slider>
          </Box>
        </Flex>
      </Flex>

      <Flex direction="row">
        <Button colorScheme="purple" onClick={() => screenSend({ type: "SAVE", numPegs: numPegs, numDisks: numDisks })}>Done</Button>
      </Flex>

    </Flex>
  )
}