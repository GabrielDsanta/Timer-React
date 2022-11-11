import { Play } from "phosphor-react";
import { StylesButton, StylesCounter, StylesForm, StylesHome, StylesInputTask, StylesMinutesDuration, StylesTwoPoints } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { useState } from "react";


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
}

export function Home() {
  const [cycles, setCycle] = useState<PresetsCycle[]>([])
  const [activeCyclesID, setActiveCycles] = useState<string | null>()
  const [secondsPassed, setSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<formTypeData>({
    resolver: zodResolver(rulesValidationsForm),
    defaultValues: {
      task: '',
      minutesDuration: 0,
    }
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCyclesID)

  function SubmitForm(data: formTypeData){

    const newCycle: PresetsCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesDuration: data.minutesDuration,
    }

    setCycle((state) => [...state, newCycle])
    setActiveCycles(newCycle.id)

    console.log(newCycle)
    reset()
    
  }

  const totalSeconds = activeCycle ? activeCycle.minutesDuration * 60 : 0 
  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")

  const task = watch("task")
  const DisableWhenButton = !task

  return (
    <StylesHome>

        <form  onSubmit={handleSubmit(SubmitForm)} action="">
          <StylesForm>
            <label htmlFor="task">Vou trabalhar em</label>

            <StylesInputTask 
              list="taskSuggestions" 
              placeholder="Dê um nome para o seu projeto" 
              id="task" 
              type="text" 
              {...register("task")}
            />

            <datalist id="taskSuggestions">
              <option value="Projeto 1"></option>
              <option value="Projeto 2"></option>
            </datalist>

            <label htmlFor="minutesDuration">durante</label>
            <StylesMinutesDuration 
              step={5} 
              min={5} 
              max={60} 
              placeholder="00" 
              id="minutesDuration" 
              type="number" 
              {...register("minutesDuration", { valueAsNumber: true })}
            />

            <span>minutos.</span>
          </StylesForm>
        

          <StylesCounter>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <StylesTwoPoints>:</StylesTwoPoints>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
          </StylesCounter>

          <StylesButton disabled={DisableWhenButton} type="submit">
            <Play size={24}/>
            Começar
          </StylesButton>

        </form>

    </StylesHome>
  )
}
