import axios from 'axios';
const URL = import.meta.env.VITE_API_URL;

export const getMe = token => axios.get(`${URL}/user/me`, { headers:{ Authorization:`Bearer ${token}` }});
export const setBalanceLimit = (data, token) =>
  axios.post(`${URL}/user/balance-limit`, data, { headers:{ Authorization:`Bearer ${token}` }});
