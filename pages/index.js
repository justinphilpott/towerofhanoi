import Head from 'next/head'
import { Flex } from '@chakra-ui/react'
import { ScreenWrapper } from '../components/screens/ScreenWrapper'
import { ScreenProvider } from '../components/screens/fsm/ScreenFSMProvider'; // @see https://github.com/vantanev/xstate-helpers#createreactcontexthelpers

export default function Home() {
  return (
    <Flex height="100vh" width="100vw" alignItems="center" justifyContent="center" border="10px solid 000" backgroundImage="url('/crane_bg.jpg')"  background-blend-mode="screen" bgPosition="center"
    bgRepeat="repeat" backgroundSize="cover">
      <Head>
        <title>Tower of Hanoi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ScreenProvider name="screen">
        <ScreenWrapper />
      </ScreenProvider>
    </Flex>
  )
}
