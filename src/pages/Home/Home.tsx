import { Play } from "phosphor-react";
import { StylesButton, StylesCounter, StylesForm, StylesHome, StylesInputTask, StylesMinutesDuration, StylesTwoPoints } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'


const rulesValidationsForm = zod.object({
  task: zod.string()
  .min(1, "Por favor digite uma tarefa"),

  minutesDuration: zod.number()
  .min(5, "A tarefa precisa ter ao menos 5 minutos")
  .max(60, "A tarefa precisa ter no máximo 60 minutos")
})

type formTypeData = zod.infer<typeof rulesValidationsForm>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<formTypeData>({
    resolver: zodResolver(rulesValidationsForm),

    defaultValues: {
      task: '',
      minutesDuration: 0,
    }
  })

  function SubmitForm(data: formTypeData){
    console.log(data)
    reset()
  }

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
            <span>0</span>
            <span>0</span>
            <StylesTwoPoints>:</StylesTwoPoints>
            <span>0</span>
            <span>0</span>
          </StylesCounter>

          <StylesButton disabled={DisableWhenButton} type="submit">
            <Play size={24}/>
            Começar
          </StylesButton>

        </form>

    </StylesHome>
  )
}
