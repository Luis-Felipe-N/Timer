import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/History.module.scss'
import { StatusColors } from '@/components/History/StatusColors'
import { useCycles } from '@/hooks/useCycles'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

const inter = Inter({ subsets: ['latin'] })

export default function History() {
  const { cycles } = useCycles()
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
              {cycles.map(cycle => (
                <tr key={cycle.id}>
                  <td>{ cycle.task }</td>
                  <td>{ cycle.minutesAmount } minutos</td>
                  <td>
                    {
                      formatDistanceToNow(cycle.startDate, {
                        addSuffix: true,
                        locale: ptBR
                      })
                    }
                  </td>
                  <td>

                    { cycle.finishedDate ? (
                      <StatusColors color='green'>
                        Completo
                      </StatusColors>
                    ) : cycle.interruptDate ? (
                      <StatusColors color='red'>
                        Interrompido
                      </StatusColors>
                    ) : (
                      <StatusColors color='yellow'>
                        Em andamento
                      </StatusColors>
                    )}
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
