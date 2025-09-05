import React, { useState } from "react";
import { signup } from "../api/auth";
import { IoMdTrendingUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function SignupForm() {
  const [email, setEmail] = useState(""),
        [name, setName] = useState(""),
        [pw, setPw] = useState(""),
        [confirmPw, setConfirmPw] = useState(""),
        [error, setError] = useState("");

  const [showPw, setShowPw] = useState(false); 

  const handle = async (e) => {
    e.preventDefault();
    if (pw !== confirmPw) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      await signup({ email, name, password: pw });
      alert("Signup successful! Please login.");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="w-full mx-auto min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-400 to-purple-400">
      <div className="max-w-3xl shadow-lg p-8 rounded-xl w-full sm:w-[28rem] bg-zinc-50">
        <form onSubmit={handle} className="space-y-5">
          <div className="text-center mb-6 flex flex-col gap-4 items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <IoMdTrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CapitaClarity
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Create Your Account
            </h2>
          </div>

          <div className="space-y-">
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  required
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600 focus:outline-none"
                >
                  {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-medium mt-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Sign Up
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

          <div className="">
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <Link
                to="/auth"
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
