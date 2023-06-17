import * as Yup from "yup";
export const userFormSchema = Yup.object({
  employeeType: Yup.string().required("Please select user type"),
  firstName: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter your first name"),
  lastName: Yup.string().min(2).max(25).required("Please enter your last name"),
  divisionId: Yup.number().min(0).required("Please select division"),
  districeID: Yup.number().min(0).required("Please select district"),
});
