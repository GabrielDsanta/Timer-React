import { createContext, ReactNode, useReducer, useState } from "react";
import { PresetsCycle, ReducerCycle } from "../reducers/ReducerCycle";


interface CreateCycleData{
    task: string
    minutesDuration: number
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

export const CycleContext = createContext({} as CycleContextData)

interface CycleContextProviderProps{
    children: ReactNode
}

export function CyclesContextProvider({ children }: CycleContextProviderProps){
    const [cyclesState, dispatch] = useReducer(
      ReducerCycle, 
      {
      cycles: [],
      activeCyclesID: null,
      }
    )

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