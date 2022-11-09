import { NavLink } from "react-router-dom";
import { StylesHeader } from "./styles";

import { Timer, Scroll } from "phosphor-react";
import  Logo  from "../../assets/Logo.svg"


export function Header(){
    return(
        <StylesHeader>
            <img src={Logo} alt="" />

            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24}/>
                </NavLink>

                <NavLink to="/history" title="Histórico">
                    <Scroll size={24}/>
                </NavLink>
            </nav>

        </StylesHeader>
    )
}