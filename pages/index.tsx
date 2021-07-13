import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Flex, Fade, Spinner } from '@chakra-ui/react'
import { ScreenWrapper } from '../components/screens/ScreenWrapper'
import { ScreenProvider } from '../components/screens/fsm/ScreenFSMProvider'; // @see https://github.com/vantanev/xstate-helpers#createreactcontexthelpers
import bgpic from '../public/crane_bg2.webp'
import bgpic_blur from '../public/crane_bg2_blur.webp'

export default function Home() {
  const [bgLoaded, setBgLoaded] = useState(false);

  return (
    <>
      <ScreenProvider>
        <Image
          src={bgpic}
          onLoad={() => { setBgLoaded(true); console.log('image loaded'); }}
          layout="fill"
          objectFit="cover"
          quality={75}
          className="bgImg"
        />
        <Fade in={true}>
          <Flex height="100vh" width="100vw" alignItems="center" justifyContent="center" position="fixed" overflow="hidden">
            { bgLoaded ?
              <>
                <Flex height="100vh" width="100vw" position="fixed" overflow="hidden" z-index="-1">
                  <Image
                    src={bgpic}
                    layout="fill"
                    objectFit="cover"
                    quality={75}
                    placeholder="blur"
                  />
                </Flex>

                <Head z-index={1000}>
                  <title>Tower of Hanoi</title>
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                <ScreenWrapper z-index={1000} />
              </>
              :
              <Flex height="100vh" width="100vw" alignItems="center" justifyContent="center" backgroundColor="teal" z-index={10}>
                <Spinner color="gold" size="xl" />
              </Flex>
            }

          </Flex>
        </Fade>
      </ScreenProvider>
      <style jsx>{`
        .bgImg {
          display: none;
        }
      `}</style>
    </>
  )
}
