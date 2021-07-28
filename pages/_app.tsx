// import '../styles/globals.css'
import React, { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import "@fontsource/pattaya/400.css"
import "@fontsource/montserrat"
import theme from "../theme"
import LogRocket from 'logrocket';
LogRocket.init('pn2ock/towerofhanoi');

function MyApp({ Component } : { Component: FC }) {
  return (
    <ChakraProvider theme={theme}>
      <Component />
    </ChakraProvider>
  )
}

export default MyApp
