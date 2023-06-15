import {CssBaseline, ThemeProvider, createTheme} from '@mui/material'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#11387B',
    },
    secondary: {
      main: '#E6E6E6',
    },
  },
  typography: {
    fontFamily: 'DM Sans',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)
