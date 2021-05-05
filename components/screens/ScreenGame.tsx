import React from 'react'
import { Button, Heading, Input } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box
} from "@chakra-ui/react"

export const ScreenGame = ({ onPlay: object }) => {

  // figure out how to get the value of the slider

  const onResetPuzzle = () => {

  }

  return (
    <>
      <Heading mb={6}>Game:</Heading>
      <Button colorScheme="orange" onClick={() => onNewGame()}>Reset Puzzle</Button>
      <Button colorScheme="orange" onClick={() => onResetPuzzle()}>Reset Puzzle</Button>
    </>
  )
}
