export interface ICycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptDate?: Date;
    finishedDate?: Date;
}

interface ICycleState {
    cycles: ICycle[];
    activeCycleId: string | null;
}

export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE'
}

export function cyclesReducer(state: ICycleState, action: any) {
    switch(action.type) {
      case ActionTypes.ADD_NEW_CYCLE:
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id
        }
      case ActionTypes.FINISH_CURRENT_CYCLE:
        return {
          ...state,
          cycles: state.cycles.map(cycle => {
            if (state.activeCycleId === cycle.id) {
              return {
                ...cycle,
                finishedDate: new Date()
              }
            } else {
              return cycle
            }
          }),
          activeCycleId: null
        }
      case ActionTypes.INTERRUPT_CURRENT_CYCLE:
        return {
          ...state,
          cycles: state.cycles.map(cycle => {
            if (state.activeCycleId === cycle.id) {
              return {
                ...cycle,
                interruptDate: new Date()
              }
            } else {
              return cycle
            }
        }),
        activeCycleId: null
        } 
      default:
        return state
    }

  }