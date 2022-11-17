

import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CycleContext } from "../../../../contexts/CycleContext";
import { StylesCounter, StylesTwoPoints } from "./styles";

export function CountDown(){
  const { activeCycle, activeCyclesID, FineshedCurrentCycle, secondsPassed, CallSetSecondsPassed } = useContext(CycleContext)

  const totalSeconds = activeCycle ? activeCycle.minutesDuration * 60 : 0 
  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")
  useEffect(() => {
    if(activeCycle){
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
      let interval: number
    
      if(activeCycle){
        interval = setInterval(() => {
          const differenceSeconds = differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    
          if(differenceSeconds >= totalSeconds){
            FineshedCurrentCycle()
            CallSetSecondsPassed(totalSeconds)
            clearInterval(interval)
            // setActiveCycles()
          }
    
          else{
            CallSetSecondsPassed(differenceSeconds)
          }
    
        }, 1000)
      }
    
      return () => {
        clearInterval(interval)
      }
  }, [activeCycle, totalSeconds, activeCyclesID, FineshedCurrentCycle])

  return(
      <StylesCounter>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <StylesTwoPoints>:</StylesTwoPoints>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </StylesCounter>
  )
}