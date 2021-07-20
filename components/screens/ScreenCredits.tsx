import React from 'react'
import { Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Button,
  Heading,
  Flex,
  Text
} from "@chakra-ui/react"
import  { useScreenSend } from './fsm/ScreenFSMProvider';

export const ScreenCredits = () => {

  const screenSend = useScreenSend();

  return (
    <>
      <Heading as="h1" size="xl" color="#FDC173" mb={3} textShadow="0 0 0.4em #0A3839">The Tower of Hanoi</Heading>
      <Flex direction="column" width="100%" maxWidth="1200px" background="rgba(255, 255, 255, 0.9)" p="6" rounded="6">
        <Text fontSize="xs" mb={1}><strong>Concept and programming:</strong> Justin Philpott</Text>
        <Text fontSize="xs" mb={1}><strong>Tech stack:</strong> React, XState, Chakra-UI, NextJS, Vercel</Text>
        <Text fontSize="xs" mb={1}><strong>Artwork</strong> (background image)<strong>:</strong> Slumberbean.com - specific permission obtained.</Text>
        <Text fontSize="xs" mb={1}><strong>Music:</strong> "Awake" by Sappheiros | <Link href="https://soundcloud.com/sappheirosmusic" prefetch={false}>soundcloud.com/sappheirosmusic</Link></Text>
        <Text fontSize="xs" mb={1}><strong>Inspiration:</strong> My father David who made wooden version of this puzzle for me as a kid.</Text>
        <Text fontSize="xs" mb={1}><strong>License:</strong> This work is licensed under a <Link rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</Link></Text>
        <Flex direction="row">
          <Button colorScheme="purple" onClick={() => {
            screenSend({ type: "EXIT" })
          }}>Ok</Button>
        </Flex>
      </Flex>
    </>
  )
}