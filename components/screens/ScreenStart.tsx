import React from 'react'
import {
  Button,
  Heading,
  Flex
} from "@chakra-ui/react"
import  { useScreenSend } from './fsm/ScreenFSMProvider';

export const ScreenStart = () => {

  const send = useScreenSend();

  const onPlay = () => send("PLAY");
  const onSettings = () => send("SETTINGS");
  const onCredits = () => send("CREDITS");

  return (
    <>
      <Flex direction="column" justifyContent="space-between" height="calc(var(--vh, 1vh) * 100)" p="12" rounded="6" position="relative">
        <Heading as="h1" size="4xl" color="#FDC173" mb={6} textShadow="0 0 0.4em #0A3839">The Tower of Hanoi</Heading>
        <Flex direction="row" flexWrap="wrap" background="rgba(255, 255, 255, 0.9)" p="6" pb={0} rounded="6">
        <Button size="md" textShadow="0px 0px 10px #fff" flexGrow={1} flexBasis={0} minWidth="100px" colorScheme="teal" color="#000" m="0 0.5em 1.5em 0.5em" onClick={ () => onPlay() }>Play</Button>
        <Button size="md" textShadow="0px 0px 10px #fff" flexGrow={1} flexBasis={0} minWidth="100px" colorScheme="salmon" color="#000" m="0 0.5em 1.5em 0.5em" onClick={ () => onSettings() }>Settings</Button>
        <Button size="md" textShadow="0px 0px 10px #fff" flexGrow={1} flexBasis={0} minWidth="100px" colorScheme="gold" color="#000" m="0 0.5em 1.5em 0.5em" onClick={ () => onCredits() }>Credits</Button>
        </Flex>
      </Flex>
    </>
  )
}