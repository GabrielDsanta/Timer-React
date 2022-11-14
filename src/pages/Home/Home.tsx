import { HandPalm, Play } from "phosphor-react";
import { StylesStartButton, StylesHome, StylesStopButton } from "./styles";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { createContext, useEffect, useState } from "react";
import { CountDown } from "./components/CountDown/CountDown";
import { NewCycleForm } from "./components/NewClycleForm/NewCycleForm";


const rulesValidationsForm = zod.object({
  task: zod.string()
  .min(1, "Por favor digite uma tarefa"),

  minutesDuration: zod.number()
  .min(5, "A tarefa precisa ter ao menos 5 minutos")
  .max(60, "A tarefa precisa ter no máximo 60 minutos")
})

type formTypeData = zod.infer<typeof rulesValidationsForm>

interface PresetsCycle {
  id: string
  task: string
  minutesDuration: number
  startDate: Date
  stopDate?: Date
  finishDate?: Date
}

interface CycleContextData{
  activeCycle: PresetsCycle | undefined
  activeCyclesID: string | null
  secondsPassed: number
  FineshedCurrentCycle: () => void
  CallSetSecondsPassed: (seconds: number) => void
}

export const CycleContext = createContext({} as CycleContextData)

export function Home() {
  const [cycles, setCycle] = useState<PresetsCycle[]>([])
  const [activeCyclesID, setActiveCycles] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const newCycleForm = useForm<formTypeData>({
    resolver: zodResolver(rulesValidationsForm),
    defaultValues: {
      task: '',
      minutesDuration: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

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
 
  function CreateCycle(data: formTypeData){
    const newCycle: PresetsCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesDuration: data.minutesDuration,
      startDate: new Date()
    }

    setCycle((state) => [...state, newCycle])
    setActiveCycles(newCycle.id)
    setSecondsPassed(0)
    reset()
    
  }

  function StopCycle(){
    console.log("Clicou")
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

  function CallSetSecondsPassed(seconds: number){
    setSecondsPassed(seconds)
  }

  const task = watch("task")
  const DisableWhenButton = !task

  return (
    <StylesHome>
        <form onSubmit={handleSubmit(CreateCycle)} action="">
          <CycleContext.Provider value={{ activeCycle, activeCyclesID, FineshedCurrentCycle, secondsPassed, CallSetSecondsPassed }}>
            <FormProvider {...newCycleForm}>
              <NewCycleForm/>
            </FormProvider>
            <CountDown/>
          </CycleContext.Provider>

          {activeCyclesID ? (
            <StylesStopButton onClick={StopCycle} type="button">
            <HandPalm size={24}/>
              Interromper
          </StylesStopButton>
            ):
          <StylesStartButton disabled={DisableWhenButton} type="submit">
            <Play size={24}/>
            Começar
          </StylesStartButton>
          }
        </form>
    </StylesHome>
  )
}
