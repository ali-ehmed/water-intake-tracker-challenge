"use client";
import axiosInstance from "@/lib/service";
import React from "react";

function page() {
  const handleSubmit = async (data: React.FormEvent<HTMLFormElement>) => {
    data.preventDefault();
    const form = data.currentTarget;
    const formData = new FormData(form);
    const userId = formData.get("userId");
    const date = formData.get("date")?.toString();
    const intakeMl = formData.get("intakeMl");
    const response = await axiosInstance.post(`/water-log/`, {
      userId: Number(userId),
      date,
      intakeMl: Number(intakeMl),
    });
    if (response.status) {

        console.log(response.status);
        
    }
  };
  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center text-white border border-[#18aebf] rounded-lg p-5 w-1/3">
        <form className="flex flex-col gap-y-8 w-full" onSubmit={handleSubmit}>
          <input
            className={`focus:border-b border focus:border-[#18aebf] border-white px-4 py-2 rounded-sm outline-none stroke-none background-transparent text-white focus:text-[#18aebf]`}
            name="userId"
            type="text"
            placeholder="User ID*"
            required
          />
          <input
            className="focus:border-b border focus:border-[#18aebf] border-white px-4 py-2 rounded-sm outline-none stroke-none background-transparent text-white focus:text-[#18aebf]"
            type="date"
            name="date"
            placeholder="Select a Date*"
            required
          />
          <input
            className="focus:border-b border focus:border-[#18aebf] border-white px-4 py-2 rounded-sm outline-none stroke-none background-transparent text-white focus:text-[#18aebf]"
            type="number"
            name="intakeMl"
            placeholder="your water intake in ML*"
            required
          />

          <button className="text-white font-semibold px-4 py-2 rounded-md bg-[#18aebf]">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
