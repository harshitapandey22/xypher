import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getTransactions } from '../api/transaction';
import { useAuthStore } from '../store/authStore';

export default function SavingsGraph(){
  const { accessToken } = useAuthStore();
  const [data, setData] = useState([]);

  useEffect(()=>{
    (async ()=>{
      const res = await getTransactions(accessToken);
      let sum=0;
      setData(res.data.map(t=>{
        sum -= t.amount; 
        return { date: new Date(t.date).toLocaleDateString(), balance: sum };
      }));
    })();
  },[]);

  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="date"/>
      <YAxis/>
      <Tooltip/>
      <Line type="monotone" dataKey="balance" />
    </LineChart>
  );
}
