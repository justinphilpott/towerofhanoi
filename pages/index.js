import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Puzzle } from '../components/Puzzle'

const puzzleState = { 
  'towers': [[1, 2, 3, 4, 5, 6, 7], [8], [9]], 
  'activePeg': 0
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Tower of Hanoi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.main}>
          <Puzzle puzzleState={puzzleState} />
        </div>
      </div>
    </>
  )
}


  // Available variables:
  // - Machine
  // - interpret
  // - assign
  // - send
  // - sendParent
  // - spawn
  // - raise
  // - actions
  // - XState (all XState exports)
  
  const hanoiUIMachine = Machine({
    id: 'hanoiUIMachine',
    initial: 'initial',
    context: {
      retries: 0
    },
    states: {
      initial: {
        on: {
          SELECTSRC: 'srcSelected'
        }
      },
      srcSelected: {
        on: {
          SELECTDEST: 'moveSelected',
          RESET: 'initial'
        }
      },
      moveSelected: {
        on: {
          MOVE: 'moveInProgress',
          REJECTMOVE: 'invalidMove',
          RESET: 'initial'
        }
      },
      invalidMove: {
        on: {
          SELECTDEST: 'moveSelected',
          RESET: 'initial'
        }
      },
      moveInProgress: {
        on: {
          MOVECOMPLETE: 'moveComplete',
          RESET: 'initial'
        }
      },
      moveComplete: {
        on: {
          PUZZLECOMPLETE: 'puzzleComplete',
          SELECTSRC: 'srcSelected',
          RESET: 'initial'
        }
      },
      puzzleComplete: {
        on: {
          RESET: 'initial'
        }
      },
    }
  });