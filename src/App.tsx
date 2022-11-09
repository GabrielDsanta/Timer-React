import { TitleTest } from "./components/Title";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyles } from "./styles/Global";



export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>

      <TitleTest variant="primary"/>
      <TitleTest variant="secondary"/>
      <TitleTest variant="danger"/>

      <GlobalStyles/>
    </ThemeProvider>
  )
}


