import Head from 'next/head'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from '@phosphor-icons/react'

import * as zod from 'zod'


import styles from '@/styles/Home.module.scss'
import { createContext, useState } from 'react';
import { NewCycleForm } from '@/components/NewCycleForm';
import { CountDown } from '@/components/CountDown';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().max(60)
})

type NewCYcleFormData = zod.infer<typeof newCycleFormValidationSchema>


interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptDate?: Date;
  finishedDate?: Date;
}

interface ICyclesContextType {
  activeCycle: ICycle | undefined;
  activeCycleId: String | null;
  amountSecondsPassed: number;
  cycles: ICycle[];
  markCurrentCycleAsFinished: () => void;
  updateAmountSecondsPassed: (value: number) => void;
}

export const CyclesContext = createContext({} as ICyclesContextType)

export default function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)


  const newCycleForm = useForm<NewCYcleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { register, handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles(state => state.map(cycle => {
      if (activeCycleId === cycle.id) {
        return {
          ...cycle,
          finishedDate: new Date()
        }
      } else {
        return cycle
      }
    }))
  }

  function updateAmountSecondsPassed(value: number) {
    setAmountSecondsPassed(value)
  }

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
    setAmountSecondsPassed(0)
    reset();
  }

  function handleInterruptCycle() {
    setCycles(cycles.map(cycle => {
      if (activeCycleId === cycle.id) {
        return {
          ...cycle,
          interruptDate: new Date()
        }
      } else {
        return cycle
      }
    }))

    setActiveCycleId(null)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  
  return (
    <CyclesContext.Provider value={{activeCycle, activeCycleId, amountSecondsPassed, cycles, markCurrentCycleAsFinished, updateAmountSecondsPassed}}>
      <main className={styles.home}>
        <form onSubmit={handleSubmit(handleCreateNewCircle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />

          { activeCycle ? (
            <button className={styles.home__btn_stop} type="button" onClick={handleInterruptCycle}>
              <HandPalm size={24} />
              Interromper
            </button>
          ) : (
            <button className={styles.home__btn_start}>
              <Play size={24} />
              Começar
            </button>
          )}
        </form>
      </main>
    </CyclesContext.Provider>
  )
}
