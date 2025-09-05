import React, { useState } from 'react';
import { createGoal } from '../api/goal';
import { useAuthStore } from '../store/authStore';

export default function GoalForm({ onAdd }) {
  const { accessToken } = useAuthStore();
  const [name,setName]=useState(''),[target,setTarget]=useState('');

  const submit=async e=>{
    e.preventDefault();
    await createGoal({ name, target: parseFloat(target) }, accessToken);
    setName(''); setTarget('');
    onAdd();
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <input type="text" placeholder="Goal Name" value={name}
            onChange={e=>setName(e.target.value)} className="w-full border p-2" required/>
      <input type="number" placeholder="Target Amount" value={target}
            onChange={e=>setTarget(e.target.value)} className="w-full border p-2" required/>
      <button type="submit" className="bg-green-500 text-white p-2 w-full mb-5">Add Goal</button>
    </form>
  );
}
