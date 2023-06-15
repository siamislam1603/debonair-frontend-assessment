import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Typography } from "@mui/material";
import { useState } from "react";
import ButtonTabs from "./ButtonTabs";
import UsersTabView from "./UsersTabView";

const tabs = [
  {
    label: "Admins",
    icon: <ManageAccountsIcon />,
    tabView: <UsersTabView activeTab={"admins"} />,
  },
  {
    label: "Employees",
    icon: <AssignmentIndIcon />,
    tabView: <UsersTabView activeTab={"employees"} />,
  },
];

const Users = () => {
  const [value, setValue] = useState(tabs[0].label);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Typography variant="h4">Users</Typography>
      <ButtonTabs
        tabs={tabs}
        activeTab={value}
        handleTabChange={handleChange}
      />
    </>
  );
};

export default Users;
