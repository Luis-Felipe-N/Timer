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
      <main className={`${styles.history} ${inter.className}`}>
        <h1>Meu histórico</h1>

        <div>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Inicio</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Conserto de débitos técnicos</td>
                <td>25 minutos</td>
                <td>Ha cerca de 2 horas</td>
                <td>Em andamento</td>
              </tr>
              <tr>
                <td>Conserto de débitos técnicos</td>
                <td>25 minutos</td>
                <td>Ha cerca de 2 horas</td>
                <td>Em andamento</td>
              </tr><tr>
                <td>Conserto de débitos técnicos</td>
                <td>25 minutos</td>
                <td>Ha cerca de 2 horas</td>
                <td>Em andamento</td>
              </tr><tr>
                <td>Conserto de débitos técnicos</td>
                <td>25 minutos</td>
                <td>Ha cerca de 2 horas</td>
                <td>Em andamento</td>
              </tr><tr>
                <td>Conserto de débitos técnicos</td>
                <td>25 minutos</td>
                <td>Ha cerca de 2 horas</td>
                <td>Em andamento</td>
              </tr><tr>
                <td>Conserto de débitos técnicos</td>
                <td>25 minutos</td>
                <td>Ha cerca de 2 horas</td>
                <td>Em andamento</td>
              </tr><tr>
                <td>Conserto de débitos técnicos</td>
                <td>25 minutos</td>
                <td>Ha cerca de 2 horas</td>
                <td>Em andamento</td>
              </tr><tr>
                <td>Conserto de débitos técnicos</td>
                <td>25 minutos</td>
                <td>Ha cerca de 2 horas</td>
                <td>Em andamento</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
