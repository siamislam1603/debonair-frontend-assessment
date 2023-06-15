import AddIcon from '@mui/icons-material/Add'
import {Box, Button} from '@mui/material'
import useUsers from '../hooks/useUsers'
import UsersDataTable from './UsersDataTable'
import { useEffect, useState } from 'react'

const UsersTabView = ({activeTab}) => {
  const users = useUsers()
  const [usersList,setUsersList]=useState([]);
  useEffect(()=>{
    setUsersList(users[activeTab] ?? []);
  },[activeTab,users]);
  return (
    <Box>
      <UsersDataTable usersList={usersList}>
        <Button variant="contained" startIcon={<AddIcon />}>
          Create New {activeTab==='admins' ? 'Admin' : 'Employee'}
        </Button>
      </UsersDataTable>
    </Box>
  )
}

export default UsersTabView