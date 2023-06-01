import { CyclesContext } from '@/pages';
import styles from './styles.module.scss'

import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import * as zod from 'zod'

export function NewCycleForm() {
    const { activeCycleId } = useContext(CyclesContext)
    const { register } = useFormContext()

    return (
        <div className={styles.newCycleForm}>
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
    )
}