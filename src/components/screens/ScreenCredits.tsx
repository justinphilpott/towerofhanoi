import React, {useContext} from 'react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Button,
  Heading,
  Flex,
  Text,
  Link
} from "@chakra-ui/react"
import { XStateContext } from './ScreenWrapper';

export const ScreenCredits = () => {

  const screenActor = useContext(XStateContext);
  const { send: screenSend } = screenActor;

  return (
    <>
      <Heading as="h1" fontSize={{base: "2.2rem", md: "2.5rem", lg:"3rem"}} color="#FDC173" mb={3} textShadow="0 0 0.4em #0A3839">The Tower of Hanoi</Heading>
      <Flex direction="column" width="100%" maxWidth="1200px" background="rgba(255, 255, 255, 0.9)" p="6" rounded="6">
        <Text fontSize={{base: "0.8rem", md: "1rem", lg:"1.5rem"}} mb={2}>A puzzle game created by <Link href="https://www.linkedin.com/in/justinphilpott/" fontWeight="bold">Justin Philpott <ExternalLinkIcon mx="2px" /></Link></Text>
        <Text fontSize={{base: "0.8rem", md: "1rem", lg:"1.5rem"}} mb={2}>Created initially as a test of <Link href="https://xstate.js.org/docs/" fontWeight="bold">XState <ExternalLinkIcon mx="2px" /></Link> and then contributed to the community under a <Link rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License <ExternalLinkIcon mx="2px" /></Link>.</Text>
        <Text fontSize={{base: "0.8rem", md: "1rem", lg:"1.5rem"}} mb={2}>Artwork by <Link href="https://Slumberbean.com" fontWeight="bold">Slumberbean.com <ExternalLinkIcon mx="2px" /></Link></Text>
        <Text fontSize={{base: "0.8rem", md: "1rem", lg:"1.5rem"}} mb={2}>Music by <Link href="https://purrplecat.com/" fontWeight="bold">Purrple Cat <ExternalLinkIcon mx="2px" /></Link> and <Link href="https://soundcloud.com/uniqofficial/" fontWeight="bold">Uniq <ExternalLinkIcon mx="2px" /></Link></Text>
        <Flex justifyContent="space-between">
          <Text fontSize={{base: "0.8rem", md: "1rem", lg:"1.5rem"}} mb={2}>Full attributions and code: <Link href="https://github.com/justinphilpott/towerofhanoi/blob/master/README.md" fontWeight="bold">Tower of Hanoi on Github <ExternalLinkIcon mx="2px" /></Link></Text>
          <Button alignSelf="flex-end" ml="3" size="xs" colorScheme="teal" onClick={() => {
            screenSend({ type: "EXIT" })
          }}>Back</Button>
        </Flex>
      </Flex>
    </>
  )
}
