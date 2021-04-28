import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Puzzle } from '../components/Puzzle'
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { hanoiMachine } from "../state/hanoiMachine"

export default function Home() {

  const [current, send] = useMachine(toggleMachine);



  return (
    <>
      <Head>
        <title>Tower of Hanoi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.main}>
          <TowerOfHanoiGame />
        </div>
      </div>
    </>
  )
}
