"use client";
import { useState } from "react";
import Link from "next/link";
import { navData } from "@/lib/data";
import LoginPage from "@/components/LoginComponent";
import RegisterPage from "@/components/SignupComponent";
import Dialog from "./Dialog";

export default function Header() {
  const [authDialog, setAuthDialog] = useState<"login" | "register" | null>(null);
  const handleCloseDialog = () => setAuthDialog(null);
  const handleSwitchToRegister = () => setAuthDialog("register");
  const handleSwitchToLogin = () => setAuthDialog("login");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <div className="container py-3 px-4 mx-auto">
      <div className="hidden sm:flex justify-between">
        <div className="flex space-x-2">
          {navData.map((item, i) => (
            <ul key={i} className="text-sm font-medium text-gray-700">
              {item.subNav ? (
                <li  className="px-4 py-2 cursor-pointer">
                  <Link href={item.url}>{item.title}</Link>
                 
                </li>
              ) : (
                <li className="px-4 py-2 hover:primary cursor-pointer relative">
                  <Link href={item.url}>{item.title}</Link>
                </li>
              )}
             
            </ul>
          ))}
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative flex items-center space-x-1">
            <p className="text-sm font-medium cursor-pointer" onClick={() => setAuthDialog("login")}>
              Login
            </p>

            <span>|</span>
            <p className="text-sm font-medium cursor-pointer" onClick={() => setAuthDialog("register")}>
              Signup
            </p>
          </div>
        </div>
      </div>
      <hr className="mt-2 bg-neutral-200 border-none h-[1px] " />
      <Dialog isOpen={authDialog !== null} onClose={handleCloseDialog}>
        {authDialog === "login" && <LoginPage onSwitchToRegister={handleSwitchToRegister} />}
        {authDialog === "register" && <RegisterPage onSwitchToLogin={handleSwitchToLogin} />}
      </Dialog>
    </div>
  );
}
