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

export const ScreenStart = ({ onPlay }:{ onPlay:any } ) => {

  const [numPegs, setNumPegs] = useState(3);
  const [numDisks, setNumDisks] = useState(5);

  let minMoves = (pegs:number, disks:number) => {
    if(pegs === 3) return (Math.pow(2, numDisks)-1);
    // trivial case
    if(disks < pegs) return 2*disks-1;

    // @todo FS algorithm or something like that for 4 pegs and 4 or more disks
  }

  return (
    <Flex direction="column" background="rgba(255, 255, 255, 0.9)" p="12" rounded="6" boxShadow="md">

      <Heading as="h1" size="lg" mb={6}>The Tower of Hanoi</Heading>
      <Heading as="h2" size="md" mb={6}>Choose puzzle setup:</Heading>

      <Text>Pegs</Text>
      <Box ml={3} mr={3}>
      <Slider value={numPegs} onChange={(v) => setNumPegs(v)} defaultValue={numPegs} mb={6} min={2} max={5}>
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
        {numPegs === 2 && (numDisks === 1 ? "Number of moves: 1" : "Impossible.")}
        {numPegs === 3 && (numDisks === 1 ? "Number of moves: 1" : "Min. number of moves: " + (minMoves(3, numDisks)))}
        {numPegs > 3 && ("Min. number of moves:" + (minMoves(numPegs, numDisks)))}
      </Text>
      </Box>

      <Button colorScheme="teal" onClick={() => onPlay(numDisks, numPegs)}>Play</Button>
    </Flex>
  )
}