import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Flex, Fade, Spinner } from '@chakra-ui/react'
import { ScreenWrapper } from '../components/screens/ScreenWrapper'
import { ScreenProvider } from '../components/screens/fsm/ScreenFSMProvider'; // @see https://github.com/vantanev/xstate-helpers#createreactcontexthelpers
import bgImg from '../public/crane_bg.webp'


export default function Home() {
  const [bgLoaded, setBgLoaded] = useState(false);

  return (
    <>
      <ScreenProvider>
        <Flex height="100vh" width="100vw" alignItems="center" justifyContent="center" position="fixed" overflow="hidden">
          <Image
            src={bgImg}
            onLoad={() => { setBgLoaded(true); console.log('image loaded'); }}
            layout="fill"
            objectFit="cover"
            quality={100}
            />

          { bgLoaded ?
            <>
              <Head>
                <title>Tower of Hanoi</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>
              <ScreenWrapper />
            </>
            :
            <Flex height="100vh" width="100vw" alignItems="center" justifyContent="center" backgroundColor="teal" z-index={10}>
              <Spinner color="gold" size="xl" />
            </Flex>
          }
        </Flex>
      </ScreenProvider>
      <style jsx>{`
      `}</style>
    </>
  )
}
