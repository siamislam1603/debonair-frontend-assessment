import EditNoteIcon from "@mui/icons-material/EditNote";
import { Button, Container, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api";
import BreadcrumbsMenu from "./BreadcrumbsMenu";
import UserForm from "./UserForm";

const items = [{ title: "Home", link: "/" }, { title: "User Details" }];
const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [editForm, setEditForm] = useState(false);
  useEffect(() => {
    const fetchUser = async (id) => {
      const { data } = await getUser(id);
      setUser(data.readEmployeeData[0]);
    };
    fetchUser(userId);
  }, [userId]);
  const handleCancel=()=>{
    setEditForm(false);
  }
  return (
    <>
      <Typography variant="h4">User Details</Typography>
      <BreadcrumbsMenu items={items} />
      <Container>
        {user ? (
          <UserForm individualUser={user} editForm={editForm} onCancel={handleCancel}/>
        ) : (
          [...new Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              width={'100%'}
              height={60}
              sx={{ my: 2 }}
            />
          ))
        )}
        {!editForm ? (
          <Stack direction="row" justifyContent="center" margin={2}>
            <Button variant="contained" startIcon={<EditNoteIcon />} onClick={()=>setEditForm(true)}>
              Edit User Info
            </Button>
          </Stack>
        ) : null}
      </Container>
    </>
  );
};

export default UserDetails;
