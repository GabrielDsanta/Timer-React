import { createContext, ReactNode, useState } from "react";


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

export const CycleContext = createContext({} as CycleContextData)

interface CycleContextProviderProps{
    children: ReactNode
}

export function CyclesContextProvider({ children }: CycleContextProviderProps){
    const [cycles, setCycle] = useState<PresetsCycle[]>([])
    const [activeCyclesID, setActiveCycles] = useState<string | null>(null)
    const [secondsPassed, setSecondsPassed] = useState(0)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCyclesID)

    function FineshedCurrentCycle(){
        setCycle(state => state.map((cycle) => {
        
          if(cycle.id === activeCyclesID){
            return { ...cycle, finishDate: new Date() }
          }
    
          else{
            return cycle
          }
        }))
    }

    function CallSetSecondsPassed(seconds: number){
        setSecondsPassed(seconds)
    }

    function StopCurrentCycle(){
        setCycle(state => state.map((cycle) => {
    
          if(cycle.id === activeCyclesID){
            return { ...cycle, stopDate: new Date() }
          }
    
          else{
            return cycle
          }
    
        }))
    
        setActiveCycles(null)
    }

    function CreateNewCycle(data: CreateCycleData){
        const newCycle: PresetsCycle = {
          id: String(new Date().getTime()),
          task: data.task,
          minutesDuration: data.minutesDuration,
          startDate: new Date()
        }
    
        setCycle((state) => [...state, newCycle])
        setActiveCycles(newCycle.id)
        setSecondsPassed(0)

        // reset()
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