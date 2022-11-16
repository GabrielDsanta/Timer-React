



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

export function ReducerCycle(state: CyclesStateData, action: any) {

  switch(action.type){
    case 'ADD_NEW_CYCLE':
      return {
        ...state, 
        cycles: [...state.cycles, action.payload.newCycle],
        activeCyclesID: action.payload.newCycle.id,
      }

    case 'STOP_CYCLE':
      return{
        ...state,
        cycles: state.cycles.map((cycle) => {
  
          if(cycle.id === state.activeCyclesID){
            return { ...cycle, stopDate: new Date() }
          }
    
          else{
            return cycle
          }
    
        }),
        activeCyclesID: null
      }

    case 'FINISH_CYCLE':
      return{
        ...state,
        cycles: state.cycles.map((cycle) => {
  
          if(cycle.id === state.activeCyclesID){
            return { ...cycle, finishDate: new Date() }
          }
    
          else{
            return cycle
          }
    
        }),
        activeCyclesID: null
      }

    default:
    return state

  }
}{
    
}