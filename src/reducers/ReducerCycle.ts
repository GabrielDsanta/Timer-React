
import { produce } from 'immer'



export interface PresetsCycle {
  id: string
  task: string
  minutesDuration: number
  startDate: Date
  stopDate?: Date
  finishDate?: Date
}

interface CyclesStateData{
  cycles: PresetsCycle[]
  activeCyclesID: string | null
}

export enum ActionTypes{
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  STOP_CYCLE = 'STOP_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
}

export function ReducerCycle(state: CyclesStateData, action: any) {

  switch(action.type){
    case ActionTypes.ADD_NEW_CYCLE:{
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCyclesID = action.payload.newCycle.id
      })
    }

    case ActionTypes.STOP_CYCLE:{
      const currentCycleIndex = state.cycles.findIndex(cycle => {
        return cycle.id === state.activeCyclesID
      })

      if(currentCycleIndex < 0){
        return state
      }

      return produce(state, (draft) => {
        draft.activeCyclesID = null

        draft.cycles[currentCycleIndex].stopDate = new Date()
      })
    }

    case ActionTypes.FINISH_CYCLE:{
      const currentCycleIndex = state.cycles.findIndex(cycle => {
        return cycle.id === state.activeCyclesID
      })

      if(currentCycleIndex < 0){
        return state
      }

      return produce(state, (draft) => {
        draft.activeCyclesID = null

        draft.cycles[currentCycleIndex].finishDate = new Date()
      })
    }

    default:
    return state

  }
}{
    
}