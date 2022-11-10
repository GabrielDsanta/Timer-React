import { Play } from "phosphor-react";
import { StylesButton, StylesCounter, StylesForm, StylesHome, StylesInputTask, StylesMinutesDuration, StylesTwoPoints } from "./styles";


export function Home() {
  return (
    <StylesHome>
        <form action="">
          <StylesForm>
            <label htmlFor="task">Vou trabalhar em</label>
            <StylesInputTask placeholder="Dê um nome para o seu projeto" id="task" type="text" />

            <label htmlFor="minutesDuration">durante</label>
            <StylesMinutesDuration placeholder="00" id="minutesDuration" type="number" />

            <span>minutos.</span>
          </StylesForm>
        

          <StylesCounter>
            <span>0</span>
            <span>0</span>
            <StylesTwoPoints>:</StylesTwoPoints>
            <span>0</span>
            <span>0</span>
          </StylesCounter>

          <StylesButton disabled type="submit">
            <Play size={24}/>
            Começar
          </StylesButton>
        </form>
    </StylesHome>
  )
}
