import bgImg from '../public/crane_bg.webp'
import Image from 'next/image'
import Head from 'next/head'
import { useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { ScreenWrapper } from '../components/screens/ScreenWrapper'
import { ScreenProvider } from '../state/screen/ScreenFSMProvider'; // @see https://github.com/vantanev/xstate-helpers#createreactcontexthelpers
import Script from 'next/script'
import { SpinnerLight } from '../utils/spinnerLight';

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

  return (
    <>
      <ScreenProvider>
        <Flex height="100%" width="100vw" alignItems="center" justifyContent="center" position="fixed" overflow="hidden">
          <Image
            src={bgImg}
            onLoadingComplete={() => { if(!bgLoaded) { setBgLoaded(true) } }}
            layout="fill"
            objectFit="cover"
            quality={50}
            alt="Tower of Hanoi puzzle game background image"
            priority={true}
            />
          <Head>
            <title>Tower of Hanoi</title>
            <link rel="manifest" href="/manifest.json" />
            <meta name='description' content='Tower of Hanoi puzzle game' />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />

            {/*<!--link rel="preload" href="/fonts/pattaya-latin-400-normal.woff2" as="font" type="font/woff2" /-->*/}
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

            {/*}
            <link rel="apple-touch-icon" href="/icon-192x192.png" />
            <link rel='apple-touch-icon' sizes='152x152' href='/static/icons/touch-icon-ipad.png' />
            <link rel='apple-touch-icon' sizes='180x180' href='/static/icons/touch-icon-iphone-retina.png' />
            <link rel='apple-touch-icon' sizes='167x167' href='/static/icons/touch-icon-ipad-retina.png' />

            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_2048.png' sizes='2048x2732' />
            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_1668.png' sizes='1668x2224' />
            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_1536.png' sizes='1536x2048' />
            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_1125.png' sizes='1125x2436' />
            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_1242.png' sizes='1242x2208' />
            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_750.png' sizes='750x1334' />
            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_640.png' sizes='640x1136' />

            <link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#5bbad5' />

            {/*
            <meta name='twitter:card' content='summary' />
            <meta name='twitter:url' content='https://yourdomain.com' />
            <meta name='twitter:title' content='Tower of Hanoi' />
            <meta name='twitter:description' content='Tower of Hanoi puzzle game' />
            <meta name='twitter:image' content='https://yourdomain.com/static/icons/android-chrome-192x192.png' />
            <meta name='twitter:creator' content=' />
            */}

            <meta property='og:type' content='app' />
            <meta property='og:title' content='The Tower of Hanoi' />
            <meta property='og:description' content='The Tower of Hanoi puzzle game' />
            <meta property='og:site_name' content='The Tower of Hanoi' />
            <meta property='og:url' content='https://thetowerofhanoi.com' />
            <meta property='og:image' content='https://thetowerofhanoi.com/....png' />

          </Head>
          { bgLoaded ?
            <ScreenWrapper />
            :
            <Flex direction="column" height="100vh" width="100vw" alignItems="center" justifyContent="center" backgroundColor="teal" z-index={10} >
              <Heading as="h1" size="xl" color="#000" mb={6} mt={3} textShadow="0 0 0.4em #fff">Loading</Heading>
              <SpinnerLight />
            </Flex>
          }
        </Flex>
      </ScreenProvider>
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
