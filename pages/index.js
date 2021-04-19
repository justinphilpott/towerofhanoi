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

      <main>

        <div>
          <Puzzle puzzleState={[[1, 2, 3, 4], [5, 6], [7]]} />
        </div>
      </main>
    </div>
  )
}
