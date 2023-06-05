import { Header } from '@/components/Header'
import { CyclesContextProvider } from '@/contexts/CyclesContext'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='wrapper'>
      <CyclesContextProvider>
        <Header />
        <Component {...pageProps} />
      </CyclesContextProvider>
    </div>
  )
}
