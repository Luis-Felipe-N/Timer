import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/History.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function History() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>History</h1>
      </main>
    </>
  )
}
