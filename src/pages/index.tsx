import Head from 'next/head'
import { Roboto, Roboto_Mono } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { Play } from '@phosphor-icons/react'

const inter = Roboto({ subsets: ['latin'], weight: ['400', '500', '700']})
const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Timer :: Home</title>
      </Head>
      <main className={`${styles.home} ${inter.className}`}>
        <form>
          <div className={styles.home__form}>
            <label htmlFor="task">Vou trabalhar em</label>
            <input id="task" placeholder='Dê um nome para o seu projeto'/>

            <label htmlFor="minutesAmount">durante</label>
            <input type="text" id="minutesAmount" placeholder='00'/>

            minutos.
          </div>
          <div className={`${styles.home__countdown} ${robotoMono.className}`}>
            <span>0</span>
            <span>0</span>
            <span className={styles.separetor}>:</span>
            <span>0</span>
            <span>0</span>
          </div>
          <button className={styles.home__btn}>
            <Play size={24} />
            Começar
          </button>
        </form>
      </main>
    </>
  )
}
