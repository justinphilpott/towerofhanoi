import React, { useState } from 'react'
import { Button, Heading, Input } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react"


export const ScreenStart = ({ onPlay: object }) => {

  const [numPegs, setNumPegs] = useState(3);
  const [numDisks, setNumDisks] = useState(5);

  return (
    <>
      <Heading as="h1" size="lg" mb={6}>The Tower of Hanoi</Heading>
      <Heading as="h2" size="md" mb={6}>Choose puzzle setup:</Heading>

      <Slider value={numPegs} onChange={(v) => setNumPegs(v)} defaultValue={numPegs} mb={6} min={3} max={5} step={1}>
        <SliderTrack>
          <SliderFilledTrack bg="teal.400" />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" children={numPegs} />
      </Slider>

      <Slider value={numDisks} onChange={(v) => setNumDisks(v)} defaultValue={numDisks} mb={6} min={1} max={7} step={1}>
        <SliderTrack>
          <SliderFilledTrack bg="teal.400" />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" children={numDisks} />
      </Slider>


    <Button colorScheme="teal" onClick={() => onPlay()}>Play</Button>
     </> 
  )
}