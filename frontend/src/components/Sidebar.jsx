import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { logout as apiLogout } from '../api/auth';

export default function Sidebar(){
  const { logout } = useAuthStore();
  const handle = async ()=>{
    await apiLogout();
    logout();
  };
  return (  
    <aside className="max-w-16 bg-[#2E3137] rounded-2xl shadow p-4 flex flex-col justify-between m-3">
      <div>
        <Link to="/dashboard" className="block mb-2 overflow-hidden cursor-pointer">Dashboard</Link>
        <Link to="/dashboard" className="block mb-2 overflow-hidden cursor-pointer">Graph</Link>
        <Link to="/dashboard" className="block mb-2 overflow-hidden cursor-pointer">Goal</Link>
        <Link to="/dashboard" className="block mb-2 overflow-hidden cursor-pointer">Transaction</Link>
        <Link to="/dashboard" className="block mb-2 overflow-hidden cursor-pointer">Settings</Link>
      </div>
      <button onClick={handle} className="underline cursor-pointer overflow-hidden">Logout</button>
    </aside>
  );
}
