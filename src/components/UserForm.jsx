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
import { createUser, getDistricts, getDivisions } from "../api";
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

const UserForm = ({ onCancel, updateUsersList }) => {
  const [toaster, setToaster] = useState({
    open: false,
    success: true,
    message: "",
  });
  const initialValues = {
    employeeType: userTypes[0].value,
    firstName: "",
    lastName: "",
    divisionId: 0,
    districeID: 0,
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
      const { data } = await createUser(user);
      setToaster({
        success: data.isSuccess,
        message: data.isSuccess
          ? "Created user successfully"
          : "Failed to create user",
        open: true,
      });
      if (data.isSuccess) {
        updateUsersList(isAdmin);
        handleCancel();
      }
    },
  });
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    formik;
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const fetchDistricts = useCallback(async (divisionId) => {
    const { data } = await getDistricts(divisionId);
    setDistricts(data.readDistrictData);
    formik.setFieldValue("districeID", data.readDistrictData[0].districtID);
  }, []);
  useEffect(() => {
    const fetchDivisions = async () => {
      const { data } = await getDivisions();
      setDivisions(data.readDivisionData);
      formik.setFieldValue("divisionId", data.readDivisionData[0].divID);
    };
    fetchDivisions();
  }, []);

  useEffect(() => {
    fetchDistricts(values.divisionId);
  }, [values.divisionId, fetchDistricts]);
  const handleToasterClose = () => {
    setToaster({ ...toaster, open: false });
  };

  return (
    <>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {InputSelect({
          name: "employeeType",
          label: "Select User Type",
          menuItems: userTypes,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        })}
        <TextField
          label="Enter First Name"
          name="firstName"
          variant="outlined"
          required
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          error={touched.firstName && errors.firstName}
          helperText={
            touched.firstName && errors.firstName ? errors.firstName : null
          }
        />
        <TextField
          label="Enter Last Name"
          name="lastName"
          variant="outlined"
          required
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          error={touched.lastName && errors.lastName}
          helperText={
            touched.lastName && errors.lastName ? errors.lastName : null
          }
        />
        {values.employeeType === "Employee" ? (
          <>
            {InputSelect({
              name: "divisionId",
              label: "Select Division",
              menuItems: divisions ?? [],
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            })}
            {InputSelect({
              name: "districeID",
              label: "Select District",
              menuItems: districts ?? [],
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            })}
          </>
        ) : null}

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
            Save
          </Button>
        </Stack>
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
