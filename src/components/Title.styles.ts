

import styled from 'styled-components'

interface TitleProps{
    variant: Variants
}

export type Variants = 'primary' | 'secondary' | 'danger'

export const TitleStyled = styled.h1<TitleProps>`
    color: ${props => props.theme['green-500']};
`