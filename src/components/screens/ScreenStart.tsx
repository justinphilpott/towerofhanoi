import React, { useContext } from 'react'
import {
  Button,
  Heading,
  Flex,
  Text,
  Link
} from "@chakra-ui/react"
import { XStateContext } from './ScreenWrapper';

export const ScreenStart = () => {

  const screenActor = useContext(XStateContext);
  const { send } = screenActor;

  return (
    <Flex direction="column" justifyContent="space-between" alignItems="center" height="calc(var(--vh, 1vh) * 100)" p={{ base: 6, sm: 8, md: 12, lg: 16, xl: 24 }} pb={{ base: 3, sm: 4, md: 8, lg: 12, xl: 20 }} rounded="6" position="relative">
      <Heading as="h1" size="4xl" color="#FDC173" mb={6} mt={3} textShadow="0 0 0.4em #0A3839">The Tower of Hanoi</Heading>
      <Flex direction="column" background="rgba(255, 255, 255, 0.9)" p={3} pb={0} rounded={6} mt="auto">
        <Text fontSize="lg" color="#000" m={3} mb={6} textAlign="center" fontWeight="bold">Train your brain with this famous puzzle!</Text>
        <Flex direction="row" flexWrap="wrap">
          <Button data-testid="start-play" size="md" textShadow="0px 0px 10px #fff" flexGrow={1} flexBasis={0} minWidth="130px" colorScheme="teal" color="#000" m="0 0.5em 1.5em 0.5em" onClick={ () => send({ type: 'PLAY' }) }>Play</Button>
          <Button data-testid="start-tutorial" size="md" textShadow="0px 0px 10px #fff" flexGrow={1} flexBasis={0} minWidth="130px" colorScheme="gold" color="#000" m="0 0.5em 1.5em 0.5em" onClick={ () => send({ type: 'TUTORIAL' }) }>How to play</Button>
          <Button data-testid="start-settings" size="md" textShadow="0px 0px 10px #fff" flexGrow={1} flexBasis={0} minWidth="130px" colorScheme="salmon" color="#000" m="0 0.5em 1.5em 0.5em" onClick={ () => send('SETTINGS') }>Settings</Button>
        </Flex>
      </Flex>
      <Text textAlign="center" fontSize="sm" mt={1} fontWeight="bold"><Link data-testid="start-credits" onClick={ () => send({ type: "CREDITS" }) }>~ Credits ~</Link></Text>
    </Flex>
  )
}