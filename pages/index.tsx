import bgImg from '../public/crane_bg.webp'
import Image from 'next/image'
import Head from 'next/head'
import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic';

// import { ScreenProvider } from '../state/screen/ScreenFSMProvider'; // @see https://github.com/vantanev/xstate-helpers#createreactcontexthelpers
import Script from 'next/script'
import { SpinnerLight } from '../src/utils/spinnerLight';
import { ScreenStartFragment } from "../src/components/screens/screenStartFragment";

export default function Home() {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [fsmLoadInit, setfsmLoadInit] = useState(false);
  const [initialSelection, setInitialSelection] = useState('START');

  interface ScreenWrapper_dynamicProps {
    initialState: string;
  }
  const ScreenWrapper_dynamic = dynamic<ScreenWrapper_dynamicProps>(
    () => import('../src/components/screens/ScreenWrapper').then((mod) => mod.ScreenWrapper),
    { loading: () =>
      <Flex height="calc(var(--vh, 1vh) * 100)" width="100vw" alignItems="center" justifyContent="center" backgroundColor="transparent" z-index={10} >
        <SpinnerLight />
      </Flex>
    }
  )

  const handleStartClick = (action: string) => {
    // save this to start the screen FSM in the correct state
    // to be rendered by the screen wrapper
    setInitialSelection(action);
    setfsmLoadInit(true);
    console.log('initialSelection', initialSelection);
    console.log('fsmLoadInit', fsmLoadInit);
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
          />
        <Head>
          <title>Tower of Hanoi</title>
          <link rel="manifest" href="/manifest.json" />
          <meta name='description' content='Tower of Hanoi puzzle game' />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />

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
            !fsmLoadInit ?
              <ScreenStartFragment handleClick={((action) => { handleStartClick(action); })} />
            :
              <ScreenWrapper_dynamic initialState={initialSelection} />
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
