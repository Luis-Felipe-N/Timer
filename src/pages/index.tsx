import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Timer :: Home</title>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Home</h1>
      </main>
    </>
  )
}
