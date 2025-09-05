import React from "react";
import LoginForm from "../components/LoginForm";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full  bg-white shadow-lg rounded">
        <LoginForm />
      </div>
    </div>
  );
}
