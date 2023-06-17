import axios from "axios";

const api=axios.create({baseURL:'http://59.152.62.177:8085/api'});

export const getUsers=()=>api.get('/Employee/EmployeeData');
export const getDivisions=()=>api.get('/Employee/Division');
export const getDistricts=(DivisionId)=>api.get(`/Employee/District/${DivisionId}`);
export const createUser=(data)=>api.post('/Employee/SaveEmployeeInformation',data)