import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { setBalanceLimit } from '../api/user';
import { useAuthStore } from '../store/authStore';

Modal.setAppElement('#root');

export default function BalanceModal({ isOpen, onRequestClose }){
  const { user, accessToken, setAuth } = useAuthStore();
  const [bal, setBal] = useState(user.balance||0);
  const [lim, setLim] = useState(user.dailyLimit||0);

  useEffect(()=>{
    setBal(user.balance); setLim(user.dailyLimit);
  },[user]);

  const save = async ()=>{
    const res = await setBalanceLimit({ balance:bal, dailyLimit:lim }, accessToken);
    setAuth({ user:res.data, token:accessToken });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} className="p-4 bg-[#07122c] text-white max-w-md mx-auto mt-20 rounded-lg shadow-lg" overlayClassName="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <h2 className="text-xl mb-4">Set Balance & Daily Limit</h2>
      <div className="space-y-2">
        <div>
          <label>Current Balance</label>
          <input type="number" className="w-full rounded border p-2" value={bal}
                onChange={e=>setBal(parseFloat(e.target.value))}/>
        </div>
        <div>
          <label>Daily Limit</label>
          <input type="number" className="w-full border rounded p-2" value={lim}
                onChange={e=>setLim(parseFloat(e.target.value))}/>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={onRequestClose} className="mr-2">Cancel</button>
        <button onClick={save} className="bg-blue-500 rounded-md text-white p-2">Save</button>
      </div>
    </Modal>
  );
}
