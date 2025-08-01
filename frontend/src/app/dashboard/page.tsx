"use client";

import { useWaterSummary } from "@/lib/api";
import SummaryCard from "./components/SummaryCard";
import SummaryChart from "./components/SummaryChart";
import WaterIntakeForm from "./components/WaterIntakeForm";

export default function DashboardPage() {
  const userId = "user1"; // Replace with actual logged-in user id
  const { data, error, isLoading } = useWaterSummary(userId);
  const summary = data ?? [];

  if (isLoading)
    return <p className="p-4 text-center text-blue-600 font-medium">Loading...</p>;

  if (error)
    return <p className="p-4 text-center text-red-500 font-semibold">Error loading data</p>;

  return (
    <div className="min-h-screen w-full  px-4 py-6 md:px-10 md:py-10 flex flex-col gap-10 items-center">
      <div className="w-full flex justify-center items-center">
      <WaterIntakeForm />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center md:text-left">
        7-Day Water Intake Summary
      </h1>

      <div className="flex flex-wrap gap-4 items-center justify-center ">
        {summary.map((item) => (
          <SummaryCard key={item.date} summary={item} />
        ))}
      </div>

      <SummaryChart data={summary} />
    </div>

  );
}
