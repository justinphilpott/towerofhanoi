import React, { useState } from 'react'
import { Button, Heading, Input } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Box,
  Flex
} from "@chakra-ui/react"
import  { useScreenSend } from './fsm/ScreenFSMProvider';

export const ScreenStart = () => {

  const send = useScreenSend();

  // could use an event with a assign to update these figures... is it worth it?
  const [numPegs, setNumPegs] = useState(3);
  const [numDisks, setNumDisks] = useState(5);

  const minMovesLookupTable = [
    [1,3,7,15,31,63,127,255,511,1023],
    [1,3,5,9,13,17,25,33,45,57],
    [1,3,5,7,11,15,19,23,27,31]
  ]
  // minmoves will change potentially rapidly on element drag
  // therefore don't calc, perform a simple lookup - the
  // data space is small for our game scope
  let minMoves = (pegs:number, disks:number) => minMovesLookupTable[pegs-3][disks-1];

  return (
    <Flex direction="column" background="rgba(255, 255, 255, 0.9)" p="12" rounded="6" boxShadow="md">

      <Heading as="h1" size="lg" mb={6}>The Tower of Hanoi</Heading>
      <Heading as="h2" size="md" mb={6}>Choose game setup:</Heading>

      <Text>Pegs</Text>
      <Box ml={3} mr={3}>
      <Slider value={numPegs} onChange={(v) => setNumPegs(v)} defaultValue={numPegs} mb={6} min={3} max={5}>
        <SliderTrack>
          <SliderFilledTrack bg="teal.400" />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" children={numPegs} />
      </Slider>
      </Box>

      <Text>Disks</Text>
      <Box ml={3} mr={3}>
      <Slider value={numDisks} onChange={(v) => setNumDisks(v)} defaultValue={numDisks} mb={6} min={1} max={10}>
        <SliderTrack>
          <SliderFilledTrack bg="teal.400" />
        </SliderTrack>
        <SliderThumb boxShadow="teal.400" fontSize="sm" boxSize="32px" children={numDisks} />
      </Slider>
      <Text mb={6}>
        {("Min. number of moves: " + (minMoves(numPegs, numDisks)))}
      </Text>
      </Box>

      <Button colorScheme="teal" onClick={() => send({ type: "PLAY", "numDisks": numDisks, "numPegs": numPegs })}>Play</Button>
    </Flex>
  )
}