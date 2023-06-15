// import '../styles/globals.css'
import React, { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
// import "@fontsource/pattaya/400.css"
import theme from '../theme';
import Fonts from '../theme-fonts.js';

function MyApp({ Component } : { Component: FC }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Component />
    </ChakraProvider>
  )
}

export default MyApp
