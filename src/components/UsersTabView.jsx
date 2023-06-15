import AddIcon from '@mui/icons-material/Add'
import {Box, Button} from '@mui/material'
import useUsers from '../hooks/useUsers'
import UsersDataTable from './UsersDataTable'

const UsersTabView = ({activeTab}) => {
  const users = useUsers()
  return (
    <Box>
      <UsersDataTable usersList={users[activeTab]}>
        <Button variant="contained" startIcon={<AddIcon />}>
          Create New Admin
        </Button>
      </UsersDataTable>
    </Box>
  )
}

export default UsersTabView