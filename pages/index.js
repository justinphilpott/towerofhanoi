import Head from 'next/head'
import { Flex } from '@chakra-ui/react'
import { ScreenWrapper } from '../components/ScreenWrapper'

export default function Home() {

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" border="10px solid 000" backgroundImage="url('/crane_bg.jpg')"  background-blend-mode="screen" bgPosition="center"
    bgRepeat="repeat" backgroundSize="100% 100%">
      <Head>
        <title>Tower of Hanoi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ScreenWrapper />
    </Flex>
  )
}
