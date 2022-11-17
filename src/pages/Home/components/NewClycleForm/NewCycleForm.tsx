
import { useFormContext } from "react-hook-form";
import { StylesForm, StylesInputTask, StylesMinutesDuration } from "./styles";
import { useContext } from "react";
import { CycleContext } from "../../../../contexts/CycleContext";


export function NewCycleForm(){
  const { register } = useFormContext()
  const { activeCycle } = useContext(CycleContext)
  
    return(
        <StylesForm>
            <label htmlFor="task">Vou trabalhar em</label>

            <StylesInputTask 
              list="taskSuggestions" 
              placeholder="Adicione um nome a tarefa" 
              id="task" 
              type="text" 
              disabled={!!activeCycle}
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
              disabled={!!activeCycle}
              {...register("minutesDuration", { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </StylesForm>
    )
}