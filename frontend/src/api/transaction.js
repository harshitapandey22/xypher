import axios from 'axios';
const URL = import.meta.env.VITE_API_URL;

export const getTransactions = token =>
  axios.get(`${URL}/transaction`, { headers:{Authorization:`Bearer ${token}`}});

export const createTransaction = (data, token) =>
  axios.post(`${URL}/transaction`, data, { headers:{Authorization:`Bearer ${token}`}});

export const deleteTransaction = (id, token)=>
  axios.delete(`${URL}/transaction/${id}`,{headers:{Authorization:`Bearer ${token}`}});

export const getTransactionsByType = (type, token) =>
  axios.get(`${URL}/transaction?type=${type}`, { headers: { Authorization: `Bearer ${token}` }});
