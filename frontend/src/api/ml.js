import axios from 'axios';

const ML_URL = import.meta.env.VITE_ML_URL;

export async function forecast(user, allTxns) {
  const payload = {
    initialBalance: user.initialBalance,
    transactions: allTxns.map(t => {
      const dateOnly = t.date.split('T')[0];
      return {
        amount: t.amount,
        type: t.type,
        date: `${dateOnly}T00:00:00`
      };
    })
  };
  console.log('ML payload:', payload);
  const res = await axios.post(ML_URL, payload);
  const { received_data } = res.data;
  console.log('ML response (received_data):', received_data);
  return received_data;
}