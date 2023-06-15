import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import {useState} from 'react'
import Admins from './Admins'
import ButtonTabs from './ButtonTabs'
import Employees from './Employees'
const tabs = [
  {label: 'Admins', icon: <ManageAccountsIcon />, tabView: <Admins />},
  {label: 'Employees', icon: <AssignmentIndIcon />, tabView: <Employees />},
]

const UsersTabs = () => {
  const [value, setValue] = useState(tabs[0].label)

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <ButtonTabs tabs={tabs} activeTab={value} handleTabChange={handleChange} />
    </>
  )
}

export default UsersTabs
