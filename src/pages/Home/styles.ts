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

export const StylesForm = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    color: ${props => props.theme["gray-100"]};
    flex-wrap: wrap;
    font-weight: bold;
`

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

export const StylesButton = styled.button`
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

    background: ${props => props.theme["green-500"]};
    color: ${props => props.theme["gray-100"]};

    &:not(:disabled) :hover{
        background: ${props => props.theme["green-700"]};
    }

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
`

const StyledBase = styled.input`
    background: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${props=> props.theme["gray-500"]};
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0 .5rem;
    color: ${props=> props.theme["gray-100"]};

    &:focus{
        box-shadow: none;
        border-color: ${props=> props.theme["green-500"]};
    }

    &::placeholder{
        color: ${props=> props.theme["gray-500"]};

    }
`

export const StylesInputTask = styled(StyledBase)`
    flex: 1;
`

export const StylesMinutesDuration = styled(StyledBase)`
    width: 4rem;
`