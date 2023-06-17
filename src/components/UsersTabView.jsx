import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import Modal from "./Modal";
import UserForm from "./UserForm";
import UsersDataTable from "./UsersDataTable";

const UsersTabView = ({ activeTab }) => {
  const { users, fetchUsers } = useUsers();
  const [usersList, setUsersList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalClose = () => {
    setModalVisible(false);
  };
  const handleModalOpen = () => {
    setModalVisible(true);
  };
  useEffect(() => {
    setUsersList(users[activeTab] ?? []);
  }, [activeTab, users]);
  const updateUsersList = (isAdmin) => {
    if (
      (isAdmin && activeTab === "admins") ||
      (!isAdmin && activeTab === "employees")
    ) {
      fetchUsers()
        .then((data) => setUsersList(data[activeTab]))
        .catch((err) => console.log(err));
    }
  };
  return (
    <Box>
      <UsersDataTable usersList={usersList}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleModalOpen}
        >
          Create New User
        </Button>
      </UsersDataTable>
      <Modal open={modalVisible} onClose={handleModalClose} title={"Add User"}>
        <UserForm
          onCancel={handleModalClose}
          updateUsersList={updateUsersList}
        />
      </Modal>
    </Box>
  );
};

export default UsersTabView;
