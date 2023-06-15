import {useEffect, useState} from 'react'
import {getUsers} from '../api'

const useUsers = () => {
    const [users,setUsers]=useState({admins:[],employess:[]});
  useEffect(() => {
    const fetchUsers = async () => {
      const {data} = await getUsers()
      const tempAdmins = [],
        tempEmployees = []
      data.readEmployeeData.forEach((user) => {
        if (user.employeeType === 'Employee') tempEmployees.push(user)
        else tempAdmins.push(user)
      })
      setUsers({admins: tempAdmins, employees: tempEmployees})
    }
    fetchUsers()
  }, []);
  return users;
}
export default useUsers
