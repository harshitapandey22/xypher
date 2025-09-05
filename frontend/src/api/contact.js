import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

export const sendContactMessage = (data) =>
  axios.post(`${URL}/contact`, data);
