"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../axios";
import { Eye, EyeOff } from "lucide-react"; // 👈 make sure you have lucide-react installed

type RegisterPageProps = {
  onSwitchToLogin: () => void;
};

export default function SignupComponent({ onSwitchToLogin }: RegisterPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    axiosInstance
      .post("/users/register", { email, name, password })
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Create an account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2  pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-2 flex items-center text-gray-600" tabIndex={-1}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-green-600 transition">
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button onClick={onSwitchToLogin} className="text-blue-600 hover:underline cursor-pointer">
            Login
          </button>
        </p>

        {message && <p className="mt-2 text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}
