import { StylesHistory, StylesHistoryList, StylesStatus } from "./styles";


export function History(){
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
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <td>
                                <StylesStatus statusColor='green'>Concluído</StylesStatus>
                            </td>
                        </tr>

                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <td>
                                <StylesStatus statusColor='green'>Concluído</StylesStatus>
                            </td>
                        </tr>

                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <td>
                                <StylesStatus statusColor='green'>Concluído</StylesStatus>
                            </td>
                        </tr>

                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <td>
                                <StylesStatus statusColor='green'>Concluído</StylesStatus>
                            </td>
                        </tr>

                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <td>
                                <StylesStatus statusColor='green'>Concluído</StylesStatus>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </StylesHistoryList>
        </StylesHistory>
    )
}