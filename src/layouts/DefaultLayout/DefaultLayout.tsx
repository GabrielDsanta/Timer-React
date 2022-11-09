import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { StylesLayout } from "./styles";

export function DefaultLayout(){
    return(
        <StylesLayout>
            <Header/>
            <Outlet/>
        </StylesLayout>
    )
}