import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '@/pages'

interface ICountDownProps {
    
}

export function CountDown({ }: ICountDownProps) {
    const { activeCycle, activeCycleId, amountSecondsPassed, markCurrentCycleAsFinished, updateAmountSecondsPassed } = useContext(CyclesContext)
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;


    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
      let interval: ReturnType<typeof setInterval>;
      
      if (activeCycle) {
        interval = setInterval(() => {
          const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

            if (secondsDifference >= totalSeconds) {
                markCurrentCycleAsFinished()
              updateAmountSecondsPassed(totalSeconds)
  
              clearInterval(interval)
            } else {
              updateAmountSecondsPassed(secondsDifference)
            }
          }, 1000)
        
        
      }
  
      return () => {
        clearInterval(interval)
      }
    }, [
        activeCycle, 
        totalSeconds, 
        activeCycleId,
        markCurrentCycleAsFinished,
        updateAmountSecondsPassed
    ])

    return (
        <div className={styles.countdown}>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <span className={styles.separetor}>:</span>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </div>
    )
}