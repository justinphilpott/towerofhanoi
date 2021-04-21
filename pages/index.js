import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Puzzle } from '../components/Puzzle'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <Puzzle puzzleState={[[1, 2, 3, 4, 5, 6, 7], [8], [9]]} />
      </div>
    </div>
  )
}
