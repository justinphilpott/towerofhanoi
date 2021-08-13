import bgImg from '../public/crane_bg.webp'
import Image from 'next/image'
import Head from 'next/head'
import React, { useState } from 'react'
import { Flex, Heading, Text, Button, Link } from '@chakra-ui/react'
// import { ScreenWrapper } from '../components/screens/ScreenWrapper'
// import { ScreenProvider } from '../state/screen/ScreenFSMProvider'; // @see https://github.com/vantanev/xstate-helpers#createreactcontexthelpers
import Script from 'next/script'
import { SpinnerLight } from '../utils/spinnerLight';
// import { ScreenStart } from "../components/screens/ScreenStart";

export default function Home() {
  const [bgLoaded, setBgLoaded] = useState(false);

  /**
   * possible sound solution 
   * 
   * useEffect
   * on touch start
   * activate audio component with a play and pause
   * so we need the audio component exposed here to trigger playing
   * 
   * -- then pass the icon, play and stop functions down
   * basically a soundControl object in to the game object that
   * 
   * there we need to start and stop the sound at various times...
   * so context is not necessary here...
   * 
   * IOS sound fix
   * https://curtisrobinson.medium.com/how-to-auto-play-audio-in-safari-with-javascript-21d50b0a2765
   */

  /*
  useEffect(() => {

    window.addEventListener("touchstart", startup);

  })


  const audioObject = 


  const gameAudio = (audioObject) => {
    


    const icon = '';
    const stop = () => {

    }
    const play = () => {
      
    }

    return [icon, stop, play];
  }
  */

  /**
   * these
   */
  const handlePlay = () => {

  }
  const handleTutorial = () => {

  }
  const handleSettings = () => {

  }
  const handleCredits = () => {

  }

  return (
    <>
      <Flex height="100%" width="100vw" alignItems="center" justifyContent="center" position="fixed" overflow="hidden" backgroundColor="black">
        <Image
          src={bgImg}
          onLoadingComplete={() => { if(!bgLoaded) { setBgLoaded(true) } }}
          layout="fill"
          objectFit="cover"
          quality={50}
          alt="Loading..."
          priority={true}
          //placeholder="blur"
          //blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkaGj4DwADiQIB/qPrgQAAAABJRU5ErkJggg==`}
          />
        <Head>
          <title>Tower of Hanoi</title>
          <link rel="manifest" href="/manifest.json" />
          <meta name='description' content='Tower of Hanoi puzzle game' />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />

          <meta httpEquiv="Content-Security-Policy" content="default-src 'self' https://*.towerofhanoi.app;" />

          <link rel="preload" href="./fonts/pattaya-regular-webfont.woff2" as="font" type="font/woff2" crossOrigin="" />
          <link rel="preload" href="./fonts/pattaya-regular-webfont.woff" as="font" type="font/woff" crossOrigin="" />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon_32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon_16x16.png' />
          <link rel='icon' href='/favicon.ico' />

          <meta name='application-name' content='Tower of Hanoi' />

          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
          <meta name='apple-mobile-web-app-title' content='Tower of Hanoi' />

          <meta name='msapplication-config' content='/browserconfig.xml' />
          <meta name='msapplication-TileColor' content='#319795' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#319795' />

          <link rel="apple-touch-icon" sizes='180x180' href="/icons/apple-icon-180.png" />

          <link rel="apple-touch-startup-image" href="/icons/apple-splash-2048-2732.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-2732-2048.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-1668-2388.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-2388-1668.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-1536-2048.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-2048-1536.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-1668-2224.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-2224-1668.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-1620-2160.png" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-2160-1620.png" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-1284-2778.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-2778-1284.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-1170-2532.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-2532-1170.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-1125-2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-2436-1125.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-1242-2688.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-2688-1242.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-828-1792.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-1792-828.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-1242-2208.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-2208-1242.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-750-1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-1334-750.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-640-1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/icons/apple-splash-1136-640.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel='mask-icon' href='/public/icons/safari-pinned-tab.svg' color='#5bbad5' />

          <meta name='twitter:card' content='Tower of Hanoi puzzle game by Justin Philpott' />
          <meta name='twitter:url' content='https://towerofhanoi.app' />
          <meta name='twitter:title' content='Tower of Hanoi' />
          <meta name='twitter:description' content='Tower of Hanoi puzzle game. ' />
          <meta name='twitter:image' content='https://towerofhanoi.app/icons/icon-192x192.png' />
          <meta name='twitter:creator' content='Justin Philpott' />

          <meta property='og:type' content='app' />
          <meta property='og:title' content='The Tower of Hanoi' />
          <meta property='og:description' content='The Tower of Hanoi puzzle game' />
          <meta property='og:site_name' content='The Tower of Hanoi' />
          <meta property='og:url' content='https://towerofhanoi.app' />
          <meta property='og:image' content='https://towerofhanoi.app/icons/icon-192x192.png' />

        </Head>
        { bgLoaded ?
            <Flex direction="column" justifyContent="space-between" alignItems="center" height="calc(var(--vh, 1vh) * 100)" p={{ base: 6, sm: 8, md: 12, lg: 16, xl: 24 }} pb={{ base: 3, sm: 4, md: 8, lg: 12, xl: 20 }} rounded="6" position="relative">
              <Heading as="h1" size="4xl" color="#FDC173" mb={6} mt={3} textShadow="0 0 0.4em #0A3839">The Tower of Hanoi</Heading>
              <Flex direction="column" background="rgba(255, 255, 255, 0.9)" p={3} pb={0} rounded={6} mt="auto">
                <Text fontSize="lg" color="#000" m={3} mb={6} textAlign="center" fontWeight="bold">Train your brain with this famous puzzle!</Text>
                <Flex direction="row" flexWrap="wrap">
                  <Button size="md" textShadow="0px 0px 10px #fff" flexGrow={1} flexBasis={0} minWidth="130px" colorScheme="teal" color="#000" m="0 0.5em 1.5em 0.5em" onClick={ () => handlePlay() }>Play</Button>
                  <Button size="md" textShadow="0px 0px 10px #fff" flexGrow={1} flexBasis={0} minWidth="130px" colorScheme="gold" color="#000" m="0 0.5em 1.5em 0.5em" onClick={ () => handleTutorial() }>How to play</Button>
                  <Button size="md" textShadow="0px 0px 10px #fff" flexGrow={1} flexBasis={0} minWidth="130px" colorScheme="salmon" color="#000" m="0 0.5em 1.5em 0.5em" onClick={ () => handleSettings() }>Settings</Button>
                </Flex>
              </Flex>
              <Text textAlign="center" fontSize="sm" mt={1} fontWeight="bold"><Link onClick={ () => handleCredits() }>~ credits ~</Link></Text>
            </Flex>

          :
          <Flex display="fixed" direction="column" height="calc(var(--vh, 1vh) * 100)" width="100vw" alignItems="center" justifyContent="center" backgroundColor="black" z-index={10} >
            <SpinnerLight />
          </Flex>
        }
      </Flex>
      <Script strategy="afterInteractive">
        {`
          function setViewportProperty(doc) {
            var prevClientHeight;
            var customVar = '--' + 'vh';
            function handleResize() {
              var clientHeight = doc.clientHeight;
              if (clientHeight === prevClientHeight) return;
              requestAnimationFrame(function updateViewportHeight(){
                doc.style.setProperty(customVar, (clientHeight * 0.01) + 'px');
                prevClientHeight = clientHeight;
              });
            }
            handleResize();
            return handleResize;
          }
          window.addEventListener('resize', setViewportProperty(document.documentElement));
        `}
      </Script>
    </>
  )
}
