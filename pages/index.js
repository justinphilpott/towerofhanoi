import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Puzzle } from '../components/GameBoard'
import { Flex } from '@chakra-ui/react'
import { TowerOfHanoiGame } from '../components/TowerOfHanoiGame'

export default function Home() {

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" border="10px solid 000">
      <Head>
        <title>Tower of Hanoi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>        
      <Flex direction="column" background="gray.100" p="12" rounded="6">
        <TowerOfHanoiGame />
      </Flex>
    </Flex>
  )
}
