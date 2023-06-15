import {Typography} from '@mui/material'
import './App.css'
import Layout from './components/Layout'
import UsersTabs from './components/UsersTabs'

function App() {
  return (
    <Layout>
      <Typography variant="h4">Users</Typography>
      <UsersTabs/>
    </Layout>
  )
}

export default App
