"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "../axios";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";

type LoginPageProps = {
  onSwitchToRegister: () => void;
};

export default function LoginPage({ onSwitchToRegister }: LoginPageProps) {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      const id = response.data.id;

      Cookies.set("userId", id, {
        expires: 7,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      router.push("/dashboard");
    } catch (e: any) {
      const message = e.response?.data?.message || "Something went wrong";
      setError(message);
    }
  };

  return (
    <div className=" ">
      <div className="  flex items-center justify-center ">
        <div className="w-full max-w-md bg-white p-6 rounded ">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
              <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 cursor-pointer" tabIndex={-1}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-gree-300 transition">
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button onClick={onSwitchToRegister} className="text-blue-600 hover:underline">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
