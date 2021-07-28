import React, {useLayoutEffect} from 'react'
import {
  Button,
  Heading,
  Flex,
  Text
} from "@chakra-ui/react"
import { useScreenSend } from './fsm/ScreenFSMProvider';
import { useScreenAspect } from '../TowerofHanoi/utils/useScreenAspect';

export const ScreenStart = () => {

  const send = useScreenSend();
  const aspect = useScreenAspect();

  return (
    <>
      <Flex direction="column" justifyContent="space-between" height="calc(var(--vh, 1vh) * 100)" p={{ base: 6, sm: 8, md: 12, lg: 16, xl: 24 }} rounded="6" position="relative">
        <Heading as="h1" size="4xl" color="#FDC173" mb={6} mt={3} textShadow="0 0 0.4em #0A3839">The Tower of Hanoi</Heading>
        <Flex direction="column" background="rgba(255, 255, 255, 0.9)" p={3} pb={0} rounded={6}>
          <Text fontSize="lg" color="#000" m={3} mb={6} textAlign="center" fontWeight="bold">Train your brain with this famous puzzle!</Text>
          {aspect < 1 &&
            <>
               rotate
            </>
          }
          <Flex direction="row" flexWrap="wrap">
            <Button size="md" textShadow="0px 0px 10px #fff" flexGrow={1} flexBasis={0} minWidth="100px" colorScheme="teal" color="#000" m="0 0.5em 1.5em 0.5em" onClick={ () => send({ type: 'PLAY' }) }>Play</Button>
            <Button size="md" textShadow="0px 0px 10px #fff" flexGrow={1} flexBasis={0} minWidth="100px" colorScheme="gold" color="#000" m="0 0.5em 1.5em 0.5em" onClick={ () => send({ type: 'TUTORIAL' }) }>How to play</Button>
            <Button size="md" textShadow="0px 0px 10px #fff" flexGrow={1} flexBasis={0} minWidth="100px" colorScheme="salmon" color="#000" m="0 0.5em 1.5em 0.5em" onClick={ () => send("SETTINGS") }>Settings</Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}