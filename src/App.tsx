import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Router } from './router';

import { defaultTheme } from './styles/Themes/default';
import { GlobalStyle } from './styles/global';
import { CyclesContextProvider } from './Contexts/CyclesContextProvider';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider >
  )
}
