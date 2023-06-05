import Head from 'next/head'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from '@phosphor-icons/react'

import * as zod from 'zod'


import styles from '@/styles/Home.module.scss'
import { NewCycleForm } from '@/components/NewCycleForm';
import { CountDown } from '@/components/CountDown';
import { useCycles } from '@/hooks/useCycles';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().max(60)
})

type NewCYcleFormData = zod.infer<typeof newCycleFormValidationSchema>



export default function Home() {
  const { activeCycle, createNewCycle, interruptCycle } = useCycles()

  const newCycleForm = useForm<NewCYcleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCYcleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    
      <main className={styles.home}>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />

          { activeCycle ? (
            <button className={styles.home__btn_stop} type="button" onClick={interruptCycle}>
              <HandPalm size={24} />
              Interromper
            </button>
          ) : (
            <button className={styles.home__btn_start} disabled={isSubmitDisabled}>
              <Play size={24} />
              Começar
            </button>
          )}
        </form>
      </main>
  )
}
