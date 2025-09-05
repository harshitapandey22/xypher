import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

export function sendMessageToChatbot({ message }, token) {
  return axios.post(
    `${URL}/chatbot/message`,
    { message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}