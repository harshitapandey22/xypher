import axios from 'axios';
const URL = import.meta.env.VITE_API_URL;

export const getGoals = token =>
  axios.get(`${URL}/goal`, { headers:{Authorization:`Bearer ${token}`}});
export const createGoal = (data, token) =>
  axios.post(`${URL}/goal`, data, { headers:{Authorization:`Bearer ${token}`}});
export const deleteGoal = (id, token) =>
  axios.delete(`${URL}/goal/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const distributeSavings = (amount, token) =>
  axios.post(`${URL}/goal/distribute`, { amount }, { headers:{Authorization:`Bearer ${token}`}});
export const reorderGoals = (order, token) =>
  axios.put(`${URL}/goal/reorder`, { order }, { headers: { Authorization: `Bearer ${token}` }});

