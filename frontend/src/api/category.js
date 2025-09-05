import axios from 'axios';
const URL = import.meta.env.VITE_API_URL;
export const getCategories = token => axios.get(`${URL}/category`, { headers:{Authorization:`Bearer ${token}`}});
export const createCategory = (name, token) =>
  axios.post(`${URL}/category`, { name }, { headers:{Authorization:`Bearer ${token}`}});
