import React, { useState } from "react";
import { login } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { IoMdTrendingUp } from "react-icons/io";
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState(""),
        [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password: pw });
      setAuth({ user: res.data.user, token: res.data.accessToken });
      sessionStorage.setItem("accessToken", res.data.accessToken);
      navigate("/dashboard", { replace: true });
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="w-full mx-auto min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-400 to-purple-400 ">
      <div className="max-w-3xl shadow-lg bg-zinc-50   p-8 rounded-xl w-full sm:w-[28rem]">
        {/* Logo */}
        <div className="flex flex-col gap-4 items-center text-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <IoMdTrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CapitaClarity
            </span>
          </div>
          <p className="text-xl font-bold text-gray-800">Welcome Back!</p>
        </div>

        {/* Form */}
        <form onSubmit={handle} className="space-y-5">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="relative mt-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPw ? "text" : "password"}
              id="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPw((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 focus:outline-none mt-5"
            >
              {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>

          <div className="text-sm text-gray-400 text-center">
            <p>USE THE FOLLOWING CREDENTIALS FOR A BETTER EXPERIENCE OF THE DASHBOARD</p>
            <br />
            <p>
              Email: <div className="text-gray-500 inline-block">nemollytest@team.com</div>
            </p>
            <p>
              Password : <div className="text-gray-500 inline-block">Nemolly#123</div>
            </p>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 cursor-pointer">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
