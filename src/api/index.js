import axios from "axios";

const api=axios.create({baseURL:'http://59.152.62.177:8085/api'});

export const getUsers=()=>api.get('/Employee/EmployeeData');