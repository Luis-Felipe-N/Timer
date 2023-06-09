import styles from './styles.module.scss'

import {  useFormContext } from 'react-hook-form';
import { useCycles } from '@/hooks/useCycles';

export function NewCycleForm() {
    const { activeCycleId } = useCycles()
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