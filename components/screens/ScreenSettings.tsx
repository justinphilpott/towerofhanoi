import React, { useState, useContext } from 'react'
import {
  Button,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Box,
  Flex,
  Switch,
  FormControl,
  FormLabel
} from "@chakra-ui/react"
import { XStateContext } from './ScreenWrapper';
import { minMovesLookupTable } from '../../utils/hanoiData';
import { EmittedFrom } from '../../state/screen/types/screenFSMTypes';
import { useSelector } from '@xstate/react';


export const ScreenSettings = () => {

  const screenActor = useContext(XStateContext);
  const { send: screenSend } = screenActor;

  const [numPegs, setNumPegs] = useState(
    useSelector(screenActor, (state: EmittedFrom<typeof screenActor>) => (state.context.numPegs))
  );
  const [numDisks, setNumDisks] = useState(
    useSelector(screenActor, (state: EmittedFrom<typeof screenActor>) => (state.context.numDisks))
  );
  const [showTime, setShowTime] = useState(
    useSelector(screenActor, (state: EmittedFrom<typeof screenActor>) => (state.context.showTime))
  );
  const [showMoves, setShowMoves] = useState(
    useSelector(screenActor, (state: EmittedFrom<typeof screenActor>) => (state.context.showMoves))
  );

  const maxDisks = 8;

  const minMoves = minMovesLookupTable[numPegs-3][numDisks-1];

  return (
    <Flex direction="column" width="100vw" maxWidth="1200px" background="rgba(255, 255, 255, 0.9)" p="6" rounded="6">

      <Flex direction="row" flexWrap="wrap" width="100%" justifyContent="space-between">
        <Heading as="h2" size="lg" mb={6} mr={3}>Settings</Heading>
        <Text mr={3} mt={1} flexGrow={1} textAlign="right">
          Minimum moves: <strong>{minMoves}</strong>
        </Text>
      </Flex>

      <Flex direction="row" flexWrap="wrap" width="100%" mt={2}>
        <Flex direction="column" flexGrow={1} minWidth="200">
          <Box ml={6} mr={6}>
            <Text flexGrow={1} textAlign="left">Pegs</Text>
            <Slider value={numPegs} onChange={(v) => setNumPegs(v)} defaultValue={numPegs} mb={3} min={3} max={5}>
              <SliderTrack>
                <SliderFilledTrack bg="teal.400" />
              </SliderTrack>
              <SliderThumb boxShadow="teal.400" fontSize="sm" boxSize="32px">
                {numPegs}
              </SliderThumb>
            </Slider>
          </Box>
        </Flex>

        <Flex direction="column" flexGrow={1} minWidth="200">
          <Box ml={6} mr={6}>
            <Text flexGrow={1} textAlign="left">Disks</Text>
            <Slider value={numDisks} onChange={(v) => setNumDisks(v)} defaultValue={numDisks} mb={3} min={1} max={maxDisks}>
              <SliderTrack>
                <SliderFilledTrack bg="teal.400" />
              </SliderTrack>
              <SliderThumb boxShadow="teal.400" fontSize="sm" boxSize="32px">
                {numDisks}
              </SliderThumb>
            </Slider>
          </Box>
        </Flex>
      </Flex>

      <Flex direction="row" flexWrap="wrap" width="100%" mb={6}>
        <Flex direction="column" flexGrow={1} minWidth="200">
          <Box ml={6} mr={6}>
            <FormControl display="flex" justifyContent="space-between" flexGrow={1} alignItems="center">
              <FormLabel htmlFor="show-moves" mb="0">
                Count moves
              </FormLabel>
              <Switch colorScheme="teal" size="lg" id="show-moves"
                isChecked={showMoves}
                onChange={(e) => setShowMoves(e.target.checked)}
              />
            </FormControl>
          </Box>
        </Flex>

        <Flex direction="column" flexGrow={1} minWidth="200">
          <Box ml={6} mr={6}>
            <FormControl display="flex" justifyContent="space-between" flexGrow={1} alignItems="center">
              <FormLabel htmlFor="show-timer" mb="0" color="grey">
              Timed games (soon!)
              </FormLabel>
              <Switch colorScheme="teal" size="lg" id="show-timer"
                isChecked={showTime}
                isDisabled={true}
                onChange={(e) => setShowTime(e.target.checked)}
              />
            </FormControl>
          </Box>
        </Flex>
      </Flex>

      <Flex direction="row">
        <Button colorScheme="salmon" onClick={() => {
          screenSend({ type: "SAVE", numPegs: numPegs, numDisks: numDisks, showMoves: showMoves, showTime: showTime })
        }}>Done</Button>
      </Flex>

    </Flex>
  )
}
