import React, { useState } from 'react'
import {
  Button,
  Heading,
  ButtonGroup,
  Box,
  Flex,
  Spacer
} from "@chakra-ui/react"
import  { useScreenSend } from './fsm/ScreenFSMProvider';

export const ScreenStart = () => {

  const send = useScreenSend();

  return (
    <>
      <Flex direction="column" justifyContent="space-between" height="100vh" p="12" rounded="6">
        <Heading as="h1" size="2xl" color="#FDC173" mb={6} textShadow="0 0 0.4em #0A3839">The Tower of Hanoi</Heading>
        <Flex direction="row" background="rgba(255, 255, 255, 0.9)" p="6" rounded="6">
            <Button flexGrow={1} flexBasis={0} colorScheme="teal" m="0 0.5em 0 0.5em" onClick={() => send("PLAY")}>Play</Button>
            <Button flexGrow={1} flexBasis={0} colorScheme="orange" m="0 0.5em 0 0.5em" onClick={() => send("SETTINGS")}>Settings</Button>
            <Button flexGrow={1} flexBasis={0} colorScheme="purple" m="0 0.5em 0 0.5em" onClick={() => send("TUTORIAL")}>Tutorial</Button>
        </Flex>
      </Flex>
    </>
  )
}