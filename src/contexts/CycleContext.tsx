import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { ActionTypes, PresetsCycle, ReducerCycle } from "../reducers/ReducerCycle";


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
      },() => {
        const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

        if(storedStateAsJSON){
          return JSON.parse(storedStateAsJSON)
        }

      })

    const { cycles, activeCyclesID} = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id === activeCyclesID)

    const [secondsPassed, setSecondsPassed] = useState(() => {
      if(activeCycle){
        return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
      }

      return  0
    })

    useEffect(() =>{
      const stateJSON = JSON.stringify(cyclesState)

      window.localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])

    function FineshedCurrentCycle(){
      dispatch({
        type: ActionTypes.FINISH_CYCLE,
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
          type: ActionTypes.STOP_CYCLE,
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
            type: ActionTypes.ADD_NEW_CYCLE,
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