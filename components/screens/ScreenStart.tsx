import React from 'react'
import { Button, Heading, Input } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box
} from "@chakra-ui/react"

export const ScreenStart = ({ onPlay: object }) => {

  // figure out how to get the value of the slider

  return (
    <>
      <Heading mb={6}>Choose puzzle setup:</Heading>


      <Slider aria-label="Number of disks" defaultValue={60} min={3} max={5} step={1}>
      <SliderTrack bg="blue.100">
        <Box position="relative" right={10} />
        <SliderFilledTrack bg="blue" />
      </SliderTrack>
      <SliderThumb boxSize={6} />
      </Slider>
      
      <Input placeholder="5" variant="filled" mb={6} type="number" />
      
      <Button colorScheme="orange" onClick={() => onPlay()}>Play</Button>
    </>
  )
}
