import React from "react";
import { useState } from "react";
import {
  FiSearch,
  FiBell,
  FiLogOut,
  FiPieChart,
  FiTrendingUp,
} from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";
import { useAuthStore } from "../store/authStore";
import { logout as apiLogout } from "../api/auth";
import { IoMdTrendingUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDashboardTour } from "../context/TourContext";
import { FaChalkboardTeacher } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuthStore();
  const { startTour } = useDashboardTour();
  const handle = async () => {
    await apiLogout();
    logout();
  };
  const showDropdownHandler = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <nav className="max-h-16 bg-[#1e1e2f] rounded-2xl shadow  text-white p-4 flex justify-between m-3">
      <div
        className="flex items-center space-x-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full">
          <IoMdTrendingUp className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          CapitaClarity
        </span>
      </div>

      {/* Right: Icons + Profile */}
      <div className="flex items-center gap-4 relative">
        {/* Search */}
        <div className="relative">
          <ThemeToggle />
          <button
            onClick={startTour}
            className="ml-4 px-3 py-1 bg-transparent hover:bg-white/10 text-white/90 rounded-4xl"
            title="Start Dashboard Tour"
          >
            <FaChalkboardTeacher className="inline mr-1 w-20" />
          </button>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-white p-2 rounded-full hover:bg-white/10"
          >
            <FiSearch size={18} />
          </button>
          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              className="absolute top-10 right-0 bg-[#2a2b33] text-white p-2 rounded-md w-48 border border-gray-600 outline-none"
              autoFocus
            />
          )}
        </div>

        {/* Notification */}
        <div className="relative">
          <button className="text-white p-2 rounded-full hover:bg-white/10 relative">
            <FiBell size={18} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
              2
            </span>
          </button>
        </div>

        {/* Wallet */}
        <button className="text-white p-2 rounded-full hover:bg-white/10 flex items-center gap-1">
          <BsWallet2 size={18} />
          <span className="hidden sm:inline">Wallet</span>
        </button>

        {/* Profile */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => showDropdownHandler()}
            onMouseEnter={() => showDropdownHandler()}
          />
          {showDropdown && (
            <div className="absolute right-0 top-10 bg-[#2a2b33] text-white rounded-md shadow-lg w-48 py-2 z-50">
              <Link
                to
                className="w-full px-4 py-2 hover:bg-white/10 flex items-center gap-2"
              >
                <FiPieChart /> Charts
              </Link>
              <Link className="w-full px-4 py-2 hover:bg-white/10 flex items-center gap-2">
                <FiTrendingUp /> Transactions
              </Link>
              <Link
                onClick={() => handle()}
                className="w-full px-4 py-2 hover:bg-white/10 flex items-center gap-2"
              >
                <FiLogOut /> Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
