import { createContext, ReactNode, useReducer, useState } from "react";


interface CreateCycleData{
    task: string
    minutesDuration: number
}

interface PresetsCycle {
    id: string
    task: string
    minutesDuration: number
    startDate: Date
    stopDate?: Date
    finishDate?: Date
}

interface CycleContextData{
    cycles: PresetsCycle[]
    activeCycle: PresetsCycle | undefined
    activeCyclesID: string | null
    secondsPassed: number
    FineshedCurrentCycle: () => void
    CallSetSecondsPassed: (seconds: number) => void
    StopCurrentCycle: () => void
    CreateNewCycle: (data: CreateCycleData) => void
}

interface CyclesStateData{
  cycles: PresetsCycle[]
  activeCyclesID: string | null
}

export const CycleContext = createContext({} as CycleContextData)

interface CycleContextProviderProps{
    children: ReactNode
}

export function CyclesContextProvider({ children }: CycleContextProviderProps){
    const [cyclesState, dispatch] = useReducer((state: CyclesStateData, action: any) => {

      if(action.type === 'ADD_NEW_CYCLE'){
        return {
          ...state, 
          cycles: [...state.cycles, action.payload.newCycle],
          activeCyclesID: action.payload.newCycle.id,
        }
      }

      if(action.type === 'STOP_CYCLE'){
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
      }

      return state
    }, {
      cycles: [],
      activeCyclesID: null,
    })

    const { cycles, activeCyclesID} = cyclesState
    const [secondsPassed, setSecondsPassed] = useState(0)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCyclesID)

    function FineshedCurrentCycle(){
      dispatch({
        type: 'FINISH_CYCLE',
        payload: {
          activeCyclesID
      }

    })
        // setCycle(state => state.map((cycle) => {
        
        //   if(cycle.id === activeCyclesID){
        //     return { ...cycle, finishDate: new Date() }
        //   }
    
        //   else{
        //     return cycle
        //   }
        // }))
    }

    function CallSetSecondsPassed(seconds: number){
        setSecondsPassed(seconds)
    }

    function StopCurrentCycle(){
        dispatch({
          type: 'STOP_CYCLE',
          payload: {
            activeCyclesID
        }

      })
    }

    function CreateNewCycle(data: CreateCycleData){
        const newCycle: PresetsCycle = {
          id: String(new Date().getTime()),
          task: data.task,
          minutesDuration: data.minutesDuration,
          startDate: new Date()
        }
    
        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
              newCycle
          }

        })
        // setCycle((state) => [...state, newCycle])
        setSecondsPassed(0)
    }
  
    return(
        <CycleContext.Provider 
            value={{ 
                cycles,
                activeCycle, 
                activeCyclesID, 
                secondsPassed, 
                FineshedCurrentCycle, 
                CallSetSecondsPassed,
                StopCurrentCycle,
                CreateNewCycle 
            }}
        >
            {children}
        </CycleContext.Provider>
    )
}