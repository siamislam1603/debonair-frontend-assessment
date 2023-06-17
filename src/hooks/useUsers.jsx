import { useCallback, useEffect, useState } from "react";
import { getUsers } from "../api";

const useUsers = () => {
  const [users, setUsers] = useState({ admins: [], employess: [] });
  const fetchUsers = useCallback(async () => {
    const { data } = await getUsers();
    const tempAdmins = [],
      tempEmployees = [];
    data.readEmployeeData.forEach((user) => {
      if (user.employeeType === "Employee") tempEmployees.push(user);
      else tempAdmins.push(user);
    });
    return { admins: tempAdmins, employees: tempEmployees };
  }, []);
  useEffect(() => {
    fetchUsers()
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => console.log(err));
  }, [fetchUsers]);
  return { users, fetchUsers };
};
export default useUsers;
