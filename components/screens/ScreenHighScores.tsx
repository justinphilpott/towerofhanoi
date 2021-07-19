import React, { useState } from 'react'
import { Button, Heading, Input } from '@chakra-ui/react'
import {
  Text,
  Box,
  Flex,
  ButtonGroup
} from "@chakra-ui/react"
import { ArrowBackIcon } from '@chakra-ui/icons';
import  { useScreenSend, useScreenService, useScreenInterpreter } from './fsm/ScreenFSMProvider';

export const ScreenTutorial = () => {

  const [screenState, screenSend] = useScreenService();

  return (
    <Flex direction="column" width="600px" justifyContent="space-between" background="rgba(255, 255, 255, 0.9)" p="12" rounded="6">

      {screenState.matches("tutorial.pageOne") &&
        <>
          <Heading as="h2" size="lg" mb={3}>Aim of the puzzle: </Heading>
          <Text>
            Move the tower of disks from the first peg to the last peg.
          </Text>
        </>
      }

      {screenState.matches("tutorial.pageTwo") &&
        <>
          <Heading as="h2" size="lg" mb={3}>Rules</Heading>
          <Text>
          You can only move a single disk at a time.<br />
          A larger disk can never be placed onto a smaller one.
          </Text>
        </>
      }

      {screenState.matches("tutorial.pageThree") &&
        <>
          <Heading as="h2" size="lg" mb={3}>Disks</Heading>
          <Text>
            Change the number of disks in 'settings'.
          </Text>
        </>
      }

      {screenState.matches("tutorial.pageFour") &&
        <>
          <Heading as="h2" size="lg" mb={3}>Pegs</Heading>
          <Text>
            The standard setup is the three disk puzzle. With four or more pegs the puzzle gets easier to solve, however working out the optimal solution is not easy. Change the number of pegs in 'settings'.
          </Text>
        </>
      }

      <Flex direction="row" width="100%" justifyContent="space-between" mt={3}>
        {(!screenState.matches("tutorial.pageFour")) &&
          <Button colorScheme="teal" mt="1em" onClick={() => screenSend({ type: "NEXT" })}>Next</Button>
        }
        <Button alignSelf="flex-end" colorScheme="purple" onClick={() => screenSend({ type: "CLOSE" })}>Close</Button>
      </Flex>

    </Flex>
  )
}