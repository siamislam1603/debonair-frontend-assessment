import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { createUser, getDistricts, getDivisions, updateUser } from "../api";
import { userFormSchema } from "../schemas";
import Toaster from "./Toaster";
const userTypes = [
  { label: "Admin", value: "Admin" },
  { label: "Employee", value: "Employee" },
];
const Form = styled("form")(
  ({ theme }) => `
  display:flex;
  flex-direction:column;
  row-gap:${theme.spacing(2.5)};
`
);

const InputSelect = ({
  name,
  label,
  menuItems,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  InputProps,
}) => (
  <FormControl fullWidth required error={touched[name] && errors[name]}>
    <InputLabel id={name}>{label}</InputLabel>
    <Select
      labelId={name}
      value={values[name]}
      label={label}
      name={name}
      onChange={handleChange}
      onBlur={handleBlur}
      inputProps={InputProps}
    >
      {menuItems.map((item, i) => (
        <MenuItem
          value={
            name === "divisionId" ? item.divID : item.value ?? item.districtID
          }
          key={i}
        >
          {name === "divisionId"
            ? item.divisionName
            : item.label ?? item.districtName}
        </MenuItem>
      ))}
    </Select>

    {touched[name] && errors[name] ? (
      <FormHelperText>{errors[name]}</FormHelperText>
    ) : null}
  </FormControl>
);

const UserForm = ({ onCancel, updateUsersList, individualUser, editForm }) => {
  const [toaster, setToaster] = useState({
    open: false,
    success: true,
    message: "",
  });
  const initialValues = {
    employeeType: individualUser?.employeeType ?? userTypes[0].value,
    firstName: individualUser?.firstName ?? "",
    lastName: individualUser?.lastName ?? "",
    divisionId: individualUser?.divisionId ?? 0,
    districeID: individualUser?.districeID ?? 0,
  };
  const handleCancel = () => {
    if (onCancel) onCancel();
  };
  const formik = useFormik({
    initialValues,
    validationSchema: userFormSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const isAdmin = values.employeeType === "Admin";
      const user = {
        ...values,
        divisionId: isAdmin ? 0 : values.divisionId,
        districeID: isAdmin ? 0 : values.districeID,
      };
      const { data } = individualUser
        ? await updateUser({ userId: individualUser.empID, data: user })
        : await createUser(user);
      setToaster({
        success: data.isSuccess,
        message: data.isSuccess
          ? `${individualUser ? "Updated" : "Created"} user successfully`
          : `Failed to ${individualUser ? "update" : "create"} user`,
        open: true,
      });
      if (data.isSuccess) {
        if (!individualUser) updateUsersList(isAdmin);
        else{
          formik.setFieldValue("districeID", user.districeID);
          formik.setFieldValue("divisionId", user.divisionId);
        }
        handleCancel();
      }
    },
  });
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    formik;
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isFetchedFirst, setIsFetchedFirst] = useState(false);
  const fetchDistricts = useCallback(async (divisionId) => {
    const { data } = await getDistricts(divisionId);
    setDistricts(data.readDistrictData);
    if (isFetchedFirst)
      formik.setFieldValue("districeID", data.readDistrictData[0].districtID);
    else setIsFetchedFirst(true);
  }, []);
  useEffect(() => {
    const fetchDivisions = async () => {
      const { data } = await getDivisions();
      setDivisions(data.readDivisionData);
    };
    fetchDivisions();
  }, []);

  useEffect(() => {
    fetchDistricts(values.divisionId);
  }, [values.divisionId, fetchDistricts]);
  const handleToasterClose = () => {
    setToaster({ ...toaster, open: false });
  };
  const TextInputProps = {
    variant: "outlined",
    required: true,
    onChange: handleChange,
    onBlur: handleBlur,
    InputProps: {
      readOnly: individualUser && !editForm,
    },
  };
  const SelectInputProps = {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    InputProps: {
      readOnly: individualUser && !editForm,
    },
  };
  return (
    <>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {InputSelect({
          name: "employeeType",
          label: "Select User Type",
          menuItems: userTypes,
          ...SelectInputProps,
        })}
        <TextField
          label="Enter First Name"
          name="firstName"
          {...TextInputProps}
          value={values.firstName}
          error={touched.firstName && errors.firstName}
          helperText={
            touched.firstName && errors.firstName ? errors.firstName : null
          }
        />
        <TextField
          label="Enter Last Name"
          name="lastName"
          {...TextInputProps}
          value={values.lastName}
          error={touched.lastName && errors.lastName}
          helperText={
            touched.lastName && errors.lastName ? errors.lastName : null
          }
        />
        {values.employeeType === "Employee" || (individualUser && !editForm) ? (
          <>
            {InputSelect({
              name: "divisionId",
              label: "Select Division",
              menuItems: divisions ?? [],
              ...SelectInputProps,
            })}
            {InputSelect({
              name: "districeID",
              label: "Select District",
              menuItems: districts ?? [],
              ...SelectInputProps,
            })}
          </>
        ) : null}

        {(individualUser && editForm) || !individualUser ? (
          <Stack
            direction="row"
            justifyContent="end"
            spacing={3}
            alignItems="center"
          >
            <Button variant="outlined" color="error" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              {individualUser ? "Update" : "Save"}
            </Button>
          </Stack>
        ) : null}
      </Form>
      <Toaster
        success={toaster.success}
        message={toaster.message}
        open={toaster.open}
        handleClose={handleToasterClose}
      />
    </>
  );
};

export default UserForm;
