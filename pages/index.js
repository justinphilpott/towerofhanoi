import Head from 'next/head'
import { Flex, Fade } from '@chakra-ui/react'
import { ScreenWrapper } from '../components/screens/ScreenWrapper'
import { ScreenProvider } from '../components/screens/fsm/ScreenFSMProvider'; // @see https://github.com/vantanev/xstate-helpers#createreactcontexthelpers

export default function Home() {
  return (
    <ScreenProvider name="screen">
      <Fade in={true}>
        <Flex height="100vh" width="100vw" alignItems="center" justifyContent="center" border="10px solid 000" backgroundImage="url('/crane_bg2.jpg')"  background-blend-mode="screen" bgPosition="center"
        bgRepeat="repeat" backgroundSize="cover">
          <Head>
            <title>Tower of Hanoi</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ScreenWrapper />
      </Flex>
      </Fade>
    </ScreenProvider>
  )
}
