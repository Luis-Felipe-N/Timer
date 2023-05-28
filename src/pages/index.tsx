import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from '@phosphor-icons/react'
import * as zod from 'zod'

import styles from '@/styles/Home.module.scss'
import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60)
})

type NewCYcleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
}

export default function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>()
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  useEffect(() => {
    console.log(activeCycle)
    if (activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000)
    }
  }, [activeCycle])

  const { register, handleSubmit, watch, reset } = useForm<NewCYcleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  function handleCreateNewCircle(data: NewCYcleFormData) {
    const idNewCycle = String(new Date().getTime())
    const newCycle: ICycle = {
      id: idNewCycle,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }


    setCycles((state) => [...state, newCycle])
    setActiveCycleId(idNewCycle)
    reset();
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')
  
  return (
    <>
      <Head>
        <title>Timer :: Home</title>
      </Head>
      <main className={styles.home}>
        <form onSubmit={handleSubmit(handleCreateNewCircle)}>
          <div className={styles.home__form}>
            <label htmlFor="task">Vou trabalhar em</label>
            <input 
              id="task" 
              placeholder='Dê um nome para o seu projeto'
              {...register('task')}
            />

            <label htmlFor="minutesAmount">durante</label>
            <input 
              type="number" 
              id="minutesAmount"
              {...register('minutesAmount', {
                valueAsNumber: true
              })}
              placeholder='00'

            />

            minutos.
          </div>
          <div className={styles.home__countdown}>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <span className={styles.separetor}>:</span>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
          </div>
          <button className={styles.home__btn} disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </button>
        </form>
      </main>
    </>
  )
}
