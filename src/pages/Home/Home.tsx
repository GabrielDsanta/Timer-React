import { HandPalm, Play } from "phosphor-react";
import { StylesStartButton, StylesHome, StylesStopButton } from "./styles";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { useContext, useState } from "react";
import { CountDown } from "./components/CountDown/CountDown";
import { NewCycleForm } from "./components/NewClycleForm/NewCycleForm";
import { CycleContext } from "../../contexts/CycleContext";


const rulesValidationsForm = zod.object({
  task: zod.string()
  .min(1, "Por favor digite uma tarefa"),

  minutesDuration: zod.number()
  .min(5, "A tarefa precisa ter ao menos 5 minutos")
  .max(60, "A tarefa precisa ter no máximo 60 minutos")
})

type formTypeData = zod.infer<typeof rulesValidationsForm>

export function Home() {
  const { activeCycle, CreateNewCycle, StopCurrentCycle } = useContext(CycleContext)

  const newCycleForm = useForm<formTypeData>({
    resolver: zodResolver(rulesValidationsForm),
    defaultValues: {
      task: '',
      minutesDuration: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: formTypeData){
    CreateNewCycle(data)
    reset()
  }

  const task = watch("task")
  const DisableWhenButton = !task

  return (
    <StylesHome>
        <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        
          <FormProvider {...newCycleForm}>
            <NewCycleForm/>
          </FormProvider>
          <CountDown/>

          {activeCycle ? (
            <StylesStopButton onClick={StopCurrentCycle} type="button">
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
