import styled from "styled-components";


export const StylesCounter = styled.div`
font-family: 'Roboto Mono', monospace;
font-size: 10rem;
line-height: 8rem;

display: flex;
justify-content: center;
gap: 1rem;

span{
    background: ${props=> props.theme["gray-700"]};
    padding: 2rem 1rem;
    border-radius: 8px;
}
`

export const StylesTwoPoints = styled.div`
    padding: 2rem 0;
    color: ${props=> props.theme["green-500"]};

    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
`