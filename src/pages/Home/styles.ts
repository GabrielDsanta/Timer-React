

import styled from "styled-components";


export const StylesHome = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form{
        display: flex;
        flex-direction: column;
        gap: 3.5rem;
    }
`

export const StylesBaseButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    font-weight: bold;

    cursor: pointer;

    color: ${props => props.theme["gray-100"]};
`

export const StylesStopButton = styled(StylesBaseButton)`
    background: ${props => props.theme["red-500"]};

    &&:hover{
        background: ${props => props.theme["red-700"]};
    }

    &&:focus{
        outline: solid 2px ${props => props.theme["red-700"]};
    }
`

export const StylesStartButton = styled(StylesBaseButton)`
     background: ${props => props.theme["green-500"]};


     &:not(:disabled) :hover{
        background: ${props => props.theme["green-700"]};
    }

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
`