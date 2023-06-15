import {CssBaseline, ThemeProvider, createTheme} from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
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
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
