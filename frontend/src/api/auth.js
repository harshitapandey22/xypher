import axios from 'axios';
const URL = import.meta.env.VITE_API_URL;

export const signup = data => axios.post(`${URL}/auth/signup`, data, {withCredentials:true});
export const login  = data => axios.post(`${URL}/auth/login`, data, {withCredentials:true});
export const refresh= ()=> axios.post(`${URL}/auth/refresh`,{}, {withCredentials:true});
export const logout = ()=> axios.post(`${URL}/auth/logout`,{}, {withCredentials:true});