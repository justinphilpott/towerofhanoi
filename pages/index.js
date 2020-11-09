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
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div>
          <Puzzle puzzleState={[[1, 2, 3, 4, 5], [6], []]} />
        </div>
      </main>

      <footer className={styles.footer}>
 
      </footer>
    </div>
  )
}
