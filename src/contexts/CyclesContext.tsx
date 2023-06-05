import { ActionTypes, cyclesReducer, ICycle } from "@/reducers/cycles";
import { createContext, ReactNode, useReducer, useState } from "react";

interface ICreateNewCycle {
    task: string;
    minutesAmount: number;
}


  
  interface ICyclesContextType {
    activeCycle: ICycle | undefined;
    activeCycleId: String | null;
    amountSecondsPassed: number;
    cycles: ICycle[];
    markCurrentCycleAsFinished: () => void;
    updateAmountSecondsPassed: (value: number) => void;
    createNewCycle: (data: ICreateNewCycle) => void;
    interruptCycle: () => void;
}

interface ICycleProviderProps {
    children: ReactNode
}


export const CyclesContext = createContext({} as ICyclesContextType)

export function CyclesContextProvider({ children }: ICycleProviderProps) {
    const [cycleState, dispatch] = useReducer(cyclesReducer, {
      cycles: [],
      activeCycleId: null
    })

    const { cycles, activeCycleId } = cycleState
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished() {
        dispatch({
          type: ActionTypes.FINISH_CURRENT_CYCLE,
          payload: {
            activeCycleId
          }
        })
    }
    
    function updateAmountSecondsPassed(value: number) {
        setAmountSecondsPassed(value)
    }
    
      function createNewCycle(data: ICreateNewCycle) {
        const idNewCycle = String(new Date().getTime())
        const newCycle: ICycle = {
          id: idNewCycle,
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date()
    }
    
        dispatch({
          type: ActionTypes.ADD_NEW_CYCLE,
          payload: {
            newCycle
          }
        })
        
        setAmountSecondsPassed(0)
    }

    function interruptCycle() {
        dispatch({
          type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
          payload: {
            activeCycleId
          }
        })
    }

    return (
        <CyclesContext.Provider 
            value={
                {
                    activeCycle, 
                    activeCycleId, 
                    amountSecondsPassed, 
                    cycles, 
                    markCurrentCycleAsFinished, 
                    updateAmountSecondsPassed,
                    createNewCycle,
                    interruptCycle
                }}
            >
            {children}
        </CyclesContext.Provider>
    )
}

  