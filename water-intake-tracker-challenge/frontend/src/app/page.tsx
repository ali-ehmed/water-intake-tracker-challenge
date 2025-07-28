"use client";
import { useState } from "react";
import Dialog from "@/components/Dialog";
import LoginPage from "@/components/LoginComponent";
import RegisterPage from "@/components/SignupComponent";

export default function Home() {
  const [authDialog, setAuthDialog] = useState<"login" | "register" | null>(null);
  const handleCloseDialog = () => setAuthDialog(null);
  const handleSwitchToRegister = () => setAuthDialog("register");
  const handleSwitchToLogin = () => setAuthDialog("login");
  return (
    <div className="layout-container mt-4">
      <div className={`w-full h-[500px] !overflow-hidden`}>
        <div style={{ backgroundImage: "url('/hero-background.webp')" }} className=" inset-0 bg-cover bg-center">
          {" "}
          <div className="relative w-full h-[500px]">
            <div className="relative z-10  backdrop-blur-sm w-full h-[500px] flex flex-col md:flex-row items-center justify-between p-6 md:p-12 leading-relaxed ">
              <div className="w-full md:w-1/2 flex justify-center"></div>
              <div className="w-full md:w-1/2 mt-6 md:mt-0 text-left">
                <h2 className=" text-5xl  font-semibold mt-1 text-white ">Stay Hydrated, Stay Healthy</h2>
                <h3 className="md:text-xl font-medium  mt-3 text-white">Track your daily water intake and reach your hydration goals effortlessly.</h3>
                <p className="text-sm text-white font-normal mt-4">Build a healthy habit with real-time tracking, personalized goals, and weekly insights. Because drinking water should be simple—and smart.</p>

                <button onClick={() => setAuthDialog("login")} className="mt-4 px-6 py-2 bg-[#00B207] hover:bg-[#00b206c7] text-white font-semibold rounded shadow cursor-pointer">
                  Start Tracking Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <Dialog isOpen={authDialog !== null} onClose={handleCloseDialog}>
          {authDialog === "login" && <LoginPage onSwitchToRegister={handleSwitchToRegister} />}
          {authDialog === "register" && <RegisterPage onSwitchToLogin={handleSwitchToLogin} />}
        </Dialog>
      </div>
    </div>
  );
}
