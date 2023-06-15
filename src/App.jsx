import {Route, Routes} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Users from './components/Users'
import UserDetails from './components/UserDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Users />} />
        <Route
          path="/users/:userId"
          element={
            <UserDetails/>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
