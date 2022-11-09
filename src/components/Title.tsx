import { TitleStyled } from "./Title.styles";
import { Variants } from "./Title.styles"


interface TitleProps{
    variant?: Variants
}

export function TitleTest({ variant = 'primary' }: TitleProps){
    return(
        <TitleStyled variant={variant}>Hello World</TitleStyled>
    )
}