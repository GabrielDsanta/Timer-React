import { useContext } from "react";
import { formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { CycleContext } from "../../contexts/CycleContext";
import { StylesHistory, StylesHistoryList, StylesStatus } from "./styles";


export function History(){
    const { cycles } = useContext(CycleContext)
    return(
        <StylesHistory>
            <h1>Meu Histórico</h1>
            
            <StylesHistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cycles.map((cycle => {
                            return(
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesDuration} minutos</td>
                                    <td>{formatDistanceToNow(cycle.startDate, {addSuffix: true, locale: ptBR})}</td>
                                    <td>
                                        { cycle.finishDate && (<StylesStatus statusColor="green">Tarefa Concluída</StylesStatus>) }
                                        { cycle.stopDate && (<StylesStatus statusColor="red">Intorrompído</StylesStatus>)}
                                        { !cycle.stopDate && !cycle.finishDate && (<StylesStatus statusColor="yellow">Em Andamento</StylesStatus>)}
                                    </td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </table>
            </StylesHistoryList>
        </StylesHistory>
    )
}