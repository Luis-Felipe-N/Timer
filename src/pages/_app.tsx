import { Header } from '@/components/Header'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='wrapper'>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}
